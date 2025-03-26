"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Poppins } from "next/font/google";
import styles from "./events.module.css"; // CSS Module for the SVG pattern background

interface Event {
  _id: string;
  name: string;
  description: string;
  logo: string;
  prizepool: number;
  regFees: number;
  more: string;
  rules: string;
  minPart: number;
  maxPart: number;
}

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

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
          height="30"
          patternUnits="userSpaceOnUse"
        >
          <use
            xlinkHref="#wavePath"
            stroke="#3B82F6"
            strokeWidth="1.5"
            fill="transparent"
          />
        </pattern>
        <pattern
          id="patt2"
          x="30"
          y="15"
          width="60"
          height="30"
          patternUnits="userSpaceOnUse"
        >
          <use
            xlinkHref="#wavePath"
            stroke="#8B5CF6"
            strokeWidth="1.5"
            fill="transparent"
          />
        </pattern>
        <pattern
          id="patt3"
          x="0"
          y="30"
          width="60"
          height="30"
          patternUnits="userSpaceOnUse"
        >
          <use
            xlinkHref="#wavePath"
            stroke="#2563EB"
            strokeWidth="1.5"
            fill="transparent"
          />
        </pattern>
        <pattern
          id="patt4"
          x="30"
          y="45"
          width="60"
          height="30"
          patternUnits="userSpaceOnUse"
        >
          <use
            xlinkHref="#wavePath"
            stroke="#4F46E5"
            strokeWidth="1.5"
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

/**
 * CurvyLines is a new background element that adds additional visual flair.
 */
