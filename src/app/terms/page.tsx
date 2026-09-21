import type { Metadata } from "next";
import {
  ExternalLink,
  InternalLink,
  LegalList,
  LegalPage,
  LegalSection,
  Strong,
} from "@/components/legal/legal-layout";
import { legalConfig } from "@/lib/legal-config";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern use of the Prakrit Solutions website. Client engagements are governed by separate signed agreements.",
  alternates: { canonical: "/terms" },
};

const mail = (address: string) => (
  <ExternalLink href={`mailto:${address}`}>{address}</ExternalLink>
);

const whatsapp = (label: string, href: string) => (
  <ExternalLink href={href}>{label}</ExternalLink>
);

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated={legalConfig.effectiveDate}>
      <LegalSection heading="1. Acceptance of Terms">
        <p>
          These Terms of Service (“<Strong>Terms</Strong>”) govern your access to and
          use of the website at{" "}
          <ExternalLink href="https://prakritsolutions.in">
            https://prakritsolutions.in
          </ExternalLink>{" "}
          (the “<Strong>Site</Strong>”), operated by {legalConfig.operatorName},
          trading as Prakrit Solutions (“<Strong>Prakrit Solutions</Strong>,” “
          <Strong>we</Strong>,” “<Strong>us</Strong>,” or “<Strong>our</Strong>”). By accessing or using the
          Site, you agree to be bound by these Terms. If you do not agree, please do
          not use the Site.
        </p>
        <p>
          These Terms apply to your use of the Site only. They do <Strong>not</Strong>{" "}
          govern the delivery of any software development, consulting, or other
          professional services. Any such engagement is governed exclusively by a
          separate signed proposal, statement of work, or master services agreement
          between you (or your organization) and Prakrit Solutions (“
          <Strong>Engagement Terms</Strong>”). If these Terms conflict with applicable
          Engagement Terms, the Engagement Terms control for that engagement.
        </p>
      </LegalSection>

      <LegalSection heading="2. Who We Are">
        <p>
          Prakrit Solutions is a software development business based in Surat,
          Gujarat, India. It is a trade name under which {legalConfig.operatorName},
          an individual, carries on business; it is not a registered company or other
          separate legal entity. We design and build mobile applications, web
          applications, AI-powered products, and business automation for clients.
        </p>
        <p>
          Operated by: {legalConfig.operatorName}, trading as Prakrit Solutions
          <br />
          Location: {siteConfig.location}
          <br />
          Email: {mail(siteConfig.email)}
          <br />
          WhatsApp (messages only): {whatsapp(siteConfig.whatsapp, siteConfig.whatsappUrl)}
        </p>
      </LegalSection>

      <LegalSection heading="3. Use of the Site">
        <p>
          You may use the Site only for lawful purposes and in accordance with these
          Terms. You agree not to:
        </p>
        <LegalList>
          <li>
            Use the Site in any way that violates applicable local, state, national, or
            international law or regulation
          </li>
          <li>
            Attempt to gain unauthorized access to any part of the Site, other
            accounts, or any computer systems or networks connected to the Site
          </li>
          <li>Introduce any virus, malware, or other harmful or disruptive code</li>
          <li>
            Use any automated system, including bots or scrapers, to access the Site
            without our prior written consent
          </li>
          <li>
            Interfere with or disrupt the Site or the servers or networks used to
            provide it
          </li>
          <li>
            Impersonate any person or entity, or misrepresent your affiliation with any
            person or entity, when submitting information through the Site
          </li>
        </LegalList>
        <p>
          We may restrict or end your access to the Site at our discretion if we
          believe you have violated these Terms.
        </p>
      </LegalSection>

      <LegalSection heading="4. The Contact Form">
        <p>
          The Site includes a contact form for enquiries about a potential engagement.
          Submitting the form does not create a contract, obligation, or client
          relationship between you and Prakrit Solutions. An engagement is formed only
          when the parties sign a separate written agreement. We are under no
          obligation to respond to or accept any enquiry submitted through the Site.
        </p>
        <p>
          You are responsible for the accuracy of the information you submit. Please do
          not submit confidential, sensitive, or proprietary information through the
          form before an appropriate confidentiality agreement is in place between us.
        </p>
      </LegalSection>

      <LegalSection heading="5. Intellectual Property">
        <p>
          All content on the Site — including text, graphics, logos, layout, design,
          and underlying code — is the property of Prakrit Solutions or its licensors
          and is protected by applicable intellectual property laws, unless otherwise
          indicated. You may view and print pages of the Site for your own personal or
          internal business reference. You may not reproduce, distribute, modify,
          publicly display, or create derivative works from any part of the Site
          without our prior written consent, except as permitted by applicable law.
        </p>
        <p>
          The Prakrit Solutions name and logo are used by {legalConfig.operatorName} as
          a trade name and brand. Nothing in these Terms grants you any right to use our name, logo, or
          trademarks without our prior written consent.
        </p>
      </LegalSection>

      <LegalSection heading="6. No Warranties">
        <p>
          The Site and all content on it are provided on an “as is” and “as available”
          basis, without warranties of any kind, express or implied, including — to the
          extent permitted by applicable law — implied warranties of merchantability,
          fitness for a particular purpose, non-infringement, or accuracy. We do not
          warrant that the Site will be uninterrupted, secure, or error-free, or that
          any defects will be corrected.
        </p>
        <p>
          Nothing on the Site is professional advice specific to your circumstances.
          Descriptions of our services, process, and approach are provided for general
          information and are not a commitment, quote, or guarantee of any particular
          outcome for any prospective engagement.
        </p>
      </LegalSection>

      <LegalSection heading="7. Limitation of Liability">
        <p>
          To the fullest extent permitted by applicable law, Prakrit Solutions and its
          officers, employees, and agents will not be liable for any indirect,
          incidental, special, consequential, or punitive damages, or any loss of
          profits, revenue, data, or business opportunity, arising out of or in
          connection with your use of, or inability to use, the Site, even if we have
          been advised of the possibility of such damages. Our total aggregate
          liability for any claim relating to the Site will not exceed{" "}
          {legalConfig.liabilityCap}.
        </p>
      </LegalSection>

      <LegalSection heading="8. Indemnification">
        <p>
          You agree to indemnify and hold harmless Prakrit Solutions and its officers,
          employees, and agents from any claims, liabilities, damages, losses, and
          expenses, including reasonable legal fees, arising out of your violation of
          these Terms or your misuse of the Site.
        </p>
      </LegalSection>

      <LegalSection heading="9. Third-Party Links and Services">
        <p>
          The Site may contain links to third-party websites or services that we do not
          own or control, and uses third-party services such as web analytics. We have
          no control over, and assume no responsibility for, the content, privacy
          policies, or practices of any third-party site or service. Your use of any
          third-party site is at your own risk and subject to that site’s own terms.
        </p>
      </LegalSection>

      <LegalSection heading="10. Privacy">
        <p>
          Our collection and use of personal data through the Site is described in our{" "}
          <InternalLink href="/privacy">Privacy Policy</InternalLink>, which forms part
          of these Terms.
        </p>
      </LegalSection>

      <LegalSection heading="11. Changes to the Site and These Terms">
        <p>
          We may modify, suspend, or discontinue the Site, or any part of it, at any
          time without notice. We may also revise these Terms from time to time.
          Updated Terms will be posted on this page with a revised “Last updated” date
          and take effect on posting. Your continued use of the Site after any change
          means you accept the revised Terms.
        </p>
      </LegalSection>

      <LegalSection heading="12. Governing Law and Jurisdiction">
        <p>
          These Terms are governed by the laws of India, without regard to
          conflict-of-laws principles. Any dispute arising out of or in connection with
          these Terms or your use of the Site is subject to the exclusive jurisdiction
          of the courts at Surat, Gujarat.
        </p>
      </LegalSection>

      <LegalSection heading="13. Severability">
        <p>
          If any provision of these Terms is found to be unenforceable or invalid, that
          provision will be limited or removed to the minimum extent necessary, and the
          remaining provisions will stay in full force and effect.
        </p>
      </LegalSection>

      <LegalSection heading="14. Entire Agreement">
        <p>
          These Terms and our Privacy Policy are the entire agreement between you and
          Prakrit Solutions regarding your use of the Site and supersede any prior
          agreements relating to the Site. They do not affect the terms of any separate
          signed Engagement Terms.
        </p>
      </LegalSection>

      <LegalSection heading="15. Contact Us">
        <p>
          {legalConfig.operatorName}, trading as Prakrit Solutions
          <br />
          {siteConfig.location}
          <br />
          {mail(siteConfig.email)}
          <br />
          WhatsApp (messages only): {whatsapp(siteConfig.whatsapp, siteConfig.whatsappUrl)}
        </p>
      </LegalSection>
    </LegalPage>
  );
}
