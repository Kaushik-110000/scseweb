"use client";

import type React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Instagram,
  Facebook,
  Twitter,
  Send,
  User,
  AtSign,
} from "lucide-react";
import Image from "next/image";
import Footer from "@/components/Footer";
document.body.style.overflowY = "auto";
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const teamMembers = [
  {
    name: "AMRISH YADAV",
    role: "PAYMENT RELATED QUERY",
    image: "/images/amrish.jpg",
    linkedin:
      "https://www.linkedin.com/in/amrish-yadav-363b63289?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    phone: "+91 91188 41006",
    email: "amrishrock2002@gmail.com",
    bio: "You may contact him for any payment related query or issue , maybe your payment failure, refund related queries or any possible queries related to finances",
  },
  {
    name: "HARSHIT SHRIVASTAV",
    role: "GENERAL QUERY",
    image: "/images/harshit.jpg",
    linkedin: "https://www.linkedin.com/in/harshit-shrivastav-8b513127a",
    phone: "+91 89571 44430",
    email: "harshitshrivastav2609@gmail.com",
    bio: "You may contact him for any general purpose query, maybe related to the event or maybe.He is there to help you thorough all.",
  },
  {
    name: "ABHISHEK KAUSHIK",
    role: "REGISTRATION RELATED QUERY",
    image: "/images/abhishek.jpg",
    linkedin: "https://www.linkedin.com/in/abhishek-kaushik-836435282",
    phone: "+91 97986 87024",
    email: "abhishekkumar89647@gmail.com",
    bio: "Facing issue in registration, you may contact him for any registration related issues, maybe PRIME registration or event registration .",
  },
  {
    name: "MURLI DHARAN",
    role: "EVENT RELATED QUERY",
    image: "/images/murlidharan.jpg",
    linkedin:
      "https://www.linkedin.com/in/murli-dharan-614b89298?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    phone: "+91 62016 68754",
    email: "murlidharan93103@gmail.com",
    bio: "Confused with so many events ? Contact him for any event related queries. The answer of many of your queries are also in the events section, do visit !.",
  },
];

