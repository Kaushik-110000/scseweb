"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Footer from "../../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Mail, Phone, Linkedin } from "lucide-react";



const professors = [
  {
    name: "Jitesh Pradhan",
    role: " Prof. In-Charge",
    image: "/images/jiteshSir.png",
  },
  // {
  //   name: "Dinesh Kumar",
  //   role: "Professor",
  //   image: "/images/dineshSir.jpg", 
  // },
  // {
  //   name: "Koushlendra Kumar Singh",
  //   role: "Assistant Professor",
  //   image: "/images/kksir.jpeg", 
  // },
  // {
  //   name: "Dr Chandradshekhar Azad",
  //   role: "Assistant Professor",
  //   image: "/images/chandrashekhar.jpg", 
  // },
  {
    name: " Dr. Danish Ali Khan",
    role: "Head of Department",
    image: "/images/danishalisir.png",
  },
  // {
  //   name: "Dr Dilip Kumar",
  //   role: "Assistant Professor",
  //   image: "/images/dilip.jpg", 
  // },
];








const teamMembers = [
  {
    name: "Harshit Shrivastav",
    role: "President",
    image: "/images/harshit.jpg",
    contact: "+91 89571 44430",
    linkedin: "https://www.linkedin.com/in/harshit-shrivastav-8b513127a",
    email: "harshitshrivastav2609@gmail.com",
  },
  {
    name: "Harish Kumar",
    role: "Vice President",
    image: "/images/harish.jpg",
    contact: "+91 8178800344",
    linkedin: "https://www.linkedin.com/in/harish-kumar-b7b739218/",
    email: "harrythe454@gmail.com ",
  },
  {
    name: "Murli Dharan",
    role: "General Secretary",
    image: "/images/murlidharan.jpg",
    contact: "+91 62016 68754",
    linkedin:
      "https://www.linkedin.com/in/murli-dharan-614b89298?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    email: "murlidharan93103@collegefest.edu",
  },
  {
    name: "Rishav Kumar",
    role: "Treasurer",
    image: "/images/rishavsir2.jpg",
    contact: "+91 7061494994 ",
    linkedin: "https://www.linkedin.com/in/rishav-kumar",
    email: "rishav943132@gmail.com",
  },
  {
    name: "Sunil Kumar Behera",
    role: "Joint Secretary",
    image: "/images/sunilbehra.jpg",
    contact: "+91 7992752573",
    linkedin: "https://www.linkedin.com/in/sunil-kumar07/",
    email: "sunilbehera672@gmail.com",
  },
];






