import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";

export default function LoginLink({
  email = "cook@mixiecooking.com",
  url = "http://localhost:3000/api/auth/callback/email?callbackUrl=http%3A%2F%2Fapp.localhost%3A3000%2Flogin&token=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx&email=youremail@gmail.com",
  token = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
}: {
  email: string;
  url: string;
  token: string;
}) {
  return (
    <Html>
      <Head />
      <Preview>Your Mixie Login Link</Preview>
      <Tailwind>
        <Body className="font-sans mx-auto my-auto bg-[#F8F5F1]">
          <Container className="mx-auto my-10 max-w-[500px] rounded border border-solid border-gray-200 px-10 py-5">
            <Section className="mt-8">
              <Img
                src={"https://www.mixiecooking.com/icons/icon_x128.jpg"}
                alt="Mixie"
                height={128}
                className="mx-auto h-32 w-32 rounded-full"
              />
            </Section>
            <Heading className="mx-0 my-7 p-0 text-center text-xl font-semibold text-[#0D1017]">
              Your Login Link
            </Heading>
            <Text className="text-step--3 leading-6 text-[#0D1017]">
              Welcome to Mixie!
            </Text>
            <Text className="text-step--3 leading-6 text-[#0D1017]">
              Please click the link below to sign in to your account.
            </Text>
            <Section className="my-8 text-center">
              <Link
                className="rounded-xl bg-[#FFB914] px-6 py-3 text-center text-[12px] font-semibold text-[#0D1017] no-underline"
                href={url}
              >
                Sign in
              </Link>
            </Section>
            <Text className="text-center">Or</Text>
            <Hr />
            <Text className="text-center">Login with the code below</Text>
            <Section style={codeContainer}>
              <Text style={code}>{token}</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

const codeContainer = {
  background: "rgba(0,0,0,.05)",
  borderRadius: "4px",
  margin: "16px auto 14px",
  verticalAlign: "middle",
  width: "280px",
};

const code = {
  color: "#000",
  display: "inline-block",
  fontFamily: "HelveticaNeue-Bold",
  fontSize: "32px",
  fontWeight: 700,
  letterSpacing: "6px",
  lineHeight: "40px",
  paddingBottom: "8px",
  paddingTop: "8px",
  margin: "0 auto",
  width: "100%",
  textAlign: "center" as const,
};