export default function ContactPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "+91 ",
    content: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Full name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.number.trim() || formData.number === "+91 ") {
      newErrors.number = "Phone number is required";
    } else if (!/^\+91 [6-9]\d{9}$/.test(formData.number)) {
      newErrors.number = "Please enter a valid Indian mobile number";
    }

    if (!formData.content.trim())
      newErrors.content = "Please enter your query or feedback";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "number") {
      if (value.startsWith("+91 ")) {
        setFormData((prev) => ({ ...prev, [name]: value }));
      } else if (value === "+91") {
        setFormData((prev) => ({ ...prev, [name]: "+91 " }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [name]: "+91 " + value.replace("+91 ", ""),
        }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    const number1 = formData.number.replace("+91 ", "");
    const number2 = formData.number;
    try {
      const response = await axios.post("/api/contactUs", {
        ...formData,
        number: number1,
      });
      if (response.status === 201) {
        setSubmitSuccess(true);
        setFormData({
          name: "",
          email: "",
          number: "+91 ",
          content: "",
        });
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      } else if (response.status === 400) {
        setFormData({ ...formData, number: number2 });
        alert(`Error: ${response.data.error}`);
      } else if (response.status === 500) {
        setFormData({ ...formData, number: number2 });
        alert(`Error: ${response.data.message}`);
      } else {
        setFormData({ ...formData, number: number2 });
        alert("Something went wrong");
      }
    } catch (error: any) {
      setFormData({ ...formData, number: number2 });
      console.error(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };
  document.body.style.overflowY = "auto";

  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1524334228333-0f6db392f8a1?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJsYWNrJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D"
          alt="College Fest Background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Contact Us
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Get in touch with the team behind this year&apos;s most exciting
              college fest!
            </p>
          </div>

          {/* Team Members */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-10 text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Contact For Queries
              </span>
            </h2>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  className="bg-black/60 backdrop-blur-md rounded-2xl overflow-hidden border border-purple-500/20 shadow-lg shadow-purple-500/10 group"
                >
                  <div className="relative h-80 overflow-hidden">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-xl font-bold">{member.name}</h3>
                      <p className="text-purple-400 font-medium">
                        {member.role}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 space-y-3">
                    <p className="text-gray-300 text-sm">{member.bio}</p>

                    <div className="pt-2 space-y-2">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-purple-400" />
                        <a
                          href={`tel:${member.phone.replace(/\s+/g, "")}`}
                          className="text-sm text-gray-300 hover:text-white"
                        >
                          {member.phone}
                        </a>
                      </div>

                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-purple-400" />
                        <a
                          href={`mailto:${member.email}`}
                          className="text-sm text-gray-300 hover:text-white"
                        >
                          {member.email}
                        </a>
                      </div>

                      <div className="flex items-center gap-2">
                        <Linkedin className="h-4 w-4 text-purple-400" />
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-gray-300 hover:text-white"
                        >
                          LinkedIn Profile
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Feedback Form */}
          <motion.div
            variants={fadeIn}
            className="bg-black/60 backdrop-blur-md p-8 rounded-2xl border border-purple-500/20 shadow-lg shadow-purple-500/10 mb-16"
          >
            <h2 className="text-3xl font-bold mb-6 text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Send Us Your Feedback
              </span>
            </h2>

            {submitSuccess && (
              <div className="mb-8 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/50 text-green-100 px-6 py-4 rounded-xl">
                <p className="text-center font-medium">
                  Thank you for your feedback! We&apos;ll get back to you soon.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-200"
                  >
                    Full Name <span className="text-pink-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full bg-black/50 border ${
                        errors.name ? "border-red-500" : "border-purple-500/30"
                      } rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent`}
                      placeholder="John Doe"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-sm text-red-400 mt-1">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-200"
                  >
                    Email Address <span className="text-pink-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <AtSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full bg-black/50 border ${
                        errors.email ? "border-red-500" : "border-purple-500/30"
                      } rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent`}
                      placeholder="your.email@example.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-red-400 mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="mb-6 space-y-2">
                <label
                  htmlFor="number"
                  className="block text-sm font-medium text-gray-200"
                >
                  Mobile Number <span className="text-pink-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    id="number"
                    name="number"
                    maxLength={14}
                    value={formData.number}
                    onChange={handleChange}
                    className={`w-full bg-black/50 border ${
                      errors.number ? "border-red-500" : "border-purple-500/30"
                    } rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent`}
                    placeholder="+91 9876543210"
                  />
                </div>
                {errors.number && (
                  <p className="text-sm text-red-400 mt-1">{errors.number}</p>
                )}
                <p className="text-xs text-gray-400">
                  Format: +91 followed by 10 digits (e.g., +91 9876543210)
                </p>
              </div>

              <div className="mb-8 space-y-2">
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-200"
                >
                  Your Query or Feedback{" "}
                  <span className="text-pink-500">*</span>
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full bg-black/50 border ${
                    errors.content ? "border-red-500" : "border-purple-500/30"
                  } rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent`}
                  placeholder="Please share your thoughts, questions, or feedback with us..."
                />
                {errors.content && (
                  <p className="text-sm text-red-400 mt-1">{errors.content}</p>
                )}
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="cursor-pointer flex items-center justify-center gap-2 bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-700 hover:to-purple-800 text-white font-medium py-3 px-8 rounded-xl transition-all transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg shadow-purple-500/20"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Submit Feedback
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
          {/* Society Contact Information */}
          <motion.div
            variants={fadeIn}
            className="bg-black/60 backdrop-blur-md p-8 rounded-2xl border border-purple-500/20 shadow-lg shadow-purple-500/10 mb-16"
          >
            <h2 className="text-3xl font-bold mb-6 text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Reach us
              </span>
            </h2>

            <div className="grid md:grid-cols-3 gap-8 overflow-auto flex items-center justify-center">
              <div className="flex flex-col items-center text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm">
                <div className="bg-gradient-to-r from-blue-500 to-purple-700 p-4 rounded-full mb-4">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Email Us</h3>
                <a
                  href="mailto:amrishrock2002@gmail.com"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  amrishrock2002@gmail.com
                </a>
                <a
                  href="mailto:abhishekkumar89647@gmail.com"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  abhishekkumar89647@gmail.com
                </a>
                <a
                  href="mailto:harshitshrivastav2609@gmail.com"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  harshitshrivastav2609@gmail.com
                </a>
              </div>

              <div className="flex flex-col items-center text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm">
                <div className="bg-gradient-to-r from-blue-500 to-purple-700 p-4 rounded-full mb-4">
                  <Phone className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Call Us</h3>
                <a
                  href="tel:+919118841006"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  +91 9118841006
                </a>
                <a
                  href="tel:+919798687024"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  +91 9798687024
                </a>
                <a
                  href="tel:+918957144430"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  +91 8957144430
                </a>
              </div>

              <div className="flex flex-col items-center text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm">
                <div className="bg-gradient-to-r from-blue-500 to-purple-700 p-4 rounded-full mb-4">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Find Us</h3>
                <p className="text-gray-300">
                  National Institute of Technology
                  <br />
                  Jamshedpur, Jharkhand
                  <br />
                  831014, India
                </p>
              </div>
            </div>

            <div className="flex justify-center mt-8 space-x-4">
              <a
                href="https://www.instagram.com/scse.nitjsr/"
                className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="h-6 w-6" />
              </a>
              {/* <a
                href="#"
                className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
              >
                <Facebook className="h-6 w-6" />
              </a> */}
              <a
                href="https://www.linkedin.com/company/scse-nitjsr/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </motion.div>
          {/* Event Details */}
          <motion.div
            variants={fadeIn}
            className="bg-black/60 backdrop-blur-md p-8 rounded-2xl border border-purple-500/20 shadow-lg shadow-purple-500/10"
          >
            <h2 className="text-3xl font-bold mb-6 text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Other Details
              </span>
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4 align-center">
                <div className="bg-white/5 p-4 rounded-xl">
                  <h3 className="text-xl font-semibold mb-2">Sponsors</h3>
                  <p className="text-gray-300">
                    For sponsorship inquiries, please contact:
                  </p>
                  <a
                    href="mailto:scse.nit@gmail.com"
                    className="text-purple-400 hover:text-purple-300"
                  >
                    scse.nit@gmail.com
                  </a>
                </div>
              </div>
              {/* <div className="space-y-4 align-center">
                <div className="bg-white/5 p-4 rounded-xl">
                  <h3 className="text-xl font-semibold mb-2">
                    Account Details
                  </h3>
                  <p className="text-gray-300">
                    For sponsorship inquiries, please contact:
                  </p>
                  <a
                    href="mailto:sponsors@collegefest.edu"
                    className="text-purple-400 hover:text-purple-300"
                  >
                    sponsernitjsrcse@gmail.com
                  </a>
                </div>
              </div> */}
            </div>
          </motion.div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
