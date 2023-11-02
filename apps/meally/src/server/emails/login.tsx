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
  email = "panic@thedis.co",
  url = "http://localhost:8888/api/auth/callback/email?callbackUrl=http%3A%2F%2Fapp.localhost%3A3000%2Flogin&token=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx&email=youremail@gmail.com",
  token = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
}: {
  email: string;
  url: string;
  token: string;
}) {
  return (
    <Html>
      <Head />
      <Preview>Your Meally Login Link</Preview>
      <Tailwind>
        <Body className="font-sans mx-auto my-auto bg-white">
          <Container className="border-gray-200 mx-auto my-10 max-w-[500px] rounded border border-solid px-10 py-5">
            <Section className="mt-8">
              <Img
                src={"/favicon.ico"}
                width="40"
                height="40"
                alt="Meally"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="text-xl mx-0 my-7 p-0 text-center font-semibold text-black">
              Your Login Link
            </Heading>
            <Text className="text-step--3 leading-6 text-black">
              Welcome to Meally!
            </Text>
            <Text className="text-step--3 leading-6 text-black">
              Please click the link below to sign in to your account.
            </Text>
            <Section className="my-8 text-center">
              <Link
                className="rounded-full bg-black px-6 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={url}
              >
                Sign in
              </Link>
            </Section>
            <Text className="text-step--3 leading-6 text-black">
              or copy and paste this URL into your browser:
            </Text>
            <Text className="text-purple-600 max-w-sm flex-wrap break-words font-medium no-underline">
              {url.replace(/^https?:\/\//, "")}
            </Text>
            <Text className="text-center">Or</Text>
            <Hr />
            <Text className="text-center">Login with the code below</Text>
            <Section className="mx-auto mb-3 mt-4 w-fit rounded-md bg-[#7a7a7a] px-2 py-1 align-middle">
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
