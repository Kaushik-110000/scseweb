import { NextPage } from "next";
import Link from "next/link";
const PrivacyPolicy: NextPage = () => {
  return (
    <div className="mx-auto max-w-4xl p-6 mt-10">
      <h1 className="mb-6 text-center text-3xl font-bold">Privacy Policy</h1>
      <div className="space-y-6">
        <section>
          <h2 className="mb-2 text-2xl font-semibold">
            1. Information We Collect
          </h2>
          <p>
            <strong>a. Personal Information:</strong> We may collect personal
            details such as your name, email address, contact number, and other
            relevant data when you register for events, purchase tickets, or
            participate in activities.
          </p>
          <p>
            <strong>b. Non-Personal Information:</strong> We may also collect
            non-personal information, including browser type, IP address, and
            device information, to improve user experience and enhance our
            services.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-2xl font-semibold">
            2. How We Use Your Information
          </h2>
          <p>
            <strong>a. Event Registration:</strong> Your personal information is
            used to process event registrations, provide tickets, and
            communicate important updates related to SCSE Fest 2025.
          </p>
          <p>
            <strong>b. Communication:</strong> We may use your email address or
            contact number to send updates about upcoming events, promotions,
            and other relevant information. You can opt out of these
            communications at any time.
          </p>
          <p>
            <strong>c. Improvement of Services:</strong> Non-personal
            information is used to analyze website usage patterns, troubleshoot
            issues, and improve overall functionality and user experience.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-2xl font-semibold">
            3. Disclosure of Information
          </h2>
          <p>
            <strong>a. Third-Party Service Providers:</strong> Your information
            may be shared with trusted third-party service providers, such as
            payment gateways, to facilitate transactions and deliver services.
          </p>
          <p>
            <strong>b. Legal Requirements:</strong> We may disclose personal
            information if required by law or in response to valid legal
            requests such as court orders or subpoenas.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-2xl font-semibold">4. Security</h2>
          <p>
            We take reasonable measures to protect your personal information
            from unauthorized access, disclosure, alteration, or destruction.
            However, no method of electronic storage or internet transmission is
            entirely secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-2xl font-semibold">5. Cookies</h2>
          <p>
            Our website may use cookies to enhance your browsing experience. You
            can adjust your browser settings to disable cookies, though this may
            affect the functionality of the site.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-2xl font-semibold">
            6. Links to Third-Party Websites
          </h2>
          <p>
            Our website may contain links to external websites. SCSE Fest 2025 is
            not responsible for the privacy practices or content of these
            websites. We recommend reviewing their privacy policies before
            providing any personal information.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-2xl font-semibold">
            7. Changes to this Privacy Policy
          </h2>
          <p>
            SCSE Fest 2025 reserves the right to modify or update this Privacy
            Policy at any time. Changes will take effect immediately upon
            posting. We encourage you to review this policy periodically for
            updates.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-2xl font-semibold">8. Contact Us</h2>
          <p>
            If you have any questions or concerns regarding this Privacy Policy,
            please contact us at:
          </p>
          <p>
            Email:{" "}
            <a href="mailto:amrishrock2002@gmail.com" className="text-blue-600">
              amrishrock2002@gmail.com
            </a>
          </p>
          <div className="mt-2">
            <button className="bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl w-30 h-10">
              <Link href={"/contact"}>Contact Us</Link>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
