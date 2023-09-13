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

interface PlaidVerifyIdentityEmailProps {
  validationCode?: string;
}

export const VerificationEmail = ({
  validationCode = "144833",
}: PlaidVerifyIdentityEmailProps) => (
  <Html>
    <Head />
    <Tailwind>
      <Body className="font-sans bg-white">
        <Container className="mx-auto mt-5 w-96 rounded-md bg-white p-4 text-center shadow ">
          <Img
            src={`https://meally.com.au/favicon.ico`}
            width="128"
            height="128"
            alt="Meally logo"
            className="mx-auto h-32 w-32"
          />
          <Heading className="text-lg text-bold">
            Your login code for Meally
          </Heading>
          <Text className="text-center">
            The link and code will be valid for the next 12 hours
          </Text>
          <Button
            href={`https://meally.com.au/auto/sign?verfiy-request=${validationCode}`}
            className="bg-amber-400 rounded-sm p-2 text-black"
          >
            Login to Meally
          </Button>
          <Text className="text-center">Or</Text>
          <Hr />
          <Text className="text-center">Login with the code below</Text>
          <Section className="bg-slate-500 mx-auto mb-3 mt-4 w-fit rounded-md px-2 py-1 align-middle">
            <Text className="text-4xl tacking-[6px] font mx-auto my-0 inline-block w-full py-2 text-center font-bold text-black">
              {validationCode}
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
