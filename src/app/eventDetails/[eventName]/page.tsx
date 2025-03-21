"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import RegisterForEvent from "@/components/RegisterForEvent";
import Image from "next/image";
interface EventType {
  _id: string;
  name: string;
  description: string;
  logo: string;
  prizepool: number;
  rules: string;
  maxPart: number;
  minPart: number;
}

export default function RegisterEventPage() {
  const router = useRouter();
  const { eventName } = useParams();
  const [eventData, setEventData] = useState<EventType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    if (!eventName) {
      router.push("/events");
    }
    const fetchEvent = async () => {
      try {
        const res = await fetch(`/api/event/${eventName}`);
        const data = await res.json();
        if (!data.success) {
          setErrorMsg(data.message || "Event not found");
        } else {
          setEventData(data.event);
        }
      } catch (error) {
        console.error("Error fetching event:", error);
        setErrorMsg("Server error");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [eventName, router]);

  if (loading) {
    return <p className="mt-20">Loading event details...</p>;
  }

  if (errorMsg) {
    return <p className="mt-20 text-red-500">{errorMsg}</p>;
  }

  if (!eventData) {
    return <p className="mt-20">No event data available.</p>;
  }

  return (
    <main className="mt-20 container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Register for {eventData.name}</h1>
      <div className="flex flex-col">
        <div className="relative w-full md:w-1/3 h-40">
          <Image
            src={eventData.logo}
            alt={eventData.name}
            fill
            className="object-cover rounded mb-10 md:mb-0 md:mr-4"
          />
        </div>
        <div>
          <p className="text-white mb-5">{eventData.description}</p>
          <p className="text-white mb-8">
            <strong>Prize Pool:</strong> {eventData.prizepool}
          </p>
        </div>
        <div>
          <p className="text-white mb-7">
            <strong>Prize Pool:</strong> {eventData.rules}
          </p>
        </div>
        <div>
          <p className="text-white mb-7">
            <strong>Maximum people:</strong> {eventData.maxPart}
          </p>
          <p className="text-white mb-7">
            <strong>Minimum people:</strong> {eventData.minPart}
          </p>
        </div>
      </div>
      <RegisterForEvent
        eventName={eventData.name}
        maxPart={eventData.maxPart}
        minPart={eventData.minPart}
      />
    </main>
  );
}
