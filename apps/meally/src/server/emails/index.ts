import { JSXElementConstructor, ReactElement } from "react";
import { Resend } from "resend";

import { env } from "@/env.mjs";

export const resend = env.RESEND_API_KEY
  ? new Resend(env.RESEND_API_KEY)
  : null;

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
  if (!resend) {
    console.error(
      "Resend is not configured. You need to add a RESEND_API_KEY in your .env file for emails to work."
    );
    return Promise.resolve();
  }
  return resend.emails.send({
    from: "cook@meally.com.au",
    to: test ? "delivered@resend.dev" : email,
    subject,
    react,
  });
};
