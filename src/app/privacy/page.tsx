import type { Metadata } from "next";
import {
  ExternalLink,
  LegalList,
  LegalPage,
  LegalSection,
  LegalSubheading,
  Strong,
} from "@/components/legal/legal-layout";
import { legalConfig } from "@/lib/legal-config";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Prakrit Solutions collects, uses, shares and protects personal data submitted through this website, and the rights you have over it.",
  alternates: { canonical: "/privacy" },
};

const mail = (address: string) => (
  <ExternalLink href={`mailto:${address}`}>{address}</ExternalLink>
);

export default function PrivacyPage() {
  const { grievanceOfficer } = legalConfig;

  return (
    <LegalPage title="Privacy Policy" updated={legalConfig.effectiveDate}>
      <LegalSection heading="1. Introduction">
        <p>
          Prakrit Solutions (“<Strong>Prakrit Solutions</Strong>,” “<Strong>we</Strong>,” “
          <Strong>us</Strong>,” or “<Strong>our</Strong>”) operates the website at{" "}
          <ExternalLink href="https://www.prakritsolutions.in">
            https://www.prakritsolutions.in
          </ExternalLink>{" "}
          (the “<Strong>Site</Strong>”). This Privacy Policy explains what personal
          data we collect through the Site, why we collect it, how we use and protect
          it, and the choices and rights available to you.
        </p>
        <p>
          This Policy applies only to the Site. It does not govern personal data we
          process on behalf of clients while delivering software development,
          consulting, or related services under a separate signed agreement — that
          processing is governed by the applicable client contract and, where
          required, a separate data processing agreement.
        </p>
        <p>
          By using the Site, you acknowledge the practices described in this Policy.
          If you do not agree, please do not use the Site.
        </p>
      </LegalSection>

      <LegalSection heading="2. Who We Are">
        <p>
          Prakrit Solutions is a software development business based in Surat,
          Gujarat, India. It is a trade name under which {legalConfig.operatorName},
          an individual, carries on business; it is not a registered company or
          other separate legal entity. For the purposes of India’s Digital Personal
          Data Protection Act, 2023 (the “<Strong>DPDP Act</Strong>”),{" "}
          {legalConfig.operatorName}, trading as Prakrit Solutions, is the{" "}
          <Strong>Data Fiduciary</Strong> for the personal data described in this
          Policy, and you are the <Strong>Data Principal</Strong>.
        </p>
        <p>
          Operated by: {legalConfig.operatorName}, trading as Prakrit Solutions
          <br />
          Location: {siteConfig.location}
          <br />
          General enquiries: {mail(siteConfig.email)}
          <br />
          Privacy enquiries: {mail(siteConfig.privacyEmail)}
          <br />
          Phone: {siteConfig.phone}
        </p>
      </LegalSection>

      <LegalSection heading="3. Information We Collect">
        <LegalSubheading>3.1 Information you provide directly</LegalSubheading>
        <p>When you submit the contact form on the Site, we collect:</p>
        <LegalList>
          <li>Name</li>
          <li>Company name (optional)</li>
          <li>Email address</li>
          <li>Phone number (optional)</li>
          <li>A description of the project or problem you want help with</li>
          <li>
            The service(s) you’re interested in (for example mobile, web, AI, or
            automation)
          </li>
          <li>Budget range (optional)</li>
          <li>Timeline (optional)</li>
          <li>Any additional information you choose to include</li>
        </LegalList>
        <p>
          If you email or call us directly instead of using the form, we collect
          whatever information you share with us in that communication.
        </p>

        <LegalSubheading>3.2 Information collected automatically</LegalSubheading>
        <p>
          <Strong>Analytics, with your consent.</Strong> The Site can use Google
          Analytics 4, a web analytics service provided by Google LLC, to understand
          how visitors use the Site — for example which pages are viewed, how visitors
          arrive, and general device, browser, and approximate location
          (city/region-level) information. Google Analytics uses cookies and similar
          technologies and collects data such as your IP address (which Google
          truncates or anonymizes in Google Analytics 4), pages visited, time spent,
          and interactions. It loads only after you choose “Accept” in the cookie
          banner shown on your first visit. You can change or withdraw your choice at
          any time using the “Cookie settings” link in the footer of the Site. This
          data is processed by Google on our behalf and is used only to help us
          improve the Site.
        </p>
        <p>
          You can also opt out of Google Analytics using Google’s browser add-on at{" "}
          <ExternalLink href="https://tools.google.com/dlpage/gaoptout">
            tools.google.com/dlpage/gaoptout
          </ExternalLink>
          , by blocking cookies in your browser settings, or by using your browser’s
          privacy tools.
        </p>
        <p>
          <Strong>Performance measurement.</Strong> We also use Vercel Web Analytics
          and Speed Insights, which measure page views and page-load performance
          without setting cookies or tracking you across other websites.
        </p>
        <p>
          <Strong>Hosting logs.</Strong> Our hosting provider automatically records
          standard technical information — such as IP address, request time, and
          requested URL — for security, reliability, and abuse-prevention purposes.
        </p>
        <p>
          We do not use advertising trackers or sell any data collected through these
          tools.
        </p>

        <LegalSubheading>3.3 Information we do not collect</LegalSubheading>
        <p>
          We do not intentionally collect payment card details, government identity
          numbers, health information, or other sensitive personal data through the
          Site, and we ask that you do not include such information in the contact
          form or in emails to us.
        </p>
      </LegalSection>

      <LegalSection heading="4. How We Use Your Information">
        <p>We use the personal data described above only to:</p>
        <LegalList>
          <li>
            Respond to your enquiry and communicate with you about a potential or
            ongoing engagement
          </li>
          <li>
            Understand the scope of the work you’re asking about so we can give you an
            accurate and useful response
          </li>
          <li>Maintain an internal record of enquiries for our own business operations</li>
          <li>
            Analyze aggregate usage of the Site so we can improve its content,
            performance, and usability
          </li>
          <li>Keep the Site secure and prevent abuse</li>
          <li>Comply with applicable legal obligations</li>
        </LegalList>
        <p>
          We do not use information you submit through the Site for advertising, and
          we do not sell, rent, or trade it to third parties.
        </p>
      </LegalSection>

      <LegalSection heading="5. Basis for Processing">
        <p>
          We process the personal data you submit through the contact form based on
          your consent, given when you choose to submit the form, and for the limited
          “legitimate uses” recognised under the DPDP Act, including responding to an
          enquiry you voluntarily initiated. Where we use analytics cookies, we do so
          only with your consent, which you can withdraw at any time as described in
          Section 3.2.
        </p>
      </LegalSection>

      <LegalSection heading="6. How We Share Your Information">
        <p>We do not sell your personal data. We share it only in these limited circumstances:</p>
        <LegalList>
          <li>
            <Strong>Service providers.</Strong> We use third-party providers to operate
            the Site and handle enquiries, including website hosting and performance
            measurement (Vercel Inc.), web analytics (Google LLC), and, where
            configured, transactional email delivery (such as Resend). These providers
            process data only to the extent needed to provide their service to us and
            under their own contractual and legal obligations.
          </li>
          <li>
            <Strong>Legal requirements.</Strong> We may disclose information if required
            by law, regulation, legal process, or a governmental request, or where
            necessary to protect our rights, your safety, or the safety of others.
          </li>
          <li>
            <Strong>Business transfers.</Strong> If Prakrit Solutions is involved in a
            merger, acquisition, or sale of assets, your information may be transferred
            as part of that transaction, subject to this Policy or a comparable
            successor policy.
          </li>
        </LegalList>
      </LegalSection>

      <LegalSection heading="7. Where Your Information Is Stored">
        <p>
          Our hosting, analytics, and email providers may store and process data on
          servers outside India, including in the United States. Where personal data
          is transferred outside India, we take reasonable steps to ensure it continues
          to receive appropriate protection, consistent with the DPDP Act and its
          rules. We do not knowingly transfer personal data to any country restricted
          by the Government of India under the DPDP Act.
        </p>
      </LegalSection>

      <LegalSection heading="8. Data Retention">
        <p>
          We retain enquiry information for as long as reasonably necessary to respond
          to you, maintain business records, and meet legal, accounting, or reporting
          obligations. If an enquiry does not proceed to an engagement, we retain it
          for {legalConfig.retentionPeriod} from your last contact with us, after which
          it is deleted or anonymized, unless a longer period is required by law.
          Google Analytics data is retained for the period configured in our analytics
          account (currently {legalConfig.analyticsRetention}).
        </p>
      </LegalSection>

      <LegalSection heading="9. Data Security">
        <p>
          We take reasonable technical and organizational measures to protect the
          personal data we hold against unauthorized access, alteration, disclosure, or
          destruction. No method of transmission over the internet or electronic
          storage is completely secure, and we cannot guarantee absolute security.
        </p>
      </LegalSection>

      <LegalSection heading="10. Your Rights">
        <p>Subject to applicable law, including the DPDP Act, you have the right to:</p>
        <LegalList>
          <li>
            <Strong>Access</Strong> a summary of the personal data we hold about you
            and the processing activities involved
          </li>
          <li>
            <Strong>Correct or update</Strong> inaccurate or incomplete personal data
          </li>
          <li>
            <Strong>Request erasure</Strong> of your personal data where it is no
            longer necessary for the purpose it was collected, or where you withdraw
            consent
          </li>
          <li>
            <Strong>Withdraw consent</Strong> at any time, without affecting the
            lawfulness of processing carried out before withdrawal
          </li>
          <li>
            <Strong>Nominate</Strong> another individual to exercise these rights on
            your behalf in the event of your death or incapacity
          </li>
          <li>
            <Strong>Seek grievance redressal</Strong> if you are dissatisfied with how
            we have handled your personal data or a request under this section
          </li>
        </LegalList>
        <p>
          To exercise any of these rights, write to {mail(siteConfig.privacyEmail)}. We
          will respond within the timeframe required by applicable law.
        </p>
      </LegalSection>

      <LegalSection heading="11. Grievance Officer">
        <p>
          In accordance with the DPDP Act, our designated Grievance Officer for
          questions, concerns, or complaints about this Policy or our handling of your
          personal data is:
        </p>
        <p>
          Name: {grievanceOfficer.name}
          <br />
          Designation: {grievanceOfficer.designation}
          <br />
          Email: {mail(siteConfig.privacyEmail)}
          <br />
          Location: {siteConfig.location}
        </p>
        <p>
          We aim to acknowledge grievances promptly and resolve them within the period
          prescribed by applicable law. If you remain unsatisfied, you may also
          approach the Data Protection Board of India once it is constituted and
          operational.
        </p>
      </LegalSection>

      <LegalSection heading="12. Children’s Privacy">
        <p>
          The Site is intended for business use and is not directed at individuals
          under 18. We do not knowingly collect personal data from children. If we
          learn that we have inadvertently collected personal data from a child without
          verifiable parental consent, we will delete it.
        </p>
      </LegalSection>

      <LegalSection heading="13. Third-Party Links">
        <p>
          The Site may link to third-party websites, including our social media
          profiles. This Policy does not apply to those sites, and we are not
          responsible for their content or privacy practices. Please review the privacy
          policy of any third-party site you visit.
        </p>
      </LegalSection>

      <LegalSection heading="14. Changes to This Policy">
        <p>
          We may update this Policy from time to time to reflect changes in our
          practices, technology, or legal requirements. We will post the revised Policy
          on this page with an updated “Last updated” date. Material changes will be
          highlighted where appropriate by a notice on the Site.
        </p>
      </LegalSection>

      <LegalSection heading="15. Governing Law">
        <p>
          This Policy is governed by the laws of India. Any dispute arising out of or
          in connection with this Policy is subject to the exclusive jurisdiction of
          the courts at Surat, Gujarat.
        </p>
      </LegalSection>

      <LegalSection heading="16. Contact Us">
        <p>
          {legalConfig.operatorName}, trading as Prakrit Solutions
          <br />
          {siteConfig.location}
          <br />
          {mail(siteConfig.privacyEmail)} · {mail(siteConfig.email)}
          <br />
          {siteConfig.phone}
        </p>
      </LegalSection>
    </LegalPage>
  );
}
