import { NextPage } from "next";
import Link from "next/link";

const ShippingAndDelivery: NextPage = () => {
  return (
    <div className="relative min-h-screen bg-black text-white bg-[url(https://images.unsplash.com/photo-1524334228333-0f6db392f8a1?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJsYWNrJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D)]">
    <div className="mx-auto max-w-4xl p-6 mt-10">
      <h1 className="mb-6 text-center text-3xl font-bold">
        Shipping and Delivery Policy
      </h1>
      <div className="space-y-6">
        <section>
          <h2 className="mb-2 text-2xl font-semibold">
            1. Ticket Distribution
          </h2>
          <p>
            <strong>a. Collection at Venue:</strong> Tickets may be collected
            directly at the event venue upon verification.
          </p>
          <p>
            <strong>b. Electronic Tickets:</strong> Tickets may be sent
            electronically to the email address provided during registration.
          </p>
          <p>
            <strong>c. Delivery Options:</strong> Choice of delivery method may
            be offered based on event requirements and organizer discretion.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-2xl font-semibold">
            2. Payment for Venue Tickets
          </h2>
          <p>
            <strong>a. Advance Payment:</strong> Payments can be made in advance
            via the SCSE Fest platform to secure your ticket.
          </p>
          <p>
            <strong>b. On-Site Payment:</strong> Payment may also be accepted at
            the venue, subject to organizer policies.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-2xl font-semibold">3. Offline Ticketing</h2>
          <p>
            <strong>a. Retail Partners:</strong> Tickets may be available
            through offline retail partners such as cafés and other designated
            outlets.
          </p>
          <p>
            <strong>b. Availability:</strong> Offline ticketing options will be
            offered alongside online ticket availability for convenience.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-2xl font-semibold">4. Ticket Formats</h2>
          <p>
            <strong>a. Electronic Tickets:</strong> Organizers may provide
            electronic tickets to attendees for ease of use.
          </p>
          <p>
            <strong>b. Paper Tickets:</strong> Paper tickets may also be
            offered, depending on attendee preference and event requirements.
          </p>
          <p>
            <strong>c. Dual Format Availability:</strong> Both formats may be
            made available to cater to diverse needs.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-2xl font-semibold">
            5. Agreement to Policy
          </h2>
          <p>
            By purchasing a ticket, you acknowledge and agree to abide by these
            shipping and delivery policies as set forth by the SCSE Fest
            organizers.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-2xl font-semibold">6. Contact Us</h2>
          <p>
            If you have any questions or concerns regarding this Shipping and
            Delivery Policy, please contact us at:
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
    </div>
  );
};

export default ShippingAndDelivery;
