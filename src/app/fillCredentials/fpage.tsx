"use client";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/UserContext";
import { motion } from "framer-motion";
import { IconUser, IconMail, IconLock, IconSchool } from "@tabler/icons-react";
import Loading from "@/components/Loading";

function Page() {
  const [loader, setLoader] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    password: "",
    collegeName: "",
  });
  const [status, setStatus] = useState("");
  const { setUserData } = useContext(UserContext);

  // Load email from localStorage on component mount
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setFormData((prev) => ({ ...prev, email: storedEmail }));
    }
  }, []);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission and redirect to dashboard on success
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoader(true);
    try {
      console.log("Form Data:", formData);
      const response = await axios.post("/api/auth/fillCredentials", formData);
      const data = response.data;
      if (data.status === 200) {
        const userResponse = await axios.get("/api/users/getCurrent");
        if (userResponse.data.data.status === 200) {
          setUserData(userResponse.data.data._doc);
        }
        setLoader(false);
        setStatus(data.error || data.message || "Successfully registered");
        router.push("/dashboard");
      }
    } catch (error: any) {
      setLoader(false);
      const data = await error.response.data;
      console.log("data", data);

      if (data.status == 405) {
        setStatus(
          data.error || data.message || "Your token had expired, Please retry "
        );
        setTimeout(() => {
          router.push("/register");
        }, 2000);
      } else if (data.status == 401) {
        setStatus(data.error || data.message || "Token error, Please retry ");
        setTimeout(() => {
          router.push("/register");
        }, 2000);
      } else if (data.status == 410) {
        setStatus(
          data.error || data.message || "User already exists , Please login "
        );
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else setStatus(error?.message || "Network error faced");
    }
  };
  useEffect(() => {
    document.body.style.overflowY = "auto";
  });

  return !loader ? (
    <div
      className="flex justify-center mt-14 items-center min-h-screen bg-black bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 to-black"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/4814061/pexels-photo-4814061.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay to darken the background image (no blur) */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      {/* Animated circles */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-700/20 rounded-full filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-700/20 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-700/20 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-gray-900/80 p-8 rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.7)] border border-gray-800">
          <div className="mb-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.1,
              }}
              className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <IconUser className="w-8 h-8 text-white" />
            </motion.div>
            <h2 className="text-2xl font-bold text-white mb-1">
              Create Account
            </h2>
            <p className="text-gray-400 text-sm">
              Complete your profile to continue
            </p>
          </div>

          {status && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4 p-4 bg-red-900/50 border border-red-700 rounded-lg text-red-300 text-sm"
            >
              {status}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <IconMail className="w-4 h-4" />
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  readOnly
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200 placeholder-gray-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <IconUser className="w-4 h-4" />
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200 placeholder-gray-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <IconLock className="w-4 h-4" />
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Create a strong password"
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200 placeholder-gray-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <IconSchool className="w-4 h-4" />
                College Name
              </label>
              <input
                type="text"
                name="collegeName"
                value={formData.collegeName}
                onChange={handleChange}
                required
                placeholder="Enter your college name"
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200 placeholder-gray-500"
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg shadow-blue-600/20 cursor-pointer"
            >
              Complete Registration
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  ) : (
    <Loading />
  );
}

export default Page;