export default function Page() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);


  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? teamMembers.length - 1 : prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === teamMembers.length - 1 ? 0 : prev + 1));
  }, []);



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
    <>
      <div className="min-h-screen  background-grid2 text-white "  >
        <div className="px-6 py-12 ">
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
                The{" "}
                <span className="text-purple-400 font-semibold">
                  Society of Computer Science and Engineering (S.C.S.E.)
                </span>{" "}
                is a vibrant community dedicated to fostering{" "}
                <strong>innovation</strong>, <strong>technical excellence</strong>
                , and <strong>collaboration</strong> among students passionate
                about <strong>coding and technology</strong>.
              </p>
              <p className="text-gray-300 text-lg mb-4">
                We organize{" "}
                <strong>
                  hackathons, coding contests, workshops, and tech talks
                </strong>{" "}
                to empower students with <strong>cutting-edge skills</strong> and
                real-world problem-solving experience.
              </p>
              <p className="text-gray-300 text-lg">
                Join us to explore the dynamic world of{" "}
                <strong>technology</strong>,{" "}
                <strong>network with industry experts</strong>, and{" "}
                <strong>unlock new opportunities</strong> in the ever-evolving
                tech landscape!
              </p>
            </motion.div>
          </motion.div>









          {/* About Xavenir Section */}
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
              className="text-5xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400"
            >
              About Xavenir
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-gray-300 mx-10 text-lg text-center mb-8"
            >
              Xavenir is the premier tech fest of the CSE Department at NIT
              Jamshedpur, designed to bring together the brightest tech minds from
              across the country. It is a fusion of coding, innovation, AI,
              cybersecurity, and gaming. Xavenir is the perfect platform to
              showcase your skills, learn from industry experts, and compete for
              exciting prizes.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-gray-300 text-lg text-center mb-8"
            >
              Whether you are a coder, designer, entrepreneur, or tech geek, this
              fest is for YOU! Connect with like-minded enthusiasts and
              recruiters, and attend workshops and guest talks from top industry
              professionals.
            </motion.p>

            {/* PDF Placeholder */}
            <div className="flex justify-center">

              <a
                href="/SCSE_brochure.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-purple-600 hover:bg-purple-800 text-white font-semibold py-2 px-4 rounded-full transition duration-300 transform hover:scale-105 shadow-md hover:shadow-lg hover:shadow-purple-200"
              >
                View Brochure
              </a>

            </div>
          </motion.div>




          {/* Meet Our Deemed Professors Section */}
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
              className="text-5xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400"
            >
              Meet Our Deemed Professors
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-gray-300 text-lg text-center mb-10"
            >
              Our esteemed professors bring a wealth of knowledge and experience to guide
              and inspire the next generation of tech innovators.
            </motion.p>

            {/* Centered Grid */}
            <div className="flex justify-center items-center">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-6xl ">
                {professors.map((professor, index) => (
                  <motion.div
                    key={professor.name}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg shadow-white/30 flex flex-col items-center border w-72 border-white/20"
                  >
                    <div className="relative w-36 h-36 mb-4">
                      <Image
                        src={professor.image}
                        alt={professor.name}
                        fill
                        className="object-cover rounded-full"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-center">
                      {professor.name}
                    </h3>
                    <p className="text-purple-400 mb-2 text-center">
                      {professor.role}
                    </p>
                  </motion.div>
                ))}
              </div>
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
              className="text-5xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400"
            >
              Meet Our Team
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-gray-300 text-lg mx-10 text-center mb-10"
            >
              Introducing the backbone of SCSE - the leaders driving innovation
              and excellence! From steering creative ideas to managing tech
              innovations, PR strategies, and corporate outreach, each team plays
              a vital role in shaping our journey ahead. Together, we aim to
              inspire, innovate, and elevate!!
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
                      transition={{ duration: 0.3 }}
                      className="bg-white/10 backdrop-blur-md p-2 rounded-xl mb-10 shadow-md shadow-white/30   flex flex-col items-center border border-white/20 w-72    h-96"
                    >
                      <div className="relative w-36 h-36 mb-4">
                        <Image
                          src={teamMembers[currentIndex].image}
                          alt={teamMembers[currentIndex].name}
                          fill
                          className="object-cover rounded-full"
                        />
                      </div>
                      <h3 className="text-xl font-semibold text-center">
                        {teamMembers[currentIndex].name}
                      </h3>
                      <p className="text-purple-400 mb-2 text-center">
                        {teamMembers[currentIndex].role}
                      </p>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-purple-400" />
                        <a
                          href={`tel:${teamMembers[currentIndex].contact.replace(
                            /\s+/g,
                            ""
                          )}`}
                          className="text-sm text-gray-300 hover:text-white"
                        >
                          {teamMembers[currentIndex].contact}
                        </a>
                      </div>
                      <div className="flex items-center gap-1">
                        <Mail className="h-4 w-4 text-purple-400" />
                        <a
                          href={`mailto:${teamMembers[currentIndex].email}`}
                          className="text-sm text-gray-300 hover:text-white"
                        >
                          {teamMembers[currentIndex].email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Linkedin className="h-4 w-4 text-purple-400" />
                        <a
                          href={teamMembers[currentIndex].linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-gray-300 hover:text-white"
                        >
                          LinkedIn Profile
                        </a>
                      </div>
                    </motion.div>
                  ) : (
                    [getIndex(-1), getIndex(0), getIndex(1)].map(
                      (indexOffset, idx) => (
                        <motion.div
                          key={teamMembers[indexOffset].name}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: idx === 1 ? 1.1 : 0.9 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.5 }}
                          className={`bg-white/10 backdrop-blur-md mt-10 mb-10 p-6 rounded-xl shadow-lg shadow-white/30  flex flex-col items-center border border-white/20 ${idx === 1 ? "w-72 h-96" : "w-70 h-80"
                            }`}
                        >
                          <div
                            className={`relative ${idx === 1 ? "w-36 h-36" : "w-28 h-28"
                              } mb-4`}
                          >
                            <Image
                              src={teamMembers[indexOffset].image}
                              alt={teamMembers[indexOffset].name}
                              fill
                              className="object-cover rounded-full"
                            />
                          </div>
                          <h3 className="text-xl font-semibold text-center">
                            {teamMembers[indexOffset].name}
                          </h3>
                          <p className="text-purple-400 mb-2 text-center">
                            {teamMembers[indexOffset].role}
                          </p>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-purple-400" />
                            <a
                              href={`tel:${teamMembers[
                                indexOffset
                              ].contact.replace(/\s+/g, "")}`}
                              className="text-sm text-gray-300 hover:text-white"
                            >
                              {teamMembers[indexOffset].contact}
                            </a>
                          </div>

                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-purple-400" />
                            <a
                              href={`mailto:${teamMembers[indexOffset].email}`}
                              className="text-sm text-gray-300 hover:text-white"
                            >
                              {teamMembers[indexOffset].email}
                            </a>
                          </div>
                          <div className="flex items-center gap-2">
                            <Linkedin className="h-4 w-4 text-purple-400" />
                            <a
                              href={teamMembers[indexOffset].linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-gray-300 hover:text-white"
                            >
                              LinkedIn Profile
                            </a>
                          </div>
                        </motion.div>
                      )
                    )
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
        <Footer />
      </div>
    </>
  );
}
