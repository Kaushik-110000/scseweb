"use client";
import React from "react";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { Dancing_Script } from "next/font/google";
import Link from "next/link";
const dancingScript = Dancing_Script({
  weight: ["400", "700"],
  subsets: ["latin"],
});
export default function Events() {
  const events = [
    {
      quote:
        "Xavenir is the premier tech fest of the CSE Department at NIT Jamshedpur. It unites the brightest tech minds for innovation and competition.",
      name: "Xavenir",
      designation: "18 - 20 April 2025",
      src: "/xav.gif",
    },
    {
      quote:
        "Code your way to innovation. Tackle challenges and hackathons to showcase your skills.",
      name: "Code",
      designation: "Theme",
      src: "/coder.jpg",
    },
    {
      quote:
        "Create groundbreaking designs and projects. Let your ideas shape future technology.",
      name: "Create",
      designation: "Theme",
      src: "/create.jpg",
    },
    {
      quote:
        "Conquer tech challenges with determination. Push boundaries and master new skills.",
      name: "Conquer",
      designation: "Theme",
      src: "/conquer.jpg",
    },
    {
      quote:
        "Enjoy the vibrant tech culture. Network, learn, and celebrate creative innovation.",
      name: "Enjoy",
      designation: "Theme",
      src: "https://plus.unsplash.com/premium_photo-1664298863627-cb6771bbbf21?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHV6emxlc3xlbnwwfHwwfHx8MA%3D%3D",
    },
  ];

  return (
    <>
      <div className="relative min-h-screen mb-15 flex flex-col items-center px-6  text-white">
        <h2
          className={`text-center text-5xl md:text-6xl font-bold mb-20 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 ${dancingScript.className} mt-20 md:mt-0`}
        >
          Xavenir
        </h2>
        <h3 className="inline-block text-xl md:text-2xl font-bold italic mb-10 text-white px-6 py-3 rounded-full bg-gradient-to-r from-purple-400 via-blue-500 to-blue-800 shadow-xl transform transition duration-300 hover:scale-105">
          <span style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}>
            ✨
          </span>{" "}
          18-20 April{" "}
          <span style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}>
            ✨
          </span>
        </h3>
        <AnimatedTestimonials testimonials={events} />
        <Link href={"/about"}>
          <button className=" bg-gradient-to-r from-blue-400 to-purple-500 w-40 h-10 rounded-2xl mt-5 cursor-pointer">
            Show more
          </button>
        </Link>
      </div>
    </>
  );
}
