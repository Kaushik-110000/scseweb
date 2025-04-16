"use client";

import React,{useEffect} from "react";
// We only do Google sign-up here. The user will be redirected to Google OAuth.
export default function RegisterPage() {
   useEffect(() => {
     document.body.style.overflowY = "auto";
   });

  const handleGoogleSignup = () => {
    // We build the Google OAuth URL manually:
    const googleUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&response_type=code&scope=email%20profile&access_type=offline&prompt=consent`;
    window.location.href = googleUrl;
  };

  return (
    <div className="min-h-screen background-grid3 flex items-center bg-black justify-center bg-cover bg-center">
      <div className=" bg-opacity-75 p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-5">
          Authenticate Yourself
        </h2>
        <p className="text-pink-600 mb-6 text-3xl">
          Do use your college mails to avail extra discounts.
        </p>
        <button
          onClick={handleGoogleSignup}
          className="
            px-6
            py-3
            text-white
            rounded-md
            font-semibold
            shadow-md
            transition-all
            duration-300
            ease-in-out
            hover:opacity-90
            focus:outline-none
            cursor-pointer
          "
          style={{
            background: "linear-gradient(to right, #4285F4, #34A853)",
          }}
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}
