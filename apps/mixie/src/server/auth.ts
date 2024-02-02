import { and, eq } from "drizzle-orm";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";

import EmailProvider from "next-auth/providers/email";
import FacebookProvider from "next-auth/providers/facebook";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import { TFont, TTheme } from "@/server/db/enum-types";
import { db } from "@/server/db/index";
import * as schema from "@/server/db/schemas";
import { User as DbUser } from "@/types";
import { env } from "env";
import { sendEmail } from "./emails";
import LoginLink from "./emails/login";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      bio: string;
      userName: string;
      theme: TTheme;
      font: TFont;
      email: string;
    } & DefaultSession["user"];
  }

  interface User extends DbUser {}
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/login",
    verifyRequest: "/auth/verify",
  },
  theme: {
    logo: "/icons/icon_x128.jpg",
  },
  secret: env.NEXTAUTH_SECRET,
  adapter: DrizzleAdapter(),
  // debug: true,
  providers: [
    GitHubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    FacebookProvider({
      clientId: env.FACEBOOK_APP_ID,
      clientSecret: env.FACEBOOK_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    EmailProvider({
      server: `smtp://resend:${env.RESEND_API_KEY}@smtp.resend.com:465`,
      from: "cook@mixiecooking.com",
      maxAge: 12 * 60 * 60, // How long email links are valid for (default 12h)
      async generateVerificationToken() {
        const digits = "0123456789";
        let verificationCode = "";

        for (let i = 0; i < 5; i++) {
          const randomIndex = Math.floor(Math.random() * digits.length);
          verificationCode += digits.charAt(randomIndex);
        }

        return verificationCode;
      },
      async sendVerificationRequest({ identifier, url, token }) {
        console.log("Sending verification request to: ", identifier);
        await sendEmail({
          email: identifier,
          subject: "Your Mixie login link",
          react: LoginLink({ url, email: identifier, token: token }),
        });

        if (process.env.NODE_ENV === "development") {
          console.log(`Login link: ${url}, token: ${token}`);
          return;
        }
      },
    }),
  ],
  callbacks: {
    session: async ({ session, user, token }) => {
      session.user = {
        ...session.user,
        id: user.id,
        userName: user.userName || "",
        bio: user.bio || "",
        font: user.font || "default",
        email: user.email,
      };

      return session;
    },
    jwt: async ({ token, account, user, trigger }) => {
      if (user) {
        token.user = user;
      }
      if (account?.accessToken) {
        token.accessToken = account.accessToken;
      }
      return token;
    },
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import  the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);

/**
 * Adapter for Drizzle ORM.
 *
 * @see
 * https://github.com/nextauthjs/next-auth/blob/d7a116558700785880ecb03658b7de7c98bcf4bf/packages/adapter-drizzle/src/index.ts#L254
 */
export function DrizzleAdapter(): Adapter {
  const { users, sessions, accounts, verificationTokens } = schema;

  return {
    async createUser(data) {
      const id = crypto.randomUUID();

      if (!data.image) {
        const name = data.name ?? data.email.split("@")[0][0].toUpperCase();
        data.image = `https:ui-avatars.com/api/?name=${name
          ?.split(" ")
          .join("+")}"&size=256&background=random`;
      }

      const newUser = { ...data, id };

      await db.insert(users).values(newUser);

      return await db
        .select()
        .from(users)
        .where(eq(users.id, id))
        .then((res) => res[0]);
    },
    async getUser(data) {
      const user =
        (await db
          .select()
          .from(users)
          .where(eq(users.id, data))
          .then((res) => res[0])) ?? null;

      return user;
    },
    async getUserByEmail(data) {
      const user =
        (await db
          .select()
          .from(users)
          .where(eq(users.email, data))
          .then((res) => res[0])) ?? null;

      return user;
    },
    async createSession(data) {
      await db.insert(sessions).values(data);

      return await db
        .select()
        .from(sessions)
        .where(eq(sessions.sessionToken, data.sessionToken))
        .then((res) => res[0]);
    },
    async getSessionAndUser(data) {
      const sessionAndUser =
        (await db
          .select({
            session: sessions,
            user: users,
          })
          .from(sessions)
          .where(eq(sessions.sessionToken, data))
          .innerJoin(users, eq(users.id, sessions.userId))
          .then((res) => res[0])) ?? null;

      return sessionAndUser;
    },
    async updateUser(data) {
      if (!data.id) {
        throw new Error("No user id.");
      }

      await db.update(users).set(data).where(eq(users.id, data.id));

      return await db
        .select()
        .from(users)
        .where(eq(users.id, data.id))
        .then((res) => res[0]);
    },
    async updateSession(data) {
      await db
        .update(sessions)
        .set(data)
        .where(eq(sessions.sessionToken, data.sessionToken));

      return await db
        .select()
        .from(sessions)
        .where(eq(sessions.sessionToken, data.sessionToken))
        .then((res) => res[0]);
    },
    async linkAccount(rawAccount) {
      await db.insert(accounts).values(rawAccount);
    },
    async getUserByAccount(account) {
      const dbAccount =
        (await db
          .select()
          .from(accounts)
          .where(
            and(
              eq(accounts.providerAccountId, account.providerAccountId),
              eq(accounts.provider, account.provider)
            )
          )
          .leftJoin(users, eq(accounts.userId, users.id))
          .then((res) => res[0])) ?? null;

      if (!dbAccount) {
        return null;
      }

      return dbAccount.users;
    },
    async deleteSession(sessionToken) {
      const session =
        (await db
          .select()
          .from(sessions)
          .where(eq(sessions.sessionToken, sessionToken))
          .then((res) => res[0])) ?? null;

      await db.delete(sessions).where(eq(sessions.sessionToken, sessionToken));

      return session;
    },
    async createVerificationToken(token) {
      await db.insert(verificationTokens).values(token);

      return await db
        .select()
        .from(verificationTokens)
        .where(eq(verificationTokens.identifier, token.identifier))
        .then((res) => res[0]);
    },
    async useVerificationToken(token) {
      try {
        const deletedToken =
          (await db
            .select()
            .from(verificationTokens)
            .where(
              and(
                eq(verificationTokens.identifier, token.identifier),
                eq(verificationTokens.token, token.token)
              )
            )
            .then((res) => res[0])) ?? null;

        await db
          .delete(verificationTokens)
          .where(
            and(
              eq(verificationTokens.identifier, token.identifier),
              eq(verificationTokens.token, token.token)
            )
          );

        return deletedToken;
      } catch (err) {
        throw new Error("No verification token found.");
      }
    },
    async deleteUser(id) {
      const user = await db
        .select()
        .from(users)
        .where(eq(users.id, id))
        .then((res) => res[0] ?? null);

      await db.delete(users).where(eq(users.id, id));

      return user;
    },
    async unlinkAccount(account) {
      await db
        .delete(accounts)
        .where(
          and(
            eq(accounts.providerAccountId, account.providerAccountId),
            eq(accounts.provider, account.provider)
          )
        );

      return undefined;
    },
  };
}
