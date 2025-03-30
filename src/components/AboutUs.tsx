"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Dancing_Script } from "next/font/google";

const dancingScript = Dancing_Script({
  weight: ["400", "700"],
  subsets: ["latin"],
});

function AboutUs() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -200 }} // Start fully off-screen (left)
      whileInView={{ opacity: 1, x: 0 }} // Move smoothly to the right
      transition={{ duration: 0.5 }}
      viewport={{ once: false, amount: 0.2 }} // Triggers when 20% visible
    >
      <div className="relative min-h-screen z-10 mt-20 h-full px-2 text-white md:ml-12 flex flex-col items-center md:mt-5">
        {/* Stylish Header */}
        <h2
          className={`text-center mx-2 text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-16 md:mb-26 flex flex-wrap items-center justify-center ${dancingScript.className}`}
        >
          About Us
        </h2>
        {/* Embedded YouTube Video & Content */}
        <div className="flex flex-col md:flex-row items-center justify-center md:space-x-10 w-full">
    {/* Video Section (Left) */}
    <div className="w-full md:w-1/3 flex justify-center items-center">
        <div className="w-full max-w-sm sm:max-w-md md:max-w-xl lg:max-w-2xl h-[250px] sm:h-[300px] md:h-[315px] overflow-hidden rounded-xl shadow-lg">
            <iframe
                src="https://www.youtube.com/embed/rQUT7i4xXXY?si=4YchahRYMsm-f80R"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full h-full border-none"
            ></iframe>
        </div>
    </div>

          {/* Text Content (Right) */}
          <div className="w-full md:w-1/2 text-center md:text-left flex flex-col items-center justify-center md:items-start">
            <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
              Who Are We?
            </h2>
            <div className="80% flex flex-col justify-between items-center md:items-baseline">
              <p className="text-lg text-gray-300 max-w-xl px-4 md:px-0 leading-relaxed">
                The Society of Computer Science and Engineering (SCSE) is a
                dynamic community of tech enthusiasts, innovators, and learners.
                We foster a culture of knowledge-sharing, problem-solving, and
                creativity to shape the future of technology together.
              </p>
              <Link href={"/about"}>
                <button className="bg-gradient-to-r from-blue-400 to-purple-500 w-40 h-10 rounded-2xl mt-5 cursor-pointer">
                  Know more
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default AboutUs;
