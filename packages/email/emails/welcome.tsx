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
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";

export default function WelcomeToMixie({
  email = "cook@mixiecooking.com",
  name = "",
}: {
  email: string;
  name: string;
}) {
  return (
    <Html>
      <Head />
      <Preview>We are thrilled to have you join the Mixie community</Preview>
      <Tailwind>
        <Body className="font-sans mx-auto my-auto bg-[#F8F5F1]">
          <Container className="mx-auto my-10 max-w-[500px] rounded border border-solid border-gray-200 px-10 py-5">
            <Section className="mt-8">
              <Link href="https://www.mixiecooking.com">
                <Img
                  src={"https://www.mixiecooking.com/icons/icon_x128.jpg"}
                  alt="Mixie"
                  width={128}
                  height={128}
                  className="mx-auto h-32 w-32 rounded-full"
                />
              </Link>
            </Section>
            <Heading as="h2" className="text-bold text-center text-xl">
              Welcome to Mixie, {name}!
            </Heading>

            <Text>
              We're thrilled to have you join our community. We can't wait to
              see what you create. As Mixie is still in development, we would
              love to hear your feedback.
            </Text>
            <Text>Get started by any of the following:</Text>

            <Row className="">
              <Text className="text-bold text-md">
                1.{" "}
                <Link href="https://www.mixiecooking.com/recipes/create">
                  Create your own recipe
                </Link>
              </Text>
              <Text className="text-bold text-md mt-2">
                2.{" "}
                <Link href="https://www.mixiecooking.com/recipes">
                  Find your new taste sensation
                </Link>
              </Text>
              <Text className="text-bold text-md mt-2">
                3.{" "}
                <Link href="https://forms.gle/eoYpuU8wMFUbWr5j7">
                  Give Feedback
                </Link>
              </Text>
            </Row>
            <Text>Happy cooking!</Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: 12,
                color: "rgb(0,0,0, 0.7)",
              }}
            >
              © 2023 - 2024 | MixieCokking |{" "}
              <Link href="https://mixiecooking.com">mixiecooking.com</Link>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
