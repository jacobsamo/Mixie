import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Section,
  Text,
  Tailwind,
  Button,
  Hr,
} from "@react-email/components";
import * as React from "react";
import * as defaultConfig from "../../tailwind-config/tailwind.config";

interface VerificationEmailProps {
  email: string;
  token: string;
  url: string;
}

export const VerificationEmail = ({
  email,
  url,
  token,
}: VerificationEmailProps) => (
  <Html>
    <Head />
    <Tailwind config={{ theme: defaultConfig.default.theme }}>
      <Body className="bg-white font-roboto">
        <Container className="mx-auto mt-5 w-96 rounded-md bg-white p-4 text-center shadow ">
          <Img
            src={`https://www.mixiecooking.com/favicon.ico`}
            width="128"
            height="128"
            alt="Mixie logo"
            className="mx-auto h-32 w-32"
          />
          <Heading className="text-lg text-bold">
            Your login code for Mixie
          </Heading>
          <Text className="text-center">
            The link and code will be valid for the next 12 hours
          </Text>
          <Button href={url} className="rounded-md bg-yellow p-2 text-black">
            Login to Mixie
          </Button>
          <Text className="text-center">Or</Text>
          <Hr />
          <Text className="text-center">Login with the code below</Text>
          <Section className="mx-auto mb-3 mt-4 w-fit rounded-md bg-[#7a7a7a] px-2 py-1 align-middle">
            <Text className="text-4xl tacking-[6px] font mx-auto my-0 inline-block w-full py-2 text-center font-bold text-[#000]">
              {token}
            </Text>
          </Section>

          {/* <Text style={paragraph}>
                Contact{" "}
                <Link href="mailto:login@plaid.com" style={link}>
                  login@plaid.com
                </Link>{" "}
                if you did not request this code.
              </Text> */}
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default VerificationEmail;
