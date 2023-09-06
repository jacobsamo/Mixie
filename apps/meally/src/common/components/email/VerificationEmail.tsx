import React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
  Tailwind,
} from "@react-email/components";

interface VerificationEmailProps {
  email: string;
  token: string;
}

const VerificationEmail = ({ email, token }: VerificationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview> Text</Preview>
      <Tailwind>
        <Body>
          <Heading>Welcome to Meally</Heading>
          <Text>
            Click{" "}
            <a
              href={`http://localhost:3000/verify-email?token=${token}&email=${email}`}
            >
              here
            </a>{" "}
            to verify your email
          </Text>
          <Text>Or</Text>
          <Text>
            Copy this token:
            <br />
            {token}
          </Text>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default VerificationEmail;
