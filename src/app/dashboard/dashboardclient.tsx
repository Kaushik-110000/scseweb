"use client";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "@/context/UserContext";
import RegistrationFeesButton from "@/components/RegistrationFeesButton";
import { useRouter } from "next/navigation";
import { checkIsFromCse, checkIsFromNit } from "@/utils/paychecker";
import StarsCanvas from "@/components/StarCanvas";
import Earth from "@/components/Earth";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

interface UserData {
  userID: string;
  email: string;
  fullName: string;
  isNitian: boolean;
  isFromCse: boolean;
  isPrime: boolean;
  b1: boolean;
  b2: boolean;
  iat: number;
  exp: number;
}

export const metadata: Metadata = {
  title: "Dashboard - SCSE",
  description: "Welcome to the SCSE Dashboard",
};

function Dashboard() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState("");
  const updateState = useContext(UserContext).setUserData;
  const router = useRouter();
  const [events, setEvents] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pending, setPending] = useState(false);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/users/getCurrent");
        setUserData(response.data.data._doc);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserData(null);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.post("api/users/eventRegistrations", {
          userID: userData?.userID,
        });
        console.log("Event Registrations:", response.data);
        setEvents(response.data.data);
      } catch (error) {
        console.error("Error fetching events:", error);
        setEvents("Error");
      }
    };
    if (userData?.userID) {
      fetchEventData();
    }
  }, [userData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchPendingStatus = await axios.post("/api/pendingPays", {
          email: userData?.email,
        });
        setPending(fetchPendingStatus.data.status);
        console.log(fetchPendingStatus.data.status);
      } catch (error) {
        setPending(false);
      }
    };
    fetchData();
  });

  const handleLogOut = async () => {
    try {
      await axios.post("/api/auth/logout");
      updateState(null);
      router.push("/login");
    } catch (error: any) {
      setError(error.message);
    }
  };

  let amount = 1000;
  if (checkIsFromCse(userData?.email!) && checkIsFromNit(userData?.email!)) {
    amount = 650;
  } else if (
    !checkIsFromCse(userData?.email!) &&
    checkIsFromNit(userData?.email!)
  ) {
    amount = 300;
  } else {
    amount = 900;
  }

  const handlePrimeMemberClick = () => {
    setIsModalOpen(true);
  };

  // by Priya raj

  return (
    <React.Fragment>
      <div className="relative min-h-screen bg-black text-white">
        {/* Background Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80 z-0 " />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-center items-center mb-12">
              <h2 className="text-5xl mt-2 font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                Dashboard
              </h2>
              {/* { !userData?.isPrime?<button
              className="mt-4 sm:mt-0 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3 px-6 rounded-xl transition-all transform hover:scale-105 shadow-lg shadow-purple-500/20"
              onClick={handlePrimeMemberClick}
            >
              Pay and Get Prime
            </button>:<></> } */}
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-red-400 text-lg mb-8 text-center bg-black/60 backdrop-blur-md p-4 rounded-xl border border-red-500/20">
                {error}
              </p>
            )}

            <StarsCanvas />

            <div className="h-full mb-2 p-0 flex flex-col md:flex-row items-center justify-between w-full">
              <div className="w-full h-[24.5rem] sm:h-[30.5rem]  md:w-1/2 flex justify-start">
                <Earth />
              </div>
              <div className="w-full h-full flex flex-row items-center mb-2   md:w-1/2  justify-end text-center md:text-left pr-4">
                {/* Prime Benefits Section */}
                {userData && (
                  <div className=" h-full p-6 rounded-2xl  mb-12">
                    <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                      {userData.isPrime
                        ? "You are a Prime Member"
                        : `Unlock Prime Benefits Only in ₹ ${amount}`}
                    </h3>
                    {userData.isPrime ? (
                      <>
                        <p className="text-purple-400 text-lg mb-2">
                          Enjoy all the exclusive perks of being a Prime Member!
                        </p>
                        <ul className="list-disc list-inside text-gray-300 space-y-2">
                          <li>Register in all events with no extra charge</li>
                          <li>
                            Accommodation (For students not belonging to the
                            college)
                          </li>
                          <li>Goodies for everyone</li>
                        </ul>
                      </>
                    ) : (
                      <>
                        <ul className="list-disc list-inside text-gray-300 space-y-2">
                          <li>Register in all events with no extra charge</li>
                          <li>
                            Accommodation (For students not belonging to the
                            college)
                          </li>
                          <li>Goodies for everyone</li>
                        </ul>
                        {pending ? (
                          <h4 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                            Wait we will verify your payment soon !!
                          </h4>
                        ) : (
                          <button
                            className="mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-2 px-4 rounded-xl transition-all transform hover:scale-105 shadow-lg shadow-purple-500/20 cursor-pointer"
                            onClick={handlePrimeMemberClick}
                          >
                            Get Prime Now
                          </button>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* User Info */}
            {userData ? (
              <div className="bg-black/60 backdrop-blur-md p-6 rounded-2xl border border-purple-500/20 shadow-lg shadow-purple-500/10 mb-12">
                <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                  Your Profile
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <p className="text-2xl">
                    <strong className="text-gray-300 ">User ID:</strong>{" "}
                    {userData.userID}
                  </p>
                  <p>
                    <strong className="text-gray-300">Email:</strong>{" "}
                    {userData.email}
                  </p>
                  <p>
                    <strong className="text-gray-300">Full Name:</strong>{" "}
                    {userData.fullName}
                  </p>
                  <p>
                    <strong className="text-gray-300">NITian:</strong>{" "}
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        userData.isNitian ? "bg-purple-500" : "bg-gray-500"
                      } text-white`}
                    >
                      {userData.isNitian ? "Yes" : "No"}
                    </span>
                  </p>
                  <p>
                    <strong className="text-gray-300">From CSE:</strong>{" "}
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        userData.isFromCse ? "bg-purple-500" : "bg-gray-500"
                      } text-white`}
                    >
                      {userData.isFromCse ? "Yes" : "No"}
                    </span>
                  </p>
                  <p>
                    <strong className="text-gray-300">Prime Member:</strong>{" "}
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        userData.isPrime ? "bg-purple-500" : "bg-red-500"
                      } text-white`}
                    >
                      {userData.isPrime ? "Yes" : "No"}
                    </span>
                  </p>
                  {/* <p>
                  <strong className="text-gray-300">Boolean1:</strong>{" "}
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      userData.b1 ? "bg-purple-500" : "bg-gray-500"
                    } text-white`}
                  >
                    {userData.b1 ? "Yes" : "No"}
              </span>
                </p>
                <p>
                  <strong className="text-gray-300">Boolean2:</strong>{" "}
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      userData.b2 ? "bg-purple-500" : "bg-gray-500"
                    } text-white`}
                  >
                    {userData.b2 ? "Yes" : "No"}
                  </span>
                </p> */}
                </div>
              </div>
            ) : (
              <p className="text-gray-300 text-center mb-12 bg-black/60 backdrop-blur-md p-4 rounded-xl border border-purple-500/20">
                User not found
              </p>
            )}

            {/* Events Section */}
            <div className="mb-12">
              {events === "Error" && (
                <p className="text-red-400 text-center mb-6 bg-black/60 backdrop-blur-md p-4 rounded-xl border border-red-500/20">
                  Error while fetching your registered events.
                </p>
              )}

              {Array.isArray(events) && events.length > 0 && (
                <div className="bg-black/60 backdrop-blur-md p-6 rounded-2xl border border-purple-500/20 shadow-lg shadow-purple-500/10">
                  <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                    Your Registered Events
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {events.map((event: any) => (
                      <div
                        key={event._id}
                        className="bg-white/5 p-4 rounded-xl border border-purple-500/10"
                      >
                        <p>
                          <strong className="text-gray-300">Event Name:</strong>{" "}
                          {event.eventName}
                        </p>
                        <p>
                          <strong className="text-gray-300">Team Name:</strong>{" "}
                          {event.teamName}
                        </p>
                        <p>
                          <strong className="text-gray-300">Members:</strong>{" "}
                          {event.members.join(", ")}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {Array.isArray(events) && events.length === 0 && (
                <p className="text-gray-300 text-center mb-6 bg-black/60 backdrop-blur-md p-4 rounded-xl border border-purple-500/20">
                  You have not registered for any events yet.
                </p>
              )}
            </div>

            {/* Logout Button */}
            <div className="flex justify-end">
              <p className="text-black">By Priya Raj</p>
              <button
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3 px-6 rounded-xl transition-all transform hover:scale-105 shadow-lg shadow-purple-500/20 cursor-pointer"
                onClick={handleLogOut}
              >
                Log Out
              </button>
            </div>
          </div>

          {/* Modal (Razorpay Receipt Style) */}
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
              <div
                className="absolute inset-0 bg-black opacity-50"
                onClick={() => setIsModalOpen(false)}
              ></div>
              <div className="relative bg-black/80 backdrop-blur-md text-white p-6 rounded-2xl shadow-xl w-full max-w-md border border-purple-500/20">
                <div className="border-b border-purple-500/30 pb-4 mb-4">
                  <h3 className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                    Prime Membership Receipt
                  </h3>
                  <p className="text-gray-400 text-sm text-center">
                    Powered by Razorpay
                  </p>
                </div>
                <div className="mb-6">
                  <p className="text-lg font-semibold">Amount: ₹{amount}</p>
                  <p className="text-gray-400 text-sm">
                    To unlock Prime benefits:
                  </p>
                  <ul className="list-disc list-inside mt-2 text-gray-300 space-y-1">
                    <li>Register in all events with no extra charge</li>
                    <li>
                      Accommodation (For students not belonging to the college)
                    </li>
                    <li>Goodies for everyone</li>
                  </ul>
                </div>
                {userData?.email ? (
                  !userData?.isPrime ? (
                    <div className="flex-1 justify-center align-middle ">
                      {!userData?.isNitian ? (
                        <RegistrationFeesButton email={userData.email} />
                      ) : (
                        <button
                          onClick={() => router.push(`/payreg`)}
                          className="w-full mb-2 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-all transform hover:scale-105 shadow-lg shadow-purple-500/20 border border-purple-500/30 mt-5"
                        >
                          Pay Registration Fees
                        </button>
                      )}
                    </div>
                  ) : (
                    <p className="text-purple-400 text-center mb-6">
                      You are already a Prime Member
                    </p>
                  )
                ) : (
                  <p className="bg-red-500 text-white p-2 rounded-xl text-center mb-6">
                    Please login to register
                  </p>
                )}
                <button
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3 px-4 rounded-xl transition-all transform hover:scale-105 shadow-lg shadow-purple-500/20"
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}
          <Footer />
        </div>
      </div>
    </React.Fragment>
  );
}

export default Dashboard;
