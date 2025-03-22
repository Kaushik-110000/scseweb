

"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const teamMembers = [
  { name: "Harshit Shrivastav", role: "President", image: "/useravatar.png" },
  { name: "Harish Kumar", role: "Vice President", image: "/useravatar.png" },
  { name: "Murli Dharan", role: "General Secretary", image: "/useravatar.png" },
  { name: "Rishav Kumar", role: "Treasurer", image: "/useravatar.png" },
  { name: "Sunil Kumar Behera", role: "Joint Secretary", image: "/useravatar.png" },
  
];

const previousEvents = [
  {
    title: "Hackathon 2023",
    description: "A 24-hour coding marathon where participants built innovative projects.",
    image: "/contest.webp",
  },
  {
    title: "Kodi Yatva",
    description: "A competitive programming event to test problem-solving skills.",
    image:  "/contest.webp",
  },
  {
    title: "Scavenger Hunt",
    description: "A fun and interactive event combining tech and teamwork.",
    image:  "/contest.webp",
  },
  {
    title: "Hackathons",
    description: "Invited industry experts to share insights on emerging technologies.",
    image:  "/contest.webp",
  },
];

export default function Page() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [eventIndex, setEventIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? teamMembers.length - 1 : prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === teamMembers.length - 1 ? 0 : prev + 1));
  }, []);

  const handleEventPrev = useCallback(() => {
    setEventIndex((prev) => (prev === 0 ? previousEvents.length - 1 : prev - 1));
  }, []);

  const handleEventNext = useCallback(() => {
    setEventIndex((prev) => (prev === previousEvents.length - 1 ? 0 : prev + 1));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 2000);
    return () => clearInterval(interval);
  }, [handleNext]);

  useEffect(() => {
    const eventInterval = setInterval(() => {
      handleEventNext();
    }, 3000);
    return () => clearInterval(eventInterval);
  }, [handleEventNext]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getIndex = (offset: number): number => {
    return (currentIndex + offset + teamMembers.length) % teamMembers.length;
  };

  return (
    <div className="min-h-screen  background-grid2 text-white px-6 py-12">
      {/* Title Section */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl  font-bold text-center mt-10 mb-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400"
      >
        About <span className="text-white">US</span>
      </motion.h1>

      {/* Description Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className=" shadow-md rounded-2xl p-8 flex flex-col md:flex-row items-center  mb-16"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-full md:w-1/3 h-60 mb-6 md:mb-0"
        >
          <Image
            src="/SCSElogo.svg"
            alt="S.C.S.E. Logo"
            fill
            className="object-contain rounded-lg"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-2/3 md:pl-8"
        >
          <p className="text-gray-300 text-lg mb-4">
            The <span className="text-purple-400 font-semibold">Society of Computer Science and Engineering (S.C.S.E.)</span> is a vibrant community dedicated to fostering <strong>innovation</strong>, <strong>technical excellence</strong>, and <strong>collaboration</strong> among students passionate about <strong>coding and technology</strong>.
          </p>
          <p className="text-gray-300 text-lg mb-4">
            We organize <strong>hackathons, coding contests, workshops, and tech talks</strong> to empower students with <strong>cutting-edge skills</strong> and real-world problem-solving experience.
          </p>
          <p className="text-gray-300 text-lg">
            Join us to explore the dynamic world of <strong>technology</strong>, <strong>network with industry experts</strong>, and <strong>unlock new opportunities</strong> in the ever-evolving tech landscape!
          </p>
        </motion.div>
      </motion.div>

      {/* Previous Events Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mt-16"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl  font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400"
        >
          Relive Our Memorable Events
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gray-300 text-lg text-center mb-8"
        >
          From hackathons to fun events, here’s a glimpse of the exciting events we’ve organized to inspire and empower our community.
        </motion.p>

        <div className="relative flex justify-center items-center">
          {/* Left Arrow */}
          <button
            onClick={handleEventPrev}
            className="absolute left-0 md:left-10 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full border border-white/20"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          {/* Event Carousel */}
          <div className="w-96 h-96 flex justify-center items-center overflow-hidden rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={previousEvents[eventIndex].title}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center p-6"
              >
                <div className="relative w-64 h-64  mb-4">
                  <Image
                    src={previousEvents[eventIndex].image}
                    alt={previousEvents[eventIndex].title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-xl font-semibold text-center">
                  {previousEvents[eventIndex].title}
                </h3>
                <p className="text-gray-300 text-center">
                  {previousEvents[eventIndex].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleEventNext}
            className="absolute right-0 md:right-10 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full border border-white/20"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>
      </motion.div>

      {/* Meet Our Team Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mt-16"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400"
        >
          Meet Our Team
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gray-300 text-lg text-center mb-8"
        >
          Introducing the backbone of SCSE - the leaders driving innovation and excellence! From steering creative ideas to managing tech innovations, PR strategies, and corporate outreach, each team plays a vital role in shaping our journey ahead. Together, we aim to inspire, innovate, and elevate!
        </motion.p>

        <div className="relative flex justify-center items-center">
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-0 md:left-10 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full border border-white/20"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          {/* Carousel */}
          <div className="flex gap-6 items-center overflow-hidden">
            <AnimatePresence initial={false}>
              {isMobile ? (
                <motion.div
                  key={teamMembers[currentIndex].name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg flex flex-col items-center border border-white/20 w-72 h-96"
                >
                  <div className="relative w-36 h-36 mb-4">
                    <Image
                      src={teamMembers[currentIndex].image}
                      alt={teamMembers[currentIndex].name}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-center">{teamMembers[currentIndex].name}</h3>
                  <p className="text-purple-400 text-center">{teamMembers[currentIndex].role}</p>
                </motion.div>
              ) : (
                [getIndex(-1), getIndex(0), getIndex(1)].map((indexOffset, idx) => (
                  <motion.div
                    key={teamMembers[indexOffset].name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: idx === 1 ? 1.1 : 0.9 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5 }}
                    className={`bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-md flex flex-col items-center border border-white/20 ${
                      idx === 1 ? "w-72 h-96" : "w-60 h-80"
                    }`}
                  >
                    <div className={`relative ${idx === 1 ? "w-36 h-36" : "w-28 h-28"} mb-4`}>
                      <Image
                        src={teamMembers[indexOffset].image}
                        alt={teamMembers[indexOffset].name}
                        fill
                        className="object-cover rounded-full"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-center">{teamMembers[indexOffset].name}</h3>
                    <p className="text-purple-400 text-center">{teamMembers[indexOffset].role}</p>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-0 md:right-10 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full border border-white/20"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}