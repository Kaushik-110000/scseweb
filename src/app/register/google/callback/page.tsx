"use client";

import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/UserContext";
import axios from "axios";
export default function GoogleCallbackPage() {
  const router = useRouter();
  const [status, setStatus] = useState("Loading...");
  const { setUserData } = useContext(UserContext);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (!code) {
      setStatus(
        "Error while authentication , as we are unable to fetch code from the url"
      );
      return;
    }
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/auth/google?code=${code}`);
        const data = await response.json();
        if (response.ok) {
          localStorage.setItem("email", data.email);
          setStatus("Success, Proceed to set credentials");
          router.push("/fillCredentials");
        } else {
          setStatus(
            data.error ||
              data.message ||
              "Error during Google callback, Please retry "
          );

          if (data.status === 405) {
            setTimeout(async () => {
              const userResponse = await axios.get("/api/users/getCurrent");
              if (userResponse.data.data.status === 200) {
                console.log("kand", userResponse.data.data);
                setUserData(userResponse.data.data._doc);
              }
              router.push("/dashboard");
            }, 2000);
          }
        }
      } catch (error) {
        setStatus("Network error");
      }
    };
    fetchData();
  }, [router]);

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-black p-4 overflow-hidden">
      {/* Inline style tag for animations */}
      <style jsx>{`
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
        }
        @keyframes gradientShift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        @keyframes progressGlow {
          0% {
            opacity: 0.7;
            transform: scaleX(0);
          }
          50% {
            opacity: 1;
            transform: scaleX(1);
          }
          100% {
            opacity: 0.7;
            transform: scaleX(0) translateX(100%);
          }
        }
        @keyframes gridPan {
          0% {
            transform: translate(-50%, -50%);
          }
          100% {
            transform: translate(50%, 50%);
          }
        }
        .animate-twinkle {
          animation: twinkle 1.5s infinite;
        }
        .animate-gradient-shift {
          animation: gradientShift 4s ease infinite;
          background-size: 200% 200%;
        }
        .animate-progress-glow {
          animation: progressGlow 2s ease infinite;
        }
        .animate-grid-pan {
          animation: gridPan 20s linear infinite;
        }
      `}</style>

      {/* Starry background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-blue-400 rounded-full"
            style={{
              animation: `twinkle 1.5s infinite ${i * 0.2}s`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Galactic center */}
      <div className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-blue-900/30 to-transparent animate-pulse" />

      {/* Main card */}
      <div className="relative bg-black/50 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-12 max-w-md text-center space-y-8 transition-all duration-300 hover:border-white/20">
        {/* Animated orb */}
        <div
          className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-400/30 to-purple-600/30 rounded-full shadow-inner"
          style={{
            animation: "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
          }}
        >
          <div
            className="absolute inset-0 rounded-full border border-white/10"
            style={{ animation: "spin 20s linear infinite" }}
          />
        </div>

        {/* Text content */}
        <div className="space-y-6">
          <h1
            className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"
            style={{
              animation: "gradientShift 4s ease infinite",
              backgroundSize: "200% 200%",
            }}
          >
            Authenticating
          </h1>
          <p className="text-blue-200/80 text-lg font-light animate-fade-in">
            {status}
          </p>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
          <div
            className="w-full h-full bg-gradient-to-r from-blue-400 to-purple-600 rounded-full"
            style={{ animation: "progressGlow 2s ease infinite" }}
          />
        </div>
      </div>

      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-10"
        style={{ animation: "gridPan 20s linear infinite" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent w-1/2 h-px top-1/3" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent h-1/2 w-px left-1/3" />
      </div>
    </div>
  );
}
