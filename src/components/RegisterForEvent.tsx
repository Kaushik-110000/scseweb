"use client";
import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
interface RegisterForEventProps {
  eventName: string; // e.g. "Hackathon"
  maxPart: number; // e.g. 5
  minPart: number; // e.g. 2
}

// Define the shape of your API response (for errors, success, etc.)
interface ApiResponse {
  error?: string;
  message?: string;
}

const loadRazorpayScript = () => {
  return new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Razorpay SDK failed to load"));
    document.body.appendChild(script);
  });
};

export default function RegisterForEvent({
  eventName,
  maxPart,
  minPart,
}: RegisterForEventProps) {
  const [error, setError] = useState("");
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [participants, setParticipants] = useState<string[]>(
    Array(minPart).fill("")
  );

  // A required teamName field
  const [teamName, setTeamName] = useState("");
  const router = useRouter();
  // Open the overlay
  const handleOpenOverlay = () => {
    setIsOverlayOpen(true);
  };

  // Close the overlay
  const handleCloseOverlay = () => {
    setIsOverlayOpen(false);
  };

  // Add a new participant field (up to maxPart)
  const handleAddParticipant = () => {
    if (participants.length < maxPart) {
      setParticipants((prev) => [...prev, ""]);
    }
  };

  // Remove a participant field if we're above minPart
  const handleRemoveParticipant = (index: number) => {
    if (participants.length > minPart) {
      setParticipants((prev) => {
        const updated = [...prev];
        updated.splice(index, 1);
        return updated;
      });
    }
  };

  // Update a participant’s SCSE ID
  const handleParticipantChange = (index: number, value: string) => {
    const updated = [...participants];
    updated[index] = value;
    setParticipants(updated);
  };

  //code to handle payments starts here
  const handlePayment = async () => {
    try {
      await loadRazorpayScript();
      const response = await axios.post("/api/razorpay/eventFeesOrder", {
        eventName,
      });
      const data = await response.data;
      if (!data.success) {
        alert("Failed to create order: " + data.message);
        setError("Please try later");
        return;
      }
      const { order } = data;
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_API_KEY!,
        amount: order.amount,
        currency: order.currency,
        name: "SCSE",
        description: "Test Transaction",
        order_id: order.id,
        handler: async function (response: any) {
          alert("Payment successful! See your registration in dashboard");
          router.push("/dashboard");
          console.log(response);
          const formData = {
            teamName,
            members: participants,
            eventName,
          };
          await axios.post("/api/razorpay/verifyEventPayment", {
            ...response,
            ...formData,
            eventName,
          });
        },
        theme: {
          color: "#3399cc",
        },
      };
      const rzp1 = new (window as any).Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Something went wrong. Try later");
    }
  };

  //code to handle payments ends here

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if teamName is empty
    if (!teamName.trim()) {
      alert("Please enter a team name.");
      return;
    }

    console.log("Team Name:", teamName);
    console.log("Participants:", participants);

    const formData = {
      teamName,
      members: participants,
      eventName,
    };

    try {
      const response: AxiosResponse<ApiResponse> = await axios.post(
        "/api/registerForEvent",
        formData
      );

      if (response.status === 200) {
        // Success
        alert(
          `Team: ${teamName}\nEvent: ${eventName}\nParticipants:\n${participants.join(
            "\n Successfully registered"
          )}`
        );
        setTeamName("");
        setParticipants([""]);
        setIsOverlayOpen(false);
        router.push("/dashboard");
      }
    } catch (err: any) {
      if (err.response) {
        const status = err.response.status;
        if (status === 420) {
          const data: ApiResponse = err.response.data;
          setError(data.error || data.message || "Paisa dena hoga bhai.");
          handlePayment();
        } else {
          const data: ApiResponse = err.response.data;
          setError(data.error || data.message || "Unknown error occurred.");
        }
      } else {
        setError(err.message || "Network error occurred.");
      }
    }
  };

  return (
    <div>
      <button
        onClick={handleOpenOverlay}
        className="rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 cursor-pointer"
      >
        Register for {eventName}
      </button>

      {isOverlayOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <div className="relative w-full max-w-2xl rounded p-6 shadow-lg ">
            <button
              onClick={handleCloseOverlay}
              className="hidden md:inline-block absolute right-4 top-4 text-red-500 hover:text-red-700 cursor-pointer"
            >
              Close ✕
            </button>
            <button
              onClick={handleCloseOverlay}
              className="md:hidden absolute right-4 top-4 text-red-500 hover:text-red-700 cursor-pointer"
            >
              ✕
            </button>

            <h2 className="mb-4 text-xl font-bold">Register for {eventName}</h2>

            {/* Error Message Display */}
            {error && (
              <p className="mb-4 rounded bg-red-100 p-2 text-red-600">
                {error}
              </p>
            )}

            <form onSubmit={handleSubmit}>
              {/* Team Name Field */}
              <div className="mb-4">
                <label className="mb-1 block font-medium">
                  Team Name (Required):
                </label>
                <input
                  type="text"
                  className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your team name"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  required
                />
              </div>

              {/* Participants Fields */}
              {participants.map((value, i) => (
                <div key={i} className="mb-4">
                  <label className="mb-1 block font-medium">
                    Participant {i + 1} (SCSE-xxxxxxx):
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="SCSE-1234567"
                      className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={value}
                      onChange={(e) =>
                        handleParticipantChange(i, e.target.value)
                      }
                      required
                    />
                    {/* Remove participant button (only if above minPart) */}
                    {participants.length > minPart && (
                      <button
                        type="button"
                        onClick={() => handleRemoveParticipant(i)}
                        className="rounded bg-red-600 px-2 py-1 font-semibold text-white hover:bg-red-700 cursor-pointer"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {/* Add Participant Button */}
              {participants.length < maxPart && (
                <button
                  type="button"
                  onClick={handleAddParticipant}
                  className="mr-2 rounded bg-green-600 px-3 py-2 font-semibold text-white hover:bg-green-700 cursor-pointer"
                >
                  + Add Participant
                </button>
              )}

              <button
                type="submit"
                className="rounded bg-purple-600 px-4 py-2 font-semibold text-white hover:bg-purple-700 cursor-pointer"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
