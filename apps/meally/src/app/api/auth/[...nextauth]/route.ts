import NextAuth from "next-auth";
import { authOptions } from "@db/next-auth-adapter";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
