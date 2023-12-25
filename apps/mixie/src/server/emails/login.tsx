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
            <Heading className="text-xl mx-0 my-7 p-0 text-center font-semibold text-[#0D1017]">
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
            <Section className="mx-auto mb-3 mt-4 w-fit rounded-md border border-solid border-[#0D1017] px-4 py-3 align-middle">
              <Text className="tacking-[6px] font mx-auto my-0 inline-block w-full py-2 text-center text-step--2 font-bold text-[#000]">
                {token}
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
