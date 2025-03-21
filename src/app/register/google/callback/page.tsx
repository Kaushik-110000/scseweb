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
    <div className="flex items-center justify-center min-h-screen">
      <p>{status}</p>
    </div>
  );
}
