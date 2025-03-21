"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
interface Event {
  _id: string;
  name: string;
  description: string;
  logo: string;
  prizepool: number;
}

export default function Page() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get("/api/events");
      setEvents(res.data.events || []);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 mt-10">
      <h1 className="text-2xl font-bold mb-6">All Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event._id} className="bg-white rounded shadow p-4">
            <div className="relative w-full h-40">
              <Image
                src={event.logo}
                alt={event.name}
                fill
                className="object-cover rounded mb-4"
              />
            </div>
            <h2 className="text-lg font-bold mb-2">{event.name}</h2>
            <p className="text-gray-600 mb-2">
              <strong>Prize Pool:</strong> {event.prizepool}
            </p>
            <p className="text-sm text-gray-700 max-h-16 overflow-hidden">
              {event.description}
            </p>
            <Link href={`eventDetails/${event.name}`}>
              <button className="bg-blue-600 w-35 h-12">Get details</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
