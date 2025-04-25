"use client";

import React, {
  useEffect,
  useState,
  useMemo,
  useRef,
  useCallback,
} from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Dancing_Script } from "next/font/google";
import Link from "next/link";
const dancingScript = Dancing_Script({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const comps = [
  {
    title: "Scavenger Hunt",
    description:
      "A fast-paced hunt where participants decode clues to uncover hidden tech treasures.\nUnleash your inner detective!",
    prize: "₹5000"
  },
  {
    title: "Paper Dance",
    description:
      "Show off your moves in a fun contest with your chosen partner on the dance floor.\nDance like there's no tomorrow!",
    prize: "₹3000"
  },
  {
    title: "AI-ML Challenge",
    description:
      "Develop an innovative AI or ML solution to tackle a challenging problem.\nInnovate for a smarter tomorrow!",
    prize: "₹8000"
  },
  {
    title: "Robotics Competition",
    description:
      "Participate in a robotics duel by designing and programming your own bot.\nBuild the future, one robot at a time!",
    prize: "₹3000"
  },
  {
    title: "Blind Coding",
    description:
      "Demonstrate your coding prowess by writing functional code without visual aid.\nCode in the dark, shine in the light!",
    prize: "₹3000"
  },
  {
    title: "Ideathon",
    description:
      "Present your creative tech concept in a dynamic idea pitching event.\nYour idea, your revolution!",
    prize: "₹3000"
  },
  {
    title: "Movie Mania",
    description:
      "Enjoy a tech-centric film screening paired with an engaging trivia contest.\nLights, camera, tech action!",
    prize: "₹2000"
  },
  {
    title: "Competitive Programming",
    description:
      "Showcase your coding skills in a contest focused on solving challenging problems.\nCrack the code to victory!",
    prize: "₹8000"
  },
  {
    title: "Hackathon",
    description:
      "Engage in an intense 24-hour coding sprint to build creative tech solutions.\nCode, create, conquer!",
    prize: "₹15000"
  },
  {
    title: "Computer Fundamentals Quiz",
    description:
      "Test your grasp on computer science basics in a challenging quiz event.\nThink fast, answer faster!",
    prize: "₹8000"
  },
  {
    title: "Typing Speed Challenge",
    description:
      "Compete to type swiftly and accurately in this fast-paced challenge.\nType like the wind!",
    prize: "₹3000"
  },
  {
    title: "Tech Reel",
    description:
      "Craft a brief and captivating video reel centered on technology trends.\nCapture the tech vibe!",
    prize: "₹2000"
  },
  {
    title: "PUBG, Valorant and FreeFire",
    description:
      "Battle it out in a competitive gaming tournament featuring PUBG, Valorant and FreeFire.\nGame on and dominate the field!",
    prize: "₹3000"
  },
  {
    title: "Frontend Design Contest",
    description:
      "Showcase your design skills by crafting an impressive frontend interface.\nDesign, create, inspire!",
    prize: "₹4000"
  },
  {
    title: "Ethical Hacking Challenge",
    description:
      "Demonstrate your cybersecurity acumen in an ethical hacking competition.\nHack for good, secure the future!",
    prize: "₹5000"
  }
];


export default function Competitions() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(300);
  const [gap, setGap] = useState(16);
  const [isDragging, setIsDragging] = useState(false);

  const duplicatedcomps = useMemo(() => [...comps, ...comps], []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev >= duplicatedcomps.length - 3) return 0;
      return prev + 1;
    });
  }, [duplicatedcomps]);

  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;
      // Adjust card width based on viewport
      if (containerWidth < 768) {
        // Mobile
        setCardWidth(containerWidth * 0.8);
        setGap(8);
      } else {
        // Desktop
        setCardWidth(400);
        setGap(16);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleNext]);

  const handlePrev = () => {
    setCurrentIndex((prev) => {
      if (prev <= 0) return duplicatedcomps.length - 1;
      return prev - 1;
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 1500);
    return () => clearInterval(interval);
  }, [handleNext]);

  return (
    <div className="relative min-h-screen z-10 mt-20 h-full mx-5 px-2 text-white md:mx-12 flex flex-col items-center md:mt-30">
      <h2
        className={`text-center text-5xl md:text-6xl font-bold mb-15 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 ${dancingScript.className}`}
      >
        <span className="hidden lg:inline">Competitions</span>
        <span className="lg:hidden">Competitions</span>
      </h2>

      <div className="relative w-full overflow-hidden py-8" ref={containerRef}>
        <motion.div
          className="flex cursor-grab"
          animate={{
            x: -currentIndex * (cardWidth + gap),
          }}
          transition={{ type: "tween", duration: 0.5 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={(_, { offset, velocity }) => {
            setIsDragging(false);
            if (Math.abs(velocity.x) > 500) {
              const direction = velocity.x > 0 ? -1 : 1;
              setCurrentIndex((prev) =>
                Math.max(
                  0,
                  Math.min(prev + direction, duplicatedcomps.length - 1)
                )
              );
            } else if (Math.abs(offset.x) > cardWidth / 2) {
              const direction = offset.x > 0 ? -1 : 1;
              setCurrentIndex((prev) =>
                Math.max(
                  0,
                  Math.min(prev + direction, duplicatedcomps.length - 1)
                )
              );
            }
          }}
        >
          {duplicatedcomps.map((event, index) => (
            <div
              key={index}
              className="flex-shrink-0 rounded-xl bg-black/30 p-6 backdrop-blur-sm h-[20rem] flex flex-col items-center justify-between"
              style={{
                width: cardWidth,
                marginRight: index !== duplicatedcomps.length - 1 ? gap : 0,
              }}
            >
              <h3 className="text-xl font-bold text-blue-400">{event.title}</h3>
              <p className="mt-4 text-gray-300 text-lg md:tracking-wider">
                {event.description}
              </p>
              <div className="mt-6 text-lg font-semibold text-purple-500 self-start ml-3">
                Prize: {event.prize}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Navigation buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 hover:bg-black/50 backdrop-blur-sm"
        >
          <ChevronLeft className="text-white h-6 w-6" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 hover:bg-black/50 backdrop-blur-sm"
        >
          <ChevronRight className="text-white h-6 w-6" />
        </button>

        {/* Mobile indicator */}
        <div className="md:hidden flex justify-center gap-2 mt-4">
          {comps.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full ${
                currentIndex % comps.length === index
                  ? "bg-white"
                  : "bg-gray-500"
              }`}
            />
          ))}
        </div>
      </div>
      <Link href={"/events"}>
        <button className=" bg-gradient-to-r from-blue-400 to-purple-500 w-40 h-10 rounded-2xl mt-5 cursor-pointer">
          Know more
        </button>
      </Link>
    </div>
  );
}
