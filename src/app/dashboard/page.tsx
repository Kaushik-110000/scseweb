"use client";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "@/context/UserContext";
import RegistrationFeesButton from "@/components/RegistrationFeesButton";
import { useRouter } from "next/navigation";

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
        // Post request with userID in the body
        const response = await axios.post("api/users/eventRegistrations", {
          userID: userData?.userID,
        });
        console.log("Event Registrations:", response.data);
        // Assuming the data is in response.data.data
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

  return (
    <div
      className="mt-20 absolute md:flex"
      style={{
        backgroundColor: "black",
        color: "white",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <div className="ml-20">
        <h2>Your Dashboard</h2>
        <p className="text-red-400 text-2xl">{error}</p>

        {userData ? (
          <div
            style={{
              border: "1px solid white",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
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
      <div className="ml-30">
        {/* Display event registrations */}
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
                {/* Add more fields as needed */}
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

        {userData?.email ? (
          !userData?.isPrime ? (
            <RegistrationFeesButton email={userData.email} />
          ) : (
            <p>Already paid registration fees</p>
          )
        ) : (
          <p className="bg-red text-white text-xl">Please login to register</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
