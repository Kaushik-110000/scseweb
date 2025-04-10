
"use client";
import React, { useState } from "react";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { Dancing_Script, Montserrat, Playfair_Display } from "next/font/google";
import Link from "next/link";

const dancingScript = Dancing_Script({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const montserrat = Montserrat({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function Events() {
  const [isHovered, setIsHovered] = useState(false);
  
  const events = [
    {
      quote:
        "Pre Xavenir brings exciting workshops, tech talks, and mini-competitions to prepare you for the main event. Join us for this tech warm-up!",
      name: "Pre Xavenir",
      designation: "18 - 19 April 2025",
      src: "/xav.gif",
    },

    {
      quote:
        "Xavenir is the premier tech fest of the CSE Department at NIT Jamshedpur. It unites the brightest tech minds for innovation and competition.",
      name: "Xavenir",
      designation: "26 - 27 April 2025",
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


  const currentDate = new Date();
  const formattedCurrentDate = currentDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });


  return (

<>
<div className={`relative min-h-screen mb-15 flex flex-col items-center px-6 text-white ${montserrat.className}`}>
  
  {/* Horizontal Timeline */}
  <div className="w-full max-w-4xl mt-16 mb-20 relative">
    <h2 className={`text-center text-4xl md:text-5xl font-bold mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 ${playfair.className}`}>
      Event Timeline
    </h2>
    
    <div className="flex flex-col items-center justify-center">
      {/* Timeline cards container */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 w-full">
        
        {/* Today Card */}
        <div className="bg-gradient-to-br from-purple-900/80 to-blue-900/80 backdrop-blur-md p-4 rounded-lg shadow-xl border border-purple-500/30 w-full md:w-1/3 max-w-xs transform transition-all duration-300 hover:scale-105">
          <h3 className="text-center text-sm font-medium text-blue-300 mb-1">Today</h3>
          <p className="text-center font-bold text-white text-lg">{formattedCurrentDate}</p>
        </div>
        
        {/* Pre Xavenir Card */}
        <div className="bg-gradient-to-br from-blue-900/80 to-purple-900/80 backdrop-blur-md p-5 rounded-lg shadow-xl border border-blue-500/30 w-full md:w-1/3 max-w-xs transform transition-all duration-300 hover:scale-105 z-10">
          <h3 className={`text-center text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-400 ${playfair.className}`}>Pre Xavenir</h3>
          <p className="text-center font-bold text-white mt-2">18-19 April 2025</p>
          <p className="text-center text-sm text-blue-200 mt-2">Fun Events & competitions</p>
        </div>
        
        {/* Xavenir Card */}
        <div className="bg-gradient-to-br from-purple-900/80 to-blue-900/80 backdrop-blur-md p-6 rounded-lg shadow-xl border border-purple-500/30 w-full md:w-1/3 max-w-xs transform transition-all duration-300 hover:scale-105">
          <h3 className={`text-center text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-blue-300 ${playfair.className}`}>Xavenir</h3>
          <p className="text-center font-bold text-white mt-2">26-27 April 2025</p>
          <p className="text-center text-sm text-blue-200 mt-2">Premier tech fest of CSE Department</p>
        </div>
      </div>
      
    </div>
  </div>

  <AnimatedTestimonials testimonials={events} />
  <Link href={"/about"}>
    <button className="bg-gradient-to-r from-blue-400 to-purple-500 w-40 h-12 rounded-2xl mt-8 cursor-pointer hover:shadow-lg hover:shadow-purple-300/30 transition-all duration-300 font-medium">
      Show more
    </button>
  </Link>
</div>
</>
);
}

