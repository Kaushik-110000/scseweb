"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./events.module.css"; // CSS Module for the SVG pattern background

interface Event {
  _id: string;
  name: string;
  description: string;
  logo: string;
  prizepool: number;
}

/**
 * PatternSquiggle renders the SVG squiggle background.
 * (This background pattern remains unchanged.)
 */
const PatternSquiggle = () => {
  return (
    <svg
      viewBox="0 0 200 200"
      style={{ position: "absolute", inset: 0, zIndex: 0 }}
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <path
          id="wavePath"
          d="M0,7.5 C12.9,7.5 17.1,22.5 30,22.5 C42.9,22.5 47.1,7.5 60,7.5"
        />
        <pattern
          id="patt1"
          x="0"
          y="0"
          width="60"
          height="60"
          patternUnits="userSpaceOnUse"
        >
          <use
            xlinkHref="#wavePath"
            stroke="#f00"
            strokeWidth="1"
            fill="transparent"
          />
        </pattern>
        <pattern
          id="patt2"
          x="30"
          y="15"
          width="60"
          height="60"
          patternUnits="userSpaceOnUse"
        >
          <use
            xlinkHref="#wavePath"
            stroke="#00f"
            strokeWidth="1"
            fill="transparent"
          />
        </pattern>
        <pattern
          id="patt3"
          x="0"
          y="30"
          width="60"
          height="60"
          patternUnits="userSpaceOnUse"
        >
          <use
            xlinkHref="#wavePath"
            stroke="#0f0"
            strokeWidth="1"
            fill="transparent"
          />
        </pattern>
        <pattern
          id="patt4"
          x="30"
          y="45"
          width="60"
          height="60"
          patternUnits="userSpaceOnUse"
        >
          <use
            xlinkHref="#wavePath"
            stroke="#fc0"
            strokeWidth="1"
            fill="transparent"
          />
        </pattern>
        <linearGradient id="grad1" x1="0" x2="0.15" spreadMethod="repeat">
          <stop offset="0%" stopColor="white" stopOpacity="1.0" />
          <stop offset="75%" stopColor="white" stopOpacity="0.0" />
        </linearGradient>
        <linearGradient id="grad2" x1="0.5" x2="0.65" spreadMethod="repeat">
          <stop offset="0%" stopColor="white" stopOpacity="1.0" />
          <stop offset="75%" stopColor="white" stopOpacity="0.0" />
        </linearGradient>
      </defs>
      <mask id="mask1">
        <rect fill="url(#grad1)" width="400" height="200" />
      </mask>
      <mask id="mask2">
        <rect fill="url(#grad2)" width="400" height="200" />
      </mask>
      <rect
        id="squiggle1"
        mask="url(#mask1)"
        fill="url(#patt1)"
        width="200"
        height="200"
      />
      <rect
        id="squiggle2"
        mask="url(#mask2)"
        fill="url(#patt2)"
        width="200"
        height="200"
      />
      <rect
        id="squiggle3"
        mask="url(#mask1)"
        fill="url(#patt3)"
        width="200"
        height="200"
      />
      <rect
        id="squiggle4"
        mask="url(#mask2)"
        fill="url(#patt4)"
        width="200"
        height="200"
      />
    </svg>
  );
};

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
    <div className="relative min-h-screen text-center py-10 px-6 flex flex-col items-center overflow-hidden bg-black">
      {/* Floating Dots for the page background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(300)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white w-1 h-1 rounded-full opacity-50"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -60, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.05 }}
          />
        ))}
      </div>

      {/* Page Heading */}
      <motion.h1
        className="relative z-10 text-4xl md:text-5xl font-extrabold mt-10 text-gray-200 tracking-wide font-[Poppins]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        All Events
      </motion.h1>

      {/* Event Cards */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl mt-4">
        {events.map((event, index) => (
          <motion.div
            key={event._id}
            className="relative shadow-lg p-6 transition-transform duration-300 hover:scale-105"
            style={{
              border: "4px solid white",
              borderRadius: "1rem",
              overflow: "hidden",
              backgroundColor: "#1a1a1a",
              minHeight: "400px",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {/* Pattern background layer */}
            <PatternSquiggle />
            {/* Card Content */}
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div>
                {/* Logo Container with border */}
                <div className="relative w-full h-32 md:h-40 border border-white border-3 rounded-2xl overflow-hidden mb-4">
                  <Image
                    src={event.logo}
                    alt={event.name}
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Heading pulled below the logo with its own background */}
                <motion.h2
                  className="text-lg md:text-xl font-bold mb-3 text-white font-[Poppins] bg-gray-800 px-2 py-1 rounded"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  {event.name}
                </motion.h2>
                {/* Prize Pool with white text */}
                <p className="text-white mb-3 text-sm md:text-base">
                  <strong>Prize Pool:</strong> {event.prizepool}
                </p>
                {/* Description with larger font size and white color */}
                <p className="text-white text-lg mb-3 overflow-hidden">
                  {event.description}
                </p>
              </div>
              {/* Button container always at the bottom */}
              <div className="mt-4">
                <Link href={`eventDetails/${event.name}`}>
                  <motion.button
                    className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 w-full cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get details
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
