import { JSXElementConstructor, ReactElement } from "react";
import { Resend } from "resend";
import { env } from "env";
import logger from "../services/logger";

export const resend = env.RESEND_API_KEY
  ? new Resend(env.RESEND_API_KEY)
  : null;

/**
 * credit to dub.co for their setup of resend
 * https://github.com/steven-tey/dub/blob/main/apps/web/emails/index.ts
 */
export const sendEmail = async ({
  email,
  subject,
  react,
  test,
}: {
  email: string;
  subject: string;
  react: ReactElement<any, string | JSXElementConstructor<any>>;
  test?: boolean;
}) => {
  try {
    if (!resend) {
      logger.error(
        "Resend is not configured. You need to add a RESEND_API_KEY in your .env file for emails to work."
      );
      return Promise.resolve();
    }

    const { data, error } = await resend.emails.send({
      from: "cook@mixiecooking.com",
      to: test ? "delivered@resend.dev" : [email],
      subject,
      react,
    });
    if (error) throw error;
  } catch (error) {
    logger.error("Error sending email", {
      location: "send.ts",
      message: JSON.stringify(error),
    });
  }
};
