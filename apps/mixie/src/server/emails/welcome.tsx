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

export default function WelcomeToMixie({
  email = "cook@mixiecooking.com",
  url = "",
  token = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
}: {
  email: string;
  url: string;
  token: string;
}) {
  return (
    <Html>
      <Head />
      <Preview>Welcome Mixie</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-[#F8F5F1] font-sans">
          <Container className="mx-auto my-10 max-w-[500px] rounded border border-solid border-gray-200 px-10 py-5">
            <Section className="mt-8">
              <Img
                src={"https://www.mixiecooking.com/icons/icon_x128.jpg"}
                width="40"
                height="40"
                alt="Mixie"
                className="mx-auto my-0"
              />
            </Section>
            <Text className="text-step--3 leading-6 text-[#0D1017]">
              Welcome to Mixie!
            </Text>
            <Text className="text-step--3 leading-6 text-[#0D1017]">
              We are so excited to see you join our community for home cooks, food enhuists  
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
