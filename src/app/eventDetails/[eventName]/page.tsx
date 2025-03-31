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
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20 animate-gradient-flow"></div>

      <main className="flex items-center justify-center min-h-screen p-4 relative z-10">
        <div className="bg-gray-900/80 backdrop-blur-lg rounded-2xl lg:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 max-w-6xl w-full border border-purple-900/50 relative overflow-hidden">
          {/* Gradient effects */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>

          {/* Header Section */}
          <header className="text-center mb-6 md:mb-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2 md:mb-4">
              {eventData.name} Registration
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl mx-auto">
              {eventData.description}
            </p>
          </header>

          <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-12 items-start">
            {/* Event Image Section */}
            <div className="w-full lg:flex-1 relative group">
              <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-xl lg:rounded-3xl overflow-hidden border-2 border-purple-900/50 transform transition-all duration-300 hover:border-purple-400/30 hover:scale-[99%]">
                <Image
                  src={eventData.logo}
                  alt={eventData.name}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
              </div>
            </div>

            {/* Details Section */}
            <div className="w-full lg:flex-1 space-y-6 md:space-y-8">
              {/* Quick Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {[
                  {
                    bg: "purple",
                    icon: (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    ),
                    title: "Prize Pool",
                    value: `₹${eventData.prizepool}`,
                  },
                  {
                    bg: "blue",
                    icon: (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    ),
                    title: "Team Size",
                    value: `${eventData.minPart}-${eventData.maxPart}`,
                  },
                  {
                    bg: "green",
                    icon: (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    ),
                    title: "Team Reg. Fee",
                    value: `₹${eventData.regFees}`,
                  },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className={`bg-gray-800/50 p-3 sm:p-4 rounded-xl border border-${stat.bg}-500/20`}
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div
                        className={`p-1.5 sm:p-2 bg-${stat.bg}-500/20 rounded-lg`}
                      >
                        <svg
                          className="w-5 h-5 sm:w-6 sm:h-6"
                          fill="none"
                          stroke={`currentColor`}
                        >
                          {stat.icon}
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-gray-400">
                          {stat.title}
                        </p>
                        <p
                          className={`text-base sm:text-xl font-semibold text-${stat.bg}-300`}
                        >
                          {stat.value}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Eligibility Section */}
              <div className="space-y-4 md:space-y-6">
                <div className="bg-gray-800/50 p-4 md:p-6 rounded-xl border border-purple-500/30">
                  <h2 className="text-xl md:text-2xl font-semibold text-purple-400 mb-4 md:mb-6 flex items-center gap-2">
                    <svg
                      className="w-6 h-6 md:w-8 md:h-8"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    Participation Requirements
                  </h2>

                  <div className="space-y-4 md:space-y-6">
                    {/* Prime Membership Block */}
                    <div className="bg-red-900/20 p-4 md:p-5 rounded-xl border border-red-500/30">
                      <div className="flex gap-3 md:gap-4 items-start">
                        <div className="flex-shrink-0 mt-0.5 text-red-400">
                          <svg
                            className="w-5 h-5 md:w-6 md:h-6"
                            fill="none"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-base md:text-lg font-semibold text-red-300 mb-2">
                            Prime Membership Required
                          </h3>
                          <ul className="list-disc pl-4 space-y-1 text-xs md:text-sm text-red-100">
                            <li>All Computer Science students</li>
                            <li>Participants from non-NIT institutes</li>
                            <li>Mixed NIT/non-NIT teams</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Direct Registration Block */}
                    <div className="bg-green-900/20 p-4 md:p-5 rounded-xl border border-green-500/30">
                      <div className="flex gap-3 md:gap-4 items-start">
                        <div className="flex-shrink-0 mt-0.5 text-green-400">
                          <svg
                            className="w-5 h-5 md:w-6 md:h-6"
                            fill="none"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-base md:text-lg font-semibold text-green-300 mb-2">
                            Direct Registration
                          </h3>
                          <div className="space-y-2 text-xs md:text-sm text-green-100">
                            <p>
                              For{" "}
                              <span className="font-medium">
                                non-CSE NIT students
                              </span>
                              : Team fee{" "}
                              <span className="font-semibold text-green-300">
                                ₹{eventData.regFees}
                              </span>
                            </p>
                            <div className="bg-black/20 p-3 rounded-lg">
                              <div className="flex items-center gap-2">
                                <svg
                                  className="w-4 h-4 text-green-400"
                                  fill="none"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                                <span>Single team payment</span>
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <svg
                                  className="w-4 h-4 text-green-400"
                                  fill="none"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                                <span>Get QR after filling team details</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rules Section */}
                <div className="bg-gray-800/50 p-4 md:p-6 rounded-xl border border-blue-500/30">
                  <h2 className="text-xl md:text-2xl font-semibold text-blue-400 mb-3 md:mb-4 flex items-center gap-2">
                    <svg
                      className="w-6 h-6 md:w-8 md:h-8"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Competition Rules
                  </h2>
                  <div className="prose prose-invert max-w-none text-sm md:text-base">
                    <p className="whitespace-pre-wrap leading-relaxed">
                      {eventData.rules}
                    </p>
                  </div>
                </div>

                {/* Additional Info */}
                {eventData.more && (
                  <div className="bg-gray-800/50 p-4 md:p-6 rounded-xl border border-purple-500/30">
                    <h3 className="text-lg md:text-xl font-semibold text-purple-400 mb-2">
                      📌 Additional Information
                    </h3>
                    <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                      {eventData.more}
                    </p>
                  </div>
                )}
              </div>

              {/* Registration Component */}
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
        @keyframes gradient-flow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-gradient-flow {
          background-size: 200% 200%;
          background-image: linear-gradient(
            45deg,
            rgba(99, 102, 241, 0.1) 0%,
            rgba(59, 130, 246, 0.1) 50%,
            rgba(168, 85, 247, 0.1) 100%
          );
          animation: gradient-flow 15s ease infinite;
        }
      `}</style>
    </div>
  );
}
