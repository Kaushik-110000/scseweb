import { NextPage } from "next";
import Link from "next/link";

const ShippingAndDelivery: NextPage = () => {
  return (
    <div className="relative min-h-screen bg-black text-white bg-[url(https://images.unsplash.com/photo-1524334228333-0f6db392f8a1?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJsYWNrJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D)] bg-cover bg-center">
      <div className="mx-auto max-w-4xl p-6 mt-10 backdrop-blur-sm bg-black/50 rounded-lg shadow-2xl border border-white/10">
        <h1 className="mb-8 text-center text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
          Shipping and Delivery Policy
        </h1>
        <div className="space-y-8">
          {/* Section 1 */}
          <section className="bg-gradient-to-br from-blue-900/80 to-purple-900/80 p-6 rounded-lg shadow-2xl border border-white/10 hover:border-blue-400/50 transition-all duration-300">
            <h2 className="mb-4 text-2xl font-semibold text-white">
              1. Ticket Distribution
            </h2>
            <div className="space-y-3 text-gray-300">
              <p>
                <strong className="text-blue-300">a. Collection at Venue:</strong> Tickets may be collected
                directly at the event venue upon verification.
              </p>
              <p>
                <strong className="text-purple-300">b. Electronic Tickets:</strong> Tickets may be sent
                electronically to the email address provided during registration.
              </p>
              <p>
                <strong className="text-pink-300">c. Delivery Options:</strong> Choice of delivery method may
                be offered based on event requirements and organizer discretion.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="bg-gradient-to-br from-purple-900/80 to-pink-900/80 p-6 rounded-lg shadow-2xl border border-white/10 hover:border-purple-400/50 transition-all duration-300">
            <h2 className="mb-4 text-2xl font-semibold text-white">
              2. Payment for Venue Tickets
            </h2>
            <div className="space-y-3 text-gray-300">
              <p>
                <strong className="text-blue-300">a. Advance Payment:</strong> Payments can be made in advance
                via the SCSE Fest platform to secure your ticket.
              </p>
              <p>
                <strong className="text-purple-300">b. On-Site Payment:</strong> Payment may also be accepted at
                the venue, subject to organizer policies.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section className="bg-gradient-to-br from-pink-900/80 to-indigo-900/80 p-6 rounded-lg shadow-2xl border border-white/10 hover:border-pink-400/50 transition-all duration-300">
            <h2 className="mb-4 text-2xl font-semibold text-white">
              3. Offline Ticketing
            </h2>
            <div className="space-y-3 text-gray-300">
              <p>
                <strong className="text-indigo-300">a. Retail Partners:</strong> Tickets may be available
                through offline retail partners such as cafés and other designated
                outlets.
              </p>
              <p>
                <strong className="text-pink-300">b. Availability:</strong> Offline ticketing options will be
                offered alongside online ticket availability for convenience.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="bg-gradient-to-br from-indigo-900/80 to-blue-900/80 p-6 rounded-lg shadow-2xl border border-white/10 hover:border-indigo-400/50 transition-all duration-300">
            <h2 className="mb-4 text-2xl font-semibold text-white">
              4. Ticket Formats
            </h2>
            <div className="space-y-3 text-gray-300">
              <p>
                <strong className="text-blue-300">a. Electronic Tickets:</strong> Organizers may provide
                electronic tickets to attendees for ease of use.
              </p>
              <p>
                <strong className="text-purple-300">b. Paper Tickets:</strong> Paper tickets may also be
                offered, depending on attendee preference and event requirements.
              </p>
              <p>
                <strong className="text-pink-300">c. Dual Format Availability:</strong> Both formats may be
                made available to cater to diverse needs.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section className="bg-gradient-to-br from-blue-900/80 to-purple-900/80 p-6 rounded-lg shadow-2xl border border-white/10 hover:border-blue-400/50 transition-all duration-300">
            <h2 className="mb-4 text-2xl font-semibold text-white">
              5. Agreement to Policy
            </h2>
            <p className="text-gray-300">
              By purchasing a ticket, you acknowledge and agree to abide by these
              shipping and delivery policies as set forth by the SCSE Fest
              organizers.
            </p>
          </section>

          {/* Section 6 */}
          <section className="bg-gradient-to-br from-purple-900/80 to-pink-900/80 p-6 rounded-lg shadow-2xl border border-white/10 hover:border-purple-400/50 transition-all duration-300">
            <h2 className="mb-4 text-2xl font-semibold text-white">
              6. Contact Us
            </h2>
            <div className="space-y-3 text-gray-300">
              <p>
                If you have any questions or concerns regarding this Shipping and
                Delivery Policy, please contact us at:
              </p>
              <p>
                Email:{" "}
                <a
                  href="mailto:amrishrock2002@gmail.com"
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  amrishrock2002@gmail.com
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

export default ShippingAndDelivery;