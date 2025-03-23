import { NextPage } from "next";

const ShipAndDelievery: NextPage = () => {
  return (
    <div className="relative min-h-screen bg-black text-white bg-[url(https://images.unsplash.com/photo-1524334228333-0f6db392f8a1?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJsYWNrJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D)] bg-cover bg-center">
      <div className="mx-auto max-w-4xl p-6 mt-10 backdrop-blur-sm bg-black/50 rounded-lg shadow-2xl border border-white/10">
        <h1 className="mb-8 text-center text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
          Refunds and Cancellations Policy
        </h1>
        <div className="space-y-8">
          {/* Section 1 */}
          <section className="bg-gradient-to-br from-blue-900/80 to-purple-900/80 p-6 rounded-lg shadow-2xl border border-white/10 hover:border-blue-400/50 transition-all duration-300">
            <h2 className="mb-4 text-2xl font-semibold text-white">1. Refund Policy</h2>
            <ul className="space-y-2 text-gray-300">
              <li>- Refunds are only issued if the event is canceled by the organizer.</li>
              <li>- Refunds will be processed within <strong className="text-blue-300">7-14 business days</strong> after the cancellation is confirmed.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="bg-gradient-to-br from-purple-900/80 to-pink-900/80 p-6 rounded-lg shadow-2xl border border-white/10 hover:border-purple-400/50 transition-all duration-300">
            <h2 className="mb-4 text-2xl font-semibold text-white">2. Cancellation Requests</h2>
            <ul className="space-y-2 text-gray-300">
              <li>- Attendees may request cancellations up to <strong className="text-pink-300">7 days prior</strong> to the event for a partial refund.</li>
              <li>- Partial refunds will be <strong className="text-purple-300">50% of the ticket price</strong>, and processing will take <strong className="text-blue-300">7-14 business days</strong>.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="bg-gradient-to-br from-pink-900/80 to-indigo-900/80 p-6 rounded-lg shadow-2xl border border-white/10 hover:border-pink-400/50 transition-all duration-300">
            <h2 className="mb-4 text-2xl font-semibold text-white">3. No-Show Policy</h2>
            <ul className="space-y-2 text-gray-300">
              <li>- No refunds will be provided for no-shows or late arrivals.</li>
              <li>- However, attendees may contact us to reschedule their participation for a future event (if applicable).</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="bg-gradient-to-br from-indigo-900/80 to-blue-900/80 p-6 rounded-lg shadow-2xl border border-white/10 hover:border-indigo-400/50 transition-all duration-300">
            <h2 className="mb-4 text-2xl font-semibold text-white">4. Force Majeure</h2>
            <ul className="space-y-2 text-gray-300">
              <li>- In the event of cancellations due to natural disasters, government actions, or other uncontrollable circumstances, refunds will not be issued.</li>
              <li>- However, attendees will be offered the option to reschedule or receive a credit for a future event.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="bg-gradient-to-br from-blue-900/80 to-purple-900/80 p-6 rounded-lg shadow-2xl border border-white/10 hover:border-blue-400/50 transition-all duration-300">
            <h2 className="mb-4 text-2xl font-semibold text-white">5. Contact for Refunds</h2>
            <div className="space-y-2 text-gray-300">
              <p>
                Email:{" "}
                <a
                  href="mailto:amrishrock2002@gmail.com"
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  amrishrock2002@gmail.com
                </a>
              </p>
              <p>
                Phone:{" "}
                <a
                  href="tel:+919118841006"
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  +91 91188 41006
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ShipAndDelievery;