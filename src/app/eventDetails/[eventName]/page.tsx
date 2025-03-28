"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import RegisterForEvent from "@/components/RegisterForEvent";

interface EventType {
  _id: string;
  name: string;
  description: string;
  logo: string;
  prizepool: number;
  regFees: number;
  rules: string;
  more: string;
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
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="animate-pulse text-xl text-purple-300">
          Loading event details...
        </div>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-red-400 text-xl bg-red-900/30 px-8 py-4 rounded-xl">
          {errorMsg}
        </div>
      </div>
    );
  }

  if (!eventData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-purple-300 text-xl">No event data available.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-10 relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Animated background elements */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          animation: "animatedBackground 100s linear infinite",
        }}
      ></div>

      <main className="flex items-center justify-center min-h-screen p-4 relative z-10">
        <div className="bg-gray-900/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 max-w-6xl w-full border border-purple-900/50 relative overflow-hidden">
          {/* Gradient accent */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>

          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 text-center mb-8 drop-shadow-lg">
            {eventData.name} Registration
          </h1>

          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="w-full lg:flex-1 relative group">
              <div className="relative w-full h-96 lg:h-[500px] rounded-3xl overflow-hidden border-2 border-purple-900/50 hover:border-purple-400/30 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 animate-pulse"></div>
                <Image
                  src={eventData.logo}
                  alt={eventData.name}
                  fill
                  className="object-cover object-center transform group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
              </div>
            </div>

            <div className="w-full lg:flex-1 space-y-8">
              <p className="text-xl text-gray-300 leading-relaxed">
                {eventData.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-300">
                <div className="flex items-center gap-2 bg-gray-800/50 p-3 rounded-xl">
                  <svg
                    className="w-6 h-6 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                    />
                  </svg>
                  <span>
                    <strong className="text-purple-300">Prize Pool:</strong> ₹
                    {eventData.prizepool}
                  </span>
                </div>

                <div className="flex items-center gap-2 bg-gray-800/50 p-3 rounded-xl">
                  <svg
                    className="w-6 h-6 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span>
                    <strong className="text-blue-300">Participants:</strong>{" "}
                    {eventData.minPart}-{eventData.maxPart}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-gray-800/50 p-3 rounded-xl">
                  <svg
                    className="w-6 h-6 text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span>
                    <strong className="text-green-300">
                      All members must be prime
                    </strong>{" "}
                    {/* ₹{eventData.regFees} */}
                    <span className="text-sm text-gray-400 block">
                      (Go to dashboard and get your prime)
                    </span>
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-800/50 p-4 rounded-xl">
                  <h3 className="text-purple-400 font-semibold mb-2 flex items-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Event Rules
                  </h3>

                  <p className="text-gray-300">{eventData.rules}</p>
                </div>

                <div className="bg-gray-800/50 p-4 rounded-xl">
                  <h3 className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Important Details
                  </h3>
                  <p className="text-gray-100">
                    This single event is open exclusively to{" "}
                    <span className="text-red-500">non-CSE</span> +{" "}
                    <span className="text-green-500">NITian</span> students at a
                    team registration fee of{" "}
                    <span className="text-green-500">₹{eventData.regFees}</span>
                    . If you meet the eligibility criteria, you’ll automatically
                    receive a QR code upon registration.
                  </p>

                  <h3 className="text-blue-400 mt-3 font-semibold mb-2 flex items-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Additional details
                  </h3>
                  <p className="text-gray-300">{eventData.more}</p>
                </div>
              </div>

              <RegisterForEvent
                eventName={eventData.name}
                maxPart={eventData.maxPart}
                minPart={eventData.minPart}
                regFees={eventData.regFees}
              />
            </div>
          </div>
        </div>
      </main>

      <style jsx global>{`
        @keyframes animatedBackground {
          from {
            background-position: 0 0;
          }
          to {
            background-position: 1000px 0;
          }
        }
      `}</style>
    </div>
  );
}
