import { NextPage } from "next";
const RefundCancellation: NextPage = () => {
  return (
    <div className="relative min-h-screen bg-black text-white bg-[url(https://images.unsplash.com/photo-1524334228333-0f6db392f8a1?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJsYWNrJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D)]">
    <div className="mx-auto max-w-4xl p-6 mt-10 " >

      <h1 className="mb-6 text-center text-3xl font-bold">
        Refunds and Cancellations Policy
      </h1>
      <div className="space-y-6">
        <section>
          <h2 className="mb-2 text-2xl font-semibold">1. Refund Policy</h2>
          <p>
            - Refunds are not permitted except in cases where the event is
            canceled by the organizer.
          </p>
          <p>
            - Refunds will be processed within 7-14 business days of
            cancellation confirmation.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-2xl font-semibold">
            2. Cancellation Requests
          </h2>
          <p>
            - Attendees may request cancellations up to 7 days prior to the
            event for a partial refund (if applicable).
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-2xl font-semibold">3. No-Show Policy</h2>
          <p>- No refunds will be provided for no-shows or late arrivals.</p>
        </section>

        <section>
          <h2 className="mb-2 text-2xl font-semibold">4. Force Majeure</h2>
          <p>
            - Refunds will not be issued for cancellations due to natural
            disasters, government actions, or other uncontrollable events.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-2xl font-semibold">
            5. Contact for Refunds
          </h2>
          <p>
            Email:{" "}
            <a href="mailto:amrishrock2002@gmail.com" className="text-blue-600">
              amrishrock2002@gmail.com
            </a>
          </p>
          <p>
            Mobile:{" "}
            <a href="tel:+9118841006" className="text-blue-600">
              +91 9118841006
            </a>
          </p>
        </section>
      </div>
    </div>
   </div>
  );
};

export default RefundCancellation;