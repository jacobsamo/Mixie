import React from "react";
import { SendVerificationRequestParams } from "next-auth/providers";
import { resend } from "./resend";
import VerificationEmail from "emails/src/VerificationEmail";

export const sendVerificationRequest = async (
  params: SendVerificationRequestParams
) => {
  try {
    await resend.emails.send({
      from: "cook@meally.com.au",
      to: params.identifier,
      subject: "Your login code for Meally",
      react: VerificationEmail({
        email: params.identifier,
        token: params.token,
        url: params.url,
      }) as React.ReactElement,
    });
  } catch (error) {
    console.error({ error });
  }
};