const CurvyLines = () => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{ position: "absolute", inset: 0, zIndex: 1, opacity: 0.15 }}
    >
      <path
        d="M0,30 Q25,10 50,30 T100,30 M0,50 Q25,30 50,50 T100,50 M0,70 Q25,50 50,70 T100,70"
        stroke="#3B82F6"
        strokeWidth="0.5"
        fill="none"
      />
      <path
        d="M0,20 Q25,40 50,20 T100,20 M0,40 Q25,60 50,40 T100,40 M0,60 Q25,80 50,60 T100,60 M0,80 Q25,100 50,80 T100,80"
        stroke="#8B5CF6"
        strokeWidth="0.5"
        fill="none"
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
    // try {
    //   const res = await axios.get("/api/events");
    //   setEvents(res.data.events || []);
    // } catch (error) {
    //   console.error("Error fetching events:", error);
    // }
    const a = [
      {
        _id: "67e1b384b1e72e5f2f25d736",
        name: "Scavenger Hunt",
        description: "Solve tech puzzles and find hidden clues.",
        logo: "/events/scav.jpg",
        prizepool: 5000,
        regFees: 400,
        more: "Follow the clues to find the hidden tech gadgets.",
        rules: "Teams of 2-5. No external help allowed.",
        minPart: 2,
        maxPart: 5,
      },
      {
        _id: "67e1b4cbb1e72e5f2f25d737",
        name: "Paper Dance",
        description: "Dance with your fav person.",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlAgwx7BjKanmlU8qPhhSr0u74QPrH37Jowg&s",
        prizepool: 3000,
        regFees: 300,
        more: "Something interesting.",
        rules: "Teams of 2. No external help allowed.",
        minPart: 2,
        maxPart: 2,
      },
      {
        _id: "67e1b4e6b1e72e5f2f25d738",
        name: "AI-ML Challenge",
        description: "Build an AI/ML model for a given problem statement.",
        logo: "https://www.simplilearn.com/ice9/free_resources_article_thumb/Artificial-Intelligence-and-Machine-Learning-Technologies.jpg",
        prizepool: 8000,
        regFees: 400,
        more: "Use ML algorithms to analyze datasets and solve problems.",
        rules: "Teams of up to 3. No pre-trained models allowed.",
        minPart: 1,
        maxPart: 3,
      },
      {
        _id: "67e1b500b1e72e5f2f25d739",
        name: "Robotics Competition",
        description: "Compete in a robotics showdown.",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj132lhN800TiyzPd_AwQ8Vmb11JIuQuCfvg&s",
        prizepool: 3000,
        regFees: 400,
        more: "Design, build, and program robots to complete challenges.",
        rules: "Teams of 3-5. Only self-built robots allowed.",
        minPart: 3,
        maxPart: 5,
      },
      {
        _id: "67e1b519b1e72e5f2f25d73a",
        name: "Blind Coding",
        description: "Code with your screen turned off.",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTynzRGBtbCw17MhAj9d0IZ-5MS8yynyFqLoQ&s",
        prizepool: 3000,
        regFees: 300,
        more: "Write a functional program without seeing the screen.",
        rules: "Solo event. No debugging after submission.",
        minPart: 1,
        maxPart: 1,
      },
      {
        _id: "67e1b533b1e72e5f2f25d73b",
        name: "Ideathon",
        description: "Pitch innovative tech ideas.",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUyNEtIubKGa8qkW3deNol91O2jvvzBpOzKQ&s",
        prizepool: 3000,
        regFees: 300,
        more: "Present a startup or tech solution to judges.",
        rules: "Teams of 1-3. No plagiarism allowed.",
        minPart: 1,
        maxPart: 3,
      },
      {
        _id: "67e1b549b1e72e5f2f25d73c",
        name: "Movie Mania",
        description: "A tech-themed movie screening and trivia night.",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfnEAjBotZplSut5W35hhRlk2QHf_kzNHeBQ&s",
        prizepool: 2000,
        regFees: 275,
        more: "Watch and answer questions about tech-related movies.",
        rules: "Solo or team event. No internet use allowed.",
        minPart: 1,
        maxPart: 2,
      },
      {
        _id: "67e1b564b1e72e5f2f25d73d",
        name: "Competitive Programming",
        description:
          "A programming event where you can show you problem solving skill",
        logo: "https://images.unsplash.com/photo-1534665482403-a909d0d97c67?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        prizepool: 8000,
        regFees: 500,
        more: "Bring your own laptops",
        rules: "Solo participation event",
        minPart: 1,
        maxPart: 3,
      },
      {
        _id: "67e1b57bb1e72e5f2f25d73e",
        name: "Hackathon",
        description:
          "A 24-hour coding competition to develop innovative solutions.",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIlIZoEWNthTx79YoPWp0U97tRhgeYbnf9TA&s",
        prizepool: 15000,
        regFees: 600,
        more: "Build a project based on the given theme in 24 hours.",
        rules: "Teams of 2-4. No plagiarism allowed.",
        minPart: 2,
        maxPart: 4,
      },
      {
        _id: "67e1b591b1e72e5f2f25d73f",
        name: "Computer Fundamentals Quiz",
        description: "A quiz focusing on core computer science concepts.",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYOmITwKkKkm7GroTSG_wxENKC1CU5ytRIhA&s",
        prizepool: 8000,
        regFees: 400,
        more: "Multiple-choice questions covering OS, DBMS, and networks.",
        rules: "Solo event. No external help allowed.",
        minPart: 1,
        maxPart: 2,
      },
      {
        _id: "67e1b5a5b1e72e5f2f25d740",
        name: "Typing Speed Challenge",
        description: "A test of speed and accuracy in typing.",
        logo: "https://cdn.mos.cms.futurecdn.net/ZM8wEPqCYPnkzpWCWotBrj-970-80.jpg.webp",
        prizepool: 3000,
        regFees: 300,
        more: "Type a given paragraph as fast as possible with minimal errors.",
        rules: "Solo event. No autocorrect or external tools allowed.",
        minPart: 1,
        maxPart: 1,
      },
      {
        _id:"67e1b5bbb1e72e5f2f25d741",
        name: "Tech Reel",
        description: "Create a short tech-related video reel.",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShDVDQCY7bO02ukxKtB8PO7lTyJKj03JDHZQ&s",
        prizepool: 2000,
        regFees: 275,
        more: "Make a 60-second reel on any tech topic.",
        rules: "Solo or team event. Must be original content.",
        minPart: 1,
        maxPart: 2,
      },
      {
        _id: "67e1b5d0b1e72e5f2f25d742",
        name: "PUBG or Valorant Tournament",
        description: "Competitive gaming showdown in PUBG and Valorant.",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXBQ6-BnZyw5n-7p4V6bKjaLGi-5gM67FIvw&s",
        prizepool: 3000,
        regFees: 300,
        more: "Knockout-style tournament with cash prizes for winners.",
        rules: "Follow standard game rules. No cheating allowed.",
        minPart: 4,
        maxPart: 5,
      },
      {
        _id: "67e1b5e2b1e72e5f2f25d743",
        name: "Frontend Design Contest",
        description: "Design and build a stunning frontend UI.",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLT-uhLzmr9KkcyRgb1qTIBBXO7OZlzliPQA&s",
        prizepool: 4000,
        regFees: 300,
        more: "Create a responsive web design within the given time.",
        rules: "No templates allowed. Must be coded from scratch.",
        minPart: 1,
        maxPart: 2,
      },
      {
        _id: "67e1b5f7b1e72e5f2f25d744",
        name: "Ethical Hacking Challenge",
        description: "Test your penetration testing and cybersecurity skills.",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxCdIXboPP9PwZZRas1ZU-vdElUbfhCp7Zkw&s",
        prizepool: 5000,
        regFees: 400,
        more: "Capture the flag (CTF)-style hacking competition.",
        rules: "No illegal activities. Only provided targets allowed.",
        minPart: 1,
        maxPart: 3,
      },
    ];
    setEvents(a);
  };

  return (
    <div
      className={`${poppins.className} relative min-h-screen text-center py-10 px-6 flex flex-col items-center overflow-hidden bg-gradient-to-b from-black to-gray-900`}
    >
      {/* Floating Particles Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(300)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              background:
                i % 5 === 0
                  ? "#3B82F6"
                  : i % 5 === 1
                  ? "#8B5CF6"
                  : i % 5 === 2
                  ? "#2563EB"
                  : i % 5 === 3
                  ? "#4F46E5"
                  : "#A5B4FC",
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
            }}
            animate={{
              y: [0, Math.random() * -100 - 20, 0],
              x: [0, Math.random() * 40 - 20, 0],
              opacity: [0.3, Math.random() * 0.7 + 0.3, 0.3],
              scale: [1, Math.random() * 1.5 + 0.5, 1],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              delay: i * 0.01,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Page Heading */}
      <motion.h1
        className="relative z-10 text-5xl md:text-6xl font-extrabold mt-10 mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 tracking-wider"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, type: "spring", stiffness: 100 }}
      >
        All Events
      </motion.h1>

      {/* Event Cards */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl mt-4 mb-10">
        {events.map((event, index) => (
          <motion.div
            key={event._id}
            className="relative overflow-hidden rounded-2xl group"
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.7)",
              backdropFilter: "blur(10px)",
              height: "555px",
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.15,
              type: "spring",
              stiffness: 70,
            }}
            whileHover={{
              scale: 1.03,
              transition: { duration: 0.3 },
            }}
          >
            {/* Animated Border Effect */}
            <motion.div
              className="absolute inset-0 z-0 opacity-50"
              style={{
                background: `linear-gradient(90deg, 
                  #3B82F6 0%, 
                  #8B5CF6 25%, 
                  #2563EB 50%, 
                  #4F46E5 75%, 
                  #3B82F6 100%)`,
                backgroundSize: "200% 100%",
              }}
              animate={{
                backgroundPosition: ["0% 0%", "100% 0%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />

            {/* Card Inner Content */}
            <div className="absolute inset-1 bg-gray-900 rounded-xl z-10 flex flex-col h-full">
              {/* Pattern Background Layer */}
              <div className="absolute inset-0 opacity-40 group-hover:opacity-70 transition-opacity duration-500">
                <PatternSquiggle />
                <CurvyLines />
              </div>

              {/* Card Content */}
              <div className="relative z-20 flex flex-col justify-between h-full p-5">
                <div className="flex-1">
                  {/* Logo Container */}
                  <div className="relative w-full h-40 mb-4 overflow-hidden rounded-xl shadow-lg">
                    <motion.div
                      className="absolute inset-0 z-0 opacity-70"
                      style={{
                        background: `linear-gradient(90deg, 
                          #3B82F6 0%, 
                          #8B5CF6 25%, 
                          #2563EB 50%, 
                          #4F46E5 75%, 
                          #3B82F6 100%)`,
                        backgroundSize: "200% 100%",
                      }}
                      animate={{
                        backgroundPosition: ["0% 0%", "100% 0%"],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    />
                    <div className="absolute inset-0.5 overflow-hidden rounded-lg">
                      <Image
                        src={event.logo}
                        alt={event.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                  </div>

                  {/* Event Name */}
                  <motion.div
                    className="mb-3 overflow-hidden rounded-lg"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.25 }}
                  >
                    <motion.div
                      className="py-2 px-3"
                      style={{
                        background: `linear-gradient(90deg, 
                          rgba(59, 130, 246, 0.7) 0%, 
                          rgba(139, 92, 246, 0.7) 100%)`,
                        backgroundSize: "200% 100%",
                      }}
                      animate={{
                        backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <h2 className="text-xl font-bold text-white truncate">
                        {event.name}
                      </h2>
                    </motion.div>
                  </motion.div>

                  {/* Prize Pool */}
                  <motion.div
                    className="inline-block px-3 py-2 mb-3 rounded-full"
                    style={{
                      background: `linear-gradient(90deg, 
                        rgba(59, 130, 246, 0.2) 0%, 
                        rgba(139, 92, 246, 0.2) 100%)`,
                    }}
                    whileHover={{
                      scale: 1.05,
                      background: `linear-gradient(90deg, 
                        rgba(59, 130, 246, 0.4) 0%, 
                        rgba(139, 92, 246, 0.4) 100%)`,
                    }}
                  >
                    <p className="text-white text-base">
                      <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                        Prize Pool:
                      </span>{" "}
                      <span className="font-semibold">
                        ₹{event.prizepool.toLocaleString()}
                      </span>
                    </p>
                  </motion.div>

                  {/* Description (with NO extra background) */}
                  {event.description && (
                    <motion.div
                      className="mb-3" // Removed p-3, bg-gray-800, etc.
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: index * 0.3 }}
                    >
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {event.description}
                      </p>
                    </motion.div>
                  )}

                  {/* Rules */}
                  <motion.div
                    className="mb-3 p-3 rounded-lg bg-gray-800 bg-opacity-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: index * 0.35 }}
                  >
                    <p className="text-gray-400 text-sm">
                      <span className="text-blue-400 font-semibold">
                        Rules:
                      </span>{" "}
                      {event.rules}
                    </p>
                  </motion.div>

                  {/* Team Size */}
                  <motion.div
                    className="p-3 rounded-lg bg-gray-800 bg-opacity-30"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: index * 0.4 }}
                  >
                    <p className="text-gray-400 text-sm">
                      <span className="text-purple-400 font-semibold">
                        Team Size:
                      </span>{" "}
                      {event.minPart} to {event.maxPart} participants
                    </p>
                  </motion.div>
                </div>

                {/* Get Details Button */}
                <div className="mt-5 relative">
                  <Link href={`eventDetails/${event.name}`} className="block">
                    <motion.div
                      className="relative overflow-hidden rounded-lg cursor-pointer group"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      style={{ position: "relative", zIndex: 0 }}
                    >
                      <div
                        className="absolute inset-0 z-0"
                        style={{
                          background:
                            "linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)",
                          opacity: 0.9,
                        }}
                      />
                      <div className="relative z-10 py-3 text-center font-bold text-white text-base">
                        Get Details
                      </div>
                    </motion.div>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
