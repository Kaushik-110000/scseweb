import { NextPage } from "next";
import Link from "next/link";

const PrivacyPolicy: NextPage = () => {
  return (
    <div className="relative min-h-screen bg-black text-white bg-[url(https://images.unsplash.com/photo-1524334228333-0f6db392f8a1?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJsYWNrJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D)] bg-cover bg-center">
      <div className="mx-auto max-w-4xl p-6 mt-10 backdrop-blur-sm bg-black/50 rounded-lg shadow-2xl border border-white/10">
        <h1 className="mb-8 text-center text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
          Privacy Policy
        </h1>
        <div className="space-y-8">
          {/* Section 1 */}
          <section className="bg-gradient-to-br from-blue-900/80 to-purple-900/80 p-6 rounded-lg shadow-2xl border border-white/10 hover:border-blue-400/50 transition-all duration-300">
            <h2 className="mb-4 text-2xl font-semibold text-white">
              1. Information We Collect
            </h2>
            <div className="space-y-3 text-gray-300">
              <p>
                <strong className="text-blue-300">a. Personal Information:</strong> We may collect personal
                details such as your name, email address, contact number, and
                other relevant data when you register for events, purchase
                tickets, or participate in activities.
              </p>
              <p>
                <strong className="text-purple-300">b. Non-Personal Information:</strong> We may also collect
                non-personal information, including browser type, IP address,
                and device information, to improve user experience and enhance
                our services.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="bg-gradient-to-br from-purple-900/80 to-pink-900/80 p-6 rounded-lg shadow-2xl border border-white/10 hover:border-purple-400/50 transition-all duration-300">
            <h2 className="mb-4 text-2xl font-semibold text-white">
              2. How We Use Your Information
            </h2>
            <div className="space-y-3 text-gray-300">
              <p>
                <strong className="text-pink-300">a. Event Registration:</strong> Your personal information
                is used to process event registrations, provide tickets, and
                communicate important updates related to SCSE Fest 2025.
              </p>
              <p>
                <strong className="text-blue-300">b. Communication:</strong> We may use your email address
                or contact number to send updates about upcoming events,
                promotions, and other relevant information. You can opt out of
                these communications at any time.
              </p>
              <p>
                <strong className="text-purple-300">c. Improvement of Services:</strong> Non-personal
                information is used to analyze website usage patterns,
                troubleshoot issues, and improve overall functionality and user
                experience.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section className="bg-gradient-to-br from-pink-900/80 to-indigo-900/80 p-6 rounded-lg shadow-2xl border border-white/10 hover:border-pink-400/50 transition-all duration-300">
            <h2 className="mb-4 text-2xl font-semibold text-white">
              3. Disclosure of Information
            </h2>
            <div className="space-y-3 text-gray-300">
              <p>
                <strong className="text-indigo-300">a. Third-Party Service Providers:</strong> Your
                information may be shared with trusted third-party service
                providers, such as payment gateways, to facilitate transactions
                and deliver services.
              </p>
              <p>
                <strong className="text-pink-300">b. Legal Requirements:</strong> We may disclose personal
                information if required by law or in response to valid legal
                requests such as court orders or subpoenas.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="bg-gradient-to-br from-indigo-900/80 to-blue-900/80 p-6 rounded-lg shadow-2xl border border-white/10 hover:border-indigo-400/50 transition-all duration-300">
            <h2 className="mb-4 text-2xl font-semibold text-white">4. Security</h2>
            <p className="text-gray-300">
              We take reasonable measures to protect your personal information
              from unauthorized access, disclosure, alteration, or destruction.
              However, no method of electronic storage or internet transmission
              is entirely secure, and we cannot guarantee absolute security.
            </p>
          </section>

          {/* Section 5 */}
          <section className="bg-gradient-to-br from-blue-900/80 to-purple-900/80 p-6 rounded-lg shadow-2xl border border-white/10 hover:border-blue-400/50 transition-all duration-300">
            <h2 className="mb-4 text-2xl font-semibold text-white">5. Cookies</h2>
            <p className="text-gray-300">
              Our website may use cookies to enhance your browsing experience.
              You can adjust your browser settings to disable cookies, though
              this may affect the functionality of the site.
            </p>
          </section>

          {/* Section 6 */}
          <section className="bg-gradient-to-br from-purple-900/80 to-pink-900/80 p-6 rounded-lg shadow-2xl border border-white/10 hover:border-purple-400/50 transition-all duration-300">
            <h2 className="mb-4 text-2xl font-semibold text-white">
              6. Links to Third-Party Websites
            </h2>
            <p className="text-gray-300">
              Our website may contain links to external websites. SCSE Fest 2025
              is not responsible for the privacy practices or content of these
              websites. We recommend reviewing their privacy policies before
              providing any personal information.
            </p>
          </section>

          {/* Section 7 */}
          <section className="bg-gradient-to-br from-pink-900/80 to-indigo-900/80 p-6 rounded-lg shadow-2xl border border-white/10 hover:border-pink-400/50 transition-all duration-300">
            <h2 className="mb-4 text-2xl font-semibold text-white">
              7. Changes to this Privacy Policy
            </h2>
            <p className="text-gray-300">
              SCSE Fest 2025 reserves the right to modify or update this Privacy
              Policy at any time. Changes will take effect immediately upon
              posting. We encourage you to review this policy periodically for
              updates.
            </p>
          </section>

          {/* Section 8 */}
          <section className="bg-gradient-to-br from-indigo-900/80 to-blue-900/80 p-6 rounded-lg shadow-2xl border border-white/10 hover:border-indigo-400/50 transition-all duration-300">
            <h2 className="mb-4 text-2xl font-semibold text-white">8. Contact Us</h2>
            <div className="space-y-3 text-gray-300">
              <p>
                If you have any questions or concerns regarding this Privacy
                Policy, please contact us at:
              </p>
              <p>
                Email:{" "}
                <a
                  href="mailto:support@yourcompanydomain.com"
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  support@yourcompanydomain.com
                </a>
              </p>
              <div className="mt-4">
                <Link
                  href="/contact"
                  className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;