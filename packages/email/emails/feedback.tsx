import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Tailwind
} from "@react-email/components";
import * as React from "react";

type Feedback = {
  created_at?: string;
  description: string;
  feedback_id?: string;
  page?: string | null;
  title: string;
  type: "feature" | "bug" | "other";
  user_email: string;
  user_id?: string | null;
};

export default function NewFeedback({
  feedback = {
    user_email: "test@example.com",
    created_at: new Date().toString(),
    description: "Testing sections",
    page: "https://mixiecooking.com",
    title: "New feedback",
    type: "feature",
    user_id: "123",
    feedback_id: "123",
  },
}: {
  feedback: Feedback;
}) {
  return (
    <Html>
      <Head />
      <Preview>New feedback from {feedback.user_email}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-[#F8F5F1] font-sans">
          <Container className="mx-auto my-10 max-w-[500px] rounded border border-solid border-gray-200 px-10 py-5">
            <Section className="mt-8">
              <Img
                src={"https://www.mixiecooking.com/icons/icon_x128.jpg"}
                alt="Mixie"
                height={128}
                className="mx-auto h-32 w-32 rounded-full"
              />
            </Section>
            <Heading className="text-xl mx-0 my-7 p-0 text-center font-semibold text-[#0D1017]">
              New feedback from users
            </Heading>
            <Section className="relative flex h-[200px] flex-col gap-4">
              <Row className="relative mt-2" key="email">
                <Column className="text-bold text-lg text-black">Email:</Column>
                <Column className="pl-4 text-gray-600">
                  {feedback.user_email}
                </Column>
              </Row>
              <Row className="relative mt-2" key="feature">
                <Column className="text-bold text-lg text-black">
                  Feature type:
                </Column>
                <Column className="pl-4 text-gray-600">{feedback.type}</Column>
              </Row>
              <Row className="relative mt-2" key="page">
                <Column className="text-bold text-lg text-black">Page:</Column>
                <Column className="pl-4 text-gray-600">{feedback.page}</Column>
              </Row>
              <Row className="relative mt-2" key="title">
                <Column className="text-bold text-lg text-black">Title:</Column>
                <Column className="pl-4 text-gray-600">{feedback.title}</Column>
              </Row>
              <Row className="relative mt-2" key="description">
                <Column className="text-bold text-lg text-black">
                  Description:
                </Column>
                <Column className="pl-4 text-gray-600">
                  {feedback.description}
                </Column>
              </Row>
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
