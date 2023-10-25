import React from "react";
import Link from "next/link";

export default function Privacy_PolicyPage() {
  return (
    <>
      <main className="mx-auto my-0 max-w-[800px] p-10">
        <h1 className="mb-5 text-step1 font-bold">Privacy Policy</h1>
        <h2 className="mb-5 text-step--2 font-bold">Last updated: 19/9/23</h2>
        <p className="mb-5 text-step--3">
          Welcome to Meally, where your privacy and data security are our top
          priorities. We are committed to ensuring that your personal
          information is handled with care and used only for legitimate
          purposes. This privacy policy outlines how we collect, use, and
          protect your information.
        </p>
        <p>
          At Meally, we value your trust and are dedicated to safeguarding your
          privacy. This policy explains how we collect, use, share, and protect
          your personal information. By using our platform, you agree to the
          practices described herein.
        </p>
        <br />
        <ol className="mb-5 list-decimal pl-5">
          <li className="mb-5 text-step--3">
            Information we collect:
            <p className="mb-5 text-step--3">
              When you sign up on our website, we collect the following
              information voluntarily:
              <br />
              <ul className="ml-8 list-disc">
                <li>Your name</li>
                <li>Your email address</li>
                <li>
                  Profile picture (provided by yourself or sign-in service,
                  e.g., Google, Facebook, or Github)
                </li>
              </ul>
              <br />
              <p>
                Additionally, we collect data related to the recipes you
                interact with, including those you have clicked on, made, or
                created. This information is stored securely within our platform
                and is not shared with third parties.
              </p>
            </p>
          </li>
          <li className="mb-5 text-step--3">
            Use of information:
            <p className="mb-3 text-step--3">
              We use the data we collect from your recipe interactions to
              enhance your experience on our platform. This includes optimizing
              suggested recipes tailored to your preferences and improving our
              overall service.
            </p>
          </li>
          <li className="mb-5 text-step--3">
            Cookies and Tracking Technologies
            <p className="mb-3 text-step--3">
              To maintain our free service, we rely on advertisements provided
              by{" "}
              <Link
                href="https://adsense.google.com/start/"
                target="_blank"
                className="text-blue underline underline-offset-0"
              >
                Google Adsense
              </Link>
              . We may also collect analytics data to enhance user experience.
              {/* You can manage your preferences for cookies and tracking
              technologies in your account settings. */}
            </p>
          </li>
          <li className="mb-5 text-step--3">
            Sharing of Information
            <p className="mb-3 text-step--3">
              We do not share your personal information for third-party
              marketing purposes. However, we may share your information with
              service providers who assist us in delivering our products and
              services. We will also disclose information if required by law or
              if we believe it is necessary to protect our rights or the rights
              of others.
            </p>
          </li>
          <li className="mb-5 text-step--3">
            Data Security
            <p className="mb-3 text-step--3">
              We take extensive measures to protect your personal information
              from unauthorized access, use, or disclosure. While we implement
              robust security protocols, please understand that no online method
              is entirely secure. Nevertheless, we are committed to doing
              everything within our power to ensure the safety of your data. .
            </p>
          </li>
          <li className="mb-5 text-step--3">
            Your Choices
            <p className="mb-3 text-step--3">
              You have the right to opt out of receiving marketing
              communications from us at any time, including newsletters and
              updates. and updates. You can request access to your information,
              which may take up to 24 hours to process. Additionally, you have
              the option to delete your Meally account; however, please note
              that this action will not delete your recipes.
              {/* For more details, please read
              our [Account Deletion Policy](#link-to-account-deletion-policy). */}
            </p>
          </li>
          <li className="mb-5 text-step--3">
            Data Retention
            <p className="mb-3 text-step--3">
              We retain your data only for as long as necessary to fulfill the
              purposes outlined in this policy or as required by law. Afterward,
              we may anonymize or delete your data securely.
            </p>
          </li>
          <li className="mb-5 text-step--3">
            Changes to the Privacy Policy
            <p className="mb-3 text-step--3">
              We may update this Privacy Policy periodically. In the event of
              significant changes, we will notify you by posting a notice on our
              website and sending an email to your registered address.
            </p>
          </li>
          <li className="mb-5 text-step--3">
            Consent
            <p className="mb-3 text-step--3">
              By using Meally, you consent to the collection and use of your
              data as described in this Privacy Policy.
            </p>
          </li>
        </ol>
      </main>
    </>
  );
}
