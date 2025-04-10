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
  category: string; // Added category field
  date: string; // Added date field
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

// Category Button Component
interface CategoryButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
}
const CategoryButton = ({ label, active, onClick }: CategoryButtonProps) => {
  return (
    <motion.button
      className={`px-4 py-2 rounded-lg font-medium transition-all ${
        active 
          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-700/30" 
          : "bg-gray-800 text-gray-300 hover:bg-gray-700"
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      {label}
    </motion.button>
  );
};

// Section Header Component
interface SectionHeaderProps {
  title: string;
}
const SectionHeader = ({ title }: SectionHeaderProps) => {
  return (
    <motion.div
      className="w-full relative my-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent my-6"></div>
      <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
        {title}
      </h2>
      <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-purple-500 to-transparent my-6"></div>
    </motion.div>
  );
};

// Event Card Component
interface EventCardProps {
  event: Event;
  index: number;
}
const EventCard = ({ event, index }: EventCardProps) => {  return (
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

            {/* Event Date Badge */}
            <motion.div
              className="absolute top-2 right-2 px-3 py-1 rounded-full bg-blue-600 bg-opacity-80 z-30 text-sm font-medium text-white"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              {event.date}
            </motion.div>

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
  );
};

export default function Page() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

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
        _id: "67e1b57bb1e72e5f2f25d73e",
        name: "Hackathon",
        description:
          "A 24-hour coding competition to develop innovative solutions.",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIlIZoEWNthTx79YoPWp0U97tRhgeYbnf9TA&s",
        prizepool: 15000,
        regFees: 298,
        more: "Build a project based on the given theme in 24 hours.",
        rules: "Teams of 2-4. No plagiarism allowed.",
        minPart: 2,
        maxPart: 4,
        category: "Xavenir",
        date: "April 26"
      },
      {
        _id: "67e1b4e6b1e72e5f2f25d738",
        name: "AI-ML Challenge",
        description: "Build an AI/ML model for a given problem statement.",
        logo: "https://www.simplilearn.com/ice9/free_resources_article_thumb/Artificial-Intelligence-and-Machine-Learning-Technologies.jpg",
        prizepool: 8000,
        regFees: 248,
        more: "Use ML algorithms to analyze datasets and solve problems.",
        rules: "Teams of up to 3. No pre-trained models allowed.",
        minPart: 1,
        maxPart: 3,
        category: "Pre-Xavenir",
        date: "April 19"
      },
      {
        _id: "67e1b564b1e72e5f2f25d73d",
        name: "Competitive Programming",
        description:
          "A programming event where you can show you problem solving skill",
        logo: "https://images.unsplash.com/photo-1534665482403-a909d0d97c67?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        prizepool: 8000,
        regFees: 238,
        more: "Bring your own laptops",
        rules: "Team participation event testing coding skills under pressure and time.",
        minPart: 1,
        maxPart: 3,
        category: "Xavenir",
        date: "April 27"
      },
      {
        _id: "67e1b591b1e72e5f2f25d73f",
        name: "Computer Fundamentals Quiz",
        description: "A quiz focusing on core computer science concepts.",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYOmITwKkKkm7GroTSG_wxENKC1CU5ytRIhA&s",
        prizepool: 8000,
        regFees: 228,
        more: "Multiple-choice questions covering OS, DBMS, and networks.",
        rules: "Team event. No external help allowed.",
        minPart: 1,
        maxPart: 2,
        category: "Pre-Xavenir",
        date: "April 20"
      },
      {
        _id: "67e1b384b1e72e5f2f25d736",
        name: "Scavenger Hunt",
        description: "SSteal, snatch, or borrow—anything goes in the scavenger hunt!",
        logo: "/events/scav.jpg",
        prizepool: 5000,
        regFees: 89,
        more: "Follow the clues to find the goods.",
        rules: "Teams of 2-5. No external help allowed.",
        minPart: 2,
        maxPart: 5,
        category: "Pre-Xavenir",
        date: "April 20"
      },
      {
        _id: "67e1b5f7b1e72e5f2f25d744",
        name: "Ethical Hacking Challenge",
        description: "Test your penetration testing and cybersecurity skills.",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxCdIXboPP9PwZZRas1ZU-vdElUbfhCp7Zkw&s",
        prizepool: 5000,
        regFees: 98,
        more: "Capture the flag (CTF)-style hacking competition.",
        rules: "No illegal activities. Only provided targets allowed.",
        minPart: 1,
        maxPart: 3,
        category: "Xavenir",
        date: "April 27"
      },
      {
        _id: "67e1b5e2b1e72e5f2f25d743",
        name: "Pixel-Sync [Frontend]",
        description: "Design and build a stunning, sleek, user-friendly frontend UI.",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLT-uhLzmr9KkcyRgb1qTIBBXO7OZlzliPQA&s",
        prizepool: 4000,
        regFees: 109,
        more: "Create a responsive web design within the given time.",
        rules: "No templates allowed. Must be coded from scratch.",
        minPart: 1,
        maxPart: 2,
        category: "Pre-Xavenir",
        date: "April 19"
      },
      {
        _id: "67e1b4cbb1e72e5f2f25d737",
        name: "Paper Dance",
        description: "Dance close with your favorite person, paper beneath feet.",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlAgwx7BjKanmlU8qPhhSr0u74QPrH37Jowg&s",
        prizepool: 3000,
        regFees: 49,
        more: "Something interesting.",
        rules: "Teams of 2. Come and enjoy.",
        minPart: 2,
        maxPart: 2,
        category: "Xavenir",
        date: "April 26"
      },
      {
        _id: "67e1b500b1e72e5f2f25d739",
        name: "Robotics Competition",
        description: "Compete in a robotics showdown.",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj132lhN800TiyzPd_AwQ8Vmb11JIuQuCfvg&s",
        prizepool: 3000,
        regFees: 88,
        more: "Design, build, and program robots to complete challenges.",
        rules: "Teams of 3-5. Only self-built robots allowed.",
        minPart: 3,
        maxPart: 5,
        category: "Pre-Xavenir",
        date: "April 20"
      },
      {
        _id: "67e1b519b1e72e5f2f25d73a",
        name: "Blind Coding",
        description: "Code like your screen’s off—every line crafted with sharp precision.",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTynzRGBtbCw17MhAj9d0IZ-5MS8yynyFqLoQ&s",
        prizepool: 3000,
        regFees: 48,
        more: "Write a functional program without seeing the screen.",
        rules: "Solo event. No debugging after submission.",
        minPart: 1,
        maxPart: 1,
        category: "Xavenir",
        date: "April 27"
      },
      {
        _id: "67e1b533b1e72e5f2f25d73b",
        name: "Ideathon",
        description: "Pitch bold, innovative tech ideas that inspire real change.",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUyNEtIubKGa8qkW3deNol91O2jvvzBpOzKQ&s",
        prizepool: 3000,
        regFees: 45,
        more: "Present a startup or tech solution to judges.",
        rules: "Teams of 1-4 can join; originality required, no plagiarism allowed.",
        minPart: 1,
        maxPart: 4,
        category: "Pre-Xavenir",
        date: "April 19"
      },
      {
        _id: "67e1b5a5b1e72e5f2f25d740",
        name: "Typing Speed Challenge",
        description: "A test of speed and accuracy in typing.",
        logo: "https://cdn.mos.cms.futurecdn.net/ZM8wEPqCYPnkzpWCWotBrj-970-80.jpg.webp",
        prizepool: 3000,
        regFees: 41,
        more: "Type a given paragraph as fast as possible with minimal errors.",
        rules: "Solo event. No autocorrect or external tools allowed.",
        minPart: 1,
        maxPart: 1,
        category: "Xavenir",
        date: "April 26"
      },
      {
        _id: "67e1b5d0b1e72e5f2f25d742",
        name: "PUBG or Valorant Tournament",
        description: "Competitive gaming showdown in PUBG and Valorant.",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXBQ6-BnZyw5n-7p4V6bKjaLGi-5gM67FIvw&s",
        prizepool: 3000,
        regFees: 61,
        more: "Knockout-style tournament with cash prizes for winners.",
        rules: "Follow standard game rules. No cheating allowed.",
        minPart: 4,
        maxPart: 5,
        category: "Xavenir",
        date: "April 26"
      },
      {
        _id: "67e1b549b1e72e5f2f25d73c",
        name: "Movie Mania",
        description: "A tech-themed movie screening and trivia night.",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfnEAjBotZplSut5W35hhRlk2QHf_kzNHeBQ&s",
        prizepool: 2000,
        regFees: 31,
        more: "Watch and answer questions about tech-related movies.",
        rules: "Solo or team event. No internet use allowed.",
        minPart: 1,
        maxPart: 2,
        category: "Xavenir",
        date: "April 27"
      },
      {
        _id: "67e1b5bbb1e72e5f2f25d741",
        name: "Tech Reel",
        description: "Create a short tech-related video reel.",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShDVDQCY7bO02ukxKtB8PO7lTyJKj03JDHZQ&s",
        prizepool: 2000,
        regFees: 19,
        more: "Make a 60-second reel on any tech topic.",
        rules: "Solo or team event. Must be original content.",
        minPart: 1,
        maxPart: 2,
        category: "Pre-Xavenir",
        date: "April 19"
      },
    ];
    setEvents(a);
  };

  // Filter events based on selected category
  const filteredEvents = selectedCategory === "all" 
    ? events 
    : events.filter(event => {
        if (selectedCategory === "Pre-Xavenir") {
          return event.category === "Pre-Xavenir";
        } else if (selectedCategory === "Xavenir") {
          return event.category === "Xavenir";
        } else if (selectedCategory === "19April") {
          return event.category === "Pre-Xavenir" && event.date === "April 19";
        } else if (selectedCategory === "20April") {
          return event.category === "Pre-Xavenir" && event.date === "April 20";
        } else if (selectedCategory === "26April") {
          return event.category === "Xavenir" && event.date === "April 26";
        } else if (selectedCategory === "27April") {
          return event.category === "Xavenir" && event.date === "April 27";
        }
        return true;
      });

  // Group events by category and date for section headers
  const preXavenirEvents18 = events.filter(e => e.category === "Pre-Xavenir" && e.date === "April 19");
  const preXavenirEvents19 = events.filter(e => e.category === "Pre-Xavenir" && e.date === "April 20");
  const xavenirEvents26 = events.filter(e => e.category === "Xavenir" && e.date === "April 26");
  const xavenirEvents27 = events.filter(e => e.category === "Xavenir" && e.date === "April 27");

  return (
    <div
      className={`${poppins.className} relative min-h-screen text-center py-10 px-6 flex flex-col items-center overflow-hidden bg-gradient-to-b from-black to-gray-900`}
    >
      {/* Floating Particles Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                background: i % 2 === 0 ? "#3B82F6" : "#8B5CF6",
                opacity: Math.random() * 0.5 + 0.2,
              }}
              animate={{
                y: [0, Math.random() * 100 - 50],
                opacity: [Math.random() * 0.5 + 0.2, 0],
              }}
              transition={{
                duration: Math.random() * 20 + 10,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
  
        {/* Page Header */}
        <motion.div
          className="relative z-10 flex flex-col items-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 mb-4">
            Events
          </h1>
          <motion.p
            className="text-xl text-gray-300 max-w-2xl text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
           
          </motion.p>
        </motion.div>
  
        {/* Category Filter Buttons */}
        <motion.div
          className="relative z-10 w-full max-w-4xl mb-8 flex justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <CategoryButton
            label="All Events"
            active={selectedCategory === "all"}
            onClick={() => setSelectedCategory("all")}
          />
          <CategoryButton
            label="Pre-Xavenir"
            active={selectedCategory === "Pre-Xavenir"}
            onClick={() => setSelectedCategory("Pre-Xavenir")}
          />
          <CategoryButton
            label="Xavenir"
            active={selectedCategory === "Xavenir"}
            onClick={() => setSelectedCategory("Xavenir")}
          />
          
        </motion.div>
  
        {/* Events Grid with Conditional Section Headers */}
        <div className="relative z-10 w-full max-w-7xl">
          {/* Render by sections when "all" filter is active */}
          {selectedCategory === "all" && (
            <>
              {/* Pre-Xavenir April 19 Section */}
              {preXavenirEvents18.length > 0 && (
                <>
                  <SectionHeader title="Pre-Xavenir Events (April 19)" />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {preXavenirEvents18.map((event, index) => (
                      <EventCard key={event._id} event={event} index={index} />
                    ))}
                  </div>
                </>
              )}
  
              {/* Pre-Xavenir April 20 Section */}
              {preXavenirEvents19.length > 0 && (
                <>
                  <SectionHeader title="Pre-Xavenir Events (April 20)" />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {preXavenirEvents19.map((event, index) => (
                      <EventCard key={event._id} event={event} index={index} />
                    ))}
                  </div>
                </>
              )}
  
              {/* Xavenir April 26 Section */}
              {xavenirEvents26.length > 0 && (
                <>
                  <SectionHeader title="Xavenir Main Events (April 26)" />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {xavenirEvents26.map((event, index) => (
                      <EventCard key={event._id} event={event} index={index} />
                    ))}
                  </div>
                </>
              )}
  
              {/* Xavenir April 27 Section */}
              {xavenirEvents27.length > 0 && (
                <>
                  <SectionHeader title="Xavenir Main Events (April 27)" />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {xavenirEvents27.map((event, index) => (
                      <EventCard key={event._id} event={event} index={index} />
                    ))}
                  </div>
                </>
              )}
            </>
          )}
  
          {/* Display filtered events when a specific filter is active */}
          {selectedCategory !== "all" && (
            <>
              <SectionHeader 
                title={
                  selectedCategory === "Pre-Xavenir" 
                    ? "Pre-Xavenir Events" 
                    : selectedCategory === "Xavenir" 
                      ? "Xavenir Main Events" 
                      : selectedCategory === "18April" 
                        ? "Pre-Xavenir Events (April 18)" 
                        : selectedCategory === "19April" 
                          ? "Pre-Xavenir Events (April 19)" 
                          : selectedCategory === "26April" 
                            ? "Xavenir Main Events (April 26)" 
                            : "Xavenir Main Events (April 27)"
                } 
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents.map((event, index) => (
                  <EventCard key={event._id} event={event} index={index} />
                ))}
              </div>
            </>
          )}
  
          {/* No Events Message */}
          {filteredEvents.length === 0 && (
            <motion.div
              className="w-full py-12 flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <svg
                className="w-24 h-24 text-gray-500 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-2xl font-bold text-gray-300 mb-2">No events found</h3>
              <p className="text-gray-400">
                There are no events matching your selected filter.
              </p>
            </motion.div>
          )}
        </div>
  
        {/* Footer */}
        <motion.footer
          className="relative z-10 w-full max-w-7xl mt-16 pb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent my-8"></div>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Xavenir 2025
              </h3>
              <p className="text-gray-400 text-sm">
                SCSE | NIT Jamshedpur
              </p>
            </div>
            <div className="flex space-x-4">
              <motion.a
                href="https://www.instagram.com/scse.nitjsr/"
                className="text-gray-400 hover:text-purple-400"
                whileHover={{ scale: 1.2 }}
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/company/scse-nitjsr/?originalSubdomain=in"
                className="text-gray-400 hover:text-blue-500"
                whileHover={{ scale: 1.2 }}
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
<path d="M4.98 3.5C4.98 5 3.89 6 2.45 6 1.02 6 0 5 0 3.5 0 2 1.02 1 2.45 1 3.89 1 4.98 2 4.98 3.5zM0 8h4.9v16H0V8zm7.42 0h4.7v2.2h.07c.65-1.2 2.25-2.5 4.63-2.5 4.95 0 5.86 3.3 5.86 7.6V24H17.7v-7.8c0-1.9-.03-4.4-2.7-4.4-2.7 0-3.12 2.1-3.12 4.3V24H7.42V8z" />
</svg>
              </motion.a>
              <motion.a
                href="#twitter"
                className="text-gray-400 hover:text-white-400"
                whileHover={{ scale: 1.2 }}
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
<path d="M16.671 0H20.5L13.23 9.186L21.832 22H15.187L10.095 14.716L4.26 22H0.429L8.164 12.154L0 0H6.828L11.42 6.629L16.671 0Z" />
</svg>
              </motion.a>
            </div>
          </div>
        </motion.footer>
      </div>
    );
  }