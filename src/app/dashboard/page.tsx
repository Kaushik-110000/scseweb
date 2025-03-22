"use client";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "@/context/UserContext";
import RegistrationFeesButton from "@/components/RegistrationFeesButton";
import { useRouter } from "next/navigation";
import { checkIsFromCse, checkIsFromNit } from "@/utils/paychecker";

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

function Dashboard() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState("");
  const updateState = useContext(UserContext).setUserData;
  const router = useRouter();

  // Holds the user's event registrations or "Error"
  const [events, setEvents] = useState<any>(null);

  // State to handle modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch current user data
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

  // Fetch event registrations once we have the userID
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

  // Open the modal on clicking "Be a Prime Member"
  const handlePrimeMemberClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div
      className="mt-20 absolute"
      style={{
        backgroundColor: "black",
        color: "white",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <div className="ml-20">
        {/* Decorative Section with "Be a Prime Member" button */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Your Dashboard</h2>
          <button
            className="bg-green-500 px-6 py-2 rounded-xl text-white"
            onClick={handlePrimeMemberClick}
          >
            Pay and get prime
          </button>
        </div>

        {/* Error message */}
        <p className="text-red-400 text-2xl">{error}</p>

        {userData ? (
          <div className="border border-white p-4 rounded">
            <p>
              <strong>Your userId:</strong> {userData.userID}
            </p>
            <p>
              <strong>Email:</strong> {userData.email}
            </p>
            <p>
              <strong>Full Name:</strong> {userData.fullName}
            </p>
            <p>
              <strong>NITian:</strong> {userData.isNitian ? "Yes" : "No"}
            </p>
            <p>
              <strong>From CSE:</strong> {userData.isFromCse ? "Yes" : "No"}
            </p>
            <p>
              <strong>Prime Member:</strong> {userData.isPrime ? "Yes" : "No"}
            </p>
            <p>
              <strong>Boolean1:</strong> {userData.b1 ? "Yes" : "No"}
            </p>
            <p>
              <strong>Boolean2:</strong> {userData.b2 ? "Yes" : "No"}
            </p>
          </div>
        ) : (
          <p>User not found</p>
        )}
      </div>

      {/* Middle Section showing Events */}
      <div className="ml-30 flex-1">
        {events === "Error" && (
          <p className="mt-6 text-red-500">
            Error while fetching your registered events.
          </p>
        )}
        {Array.isArray(events) && events.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xl font-bold mb-2">Your Registered Events:</h3>
            {events.map((event: any) => (
              <div
                key={event._id}
                className="border border-white p-2 mb-3 rounded"
              >
                <p>
                  <strong>Event Name:</strong> {event.eventName}
                </p>
                <p>
                  <strong>Team Name:</strong> {event.teamName}
                </p>
                <p>
                  <strong>Members:</strong> {event.members.join(", ")}
                </p>
              </div>
            ))}
          </div>
        )}
        {Array.isArray(events) && events.length === 0 && (
          <p className="mt-6">You have not registered for any events yet.</p>
        )}

        <button
          className="bg-red-500 mt-20 rounded-3xl w-30 h-10"
          onClick={handleLogOut}
        >
          Log out
        </button>
      </div>

      {/* Modal for Receipt and Registration Fees */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setIsModalOpen(false)}
          ></div>
          {/* Modal Content */}
          <div className="relative bg-white text-black p-8 rounded-lg shadow-lg z-10 w-11/12 max-w-md">
            <h3 className="text-2xl font-bold mb-4">
              Registration Fee Details
            </h3>
            <p className="text-xl mb-4">Fee Amount: ₹{amount}</p>
            <ul className="list-disc list-inside mb-4">
              <li>Participate in all events with no extra charge</li>
              <li>Get exclusive goodies</li>
              <li>Accommodation for outsiders</li>
            </ul>
            {userData?.email ? (
              !userData?.isPrime ? (
                <RegistrationFeesButton email={userData.email} />
              ) : (
                <p>Already paid registration fees</p>
              )
            ) : (
              <p className="bg-red text-white text-xl">
                Please login to register
              </p>
            )}
            <button
              className="mt-6 bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
