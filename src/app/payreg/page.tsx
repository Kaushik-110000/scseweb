"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { checkIsFromCse, checkIsFromNit } from "@/utils/paychecker";
document.body.style.overflowY = "auto";
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

function Page() {
  document.body.style.overflowY = "auto";

  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    transactionId1: "",
    transactionId2: "",
    transactionId3: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/users/getCurrent");
        setUserData(response.data.data._doc);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Error fetching user data.");
      }
    };
    fetchUserData();
  }, []);

  let amount = 900;
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

  const handleImageUpload = async () => {
    setError(null);
    if (!image) {
      setError("Please select an image to upload.");
      return;
    }
    setLoading(true);
    const data = new FormData();
    data.append("file", image);
    try {
      const response = await axios.post(`/api/cloudinary/upload`, data);
      setImageUrl(response.data.uploads.file.secure_url);
    } catch (err) {
      console.error("Image upload failed:", err);
      setError("Image upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    if (!imageUrl) {
      setError("Please upload payment proof.");
      setSubmitting(false);
      return;
    }
    if (!formData.transactionId1) {
      setError("Transaction ID 1 is required.");
      setSubmitting(false);
      return;
    }
    const data = {
      ...formData,
      paymentProof: imageUrl,
      email: userData?.email,
      scseId: userData?.userID,
    };
    try {
      console.log(data);
      // await new Promise((resolve) => setTimeout(resolve, 2000));
      const response = await axios.post("/api/collegepay", data);
      console.log(response);
      setShowSuccess(true);
      setSubmitting(false);
    } catch (err: any) {
      setError("Payment submission failed. Please try again.");
      if (err.error) {
        setError(err.error);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="background-grid4 from-blue-400 via-purple-500 to-pink-600 pt-20 min-h-screen p-8">
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto rounded-xl p-8 shadow-[10px_10px_20px_rgba(0,0,0,0.4)] bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 transform hover:scale-[1.02] transition-all duration-300"
      >
        <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Payment Portal
        </h1>

        <div className="space-y-6">
          {/* Auto-filled Email */}
          <div>
            <label className="block text-purple-700 mb-2 font-medium">
              Email :
            </label>
            <input
              type="email"
              value={userData?.email || ""}
              readOnly
              className="w-full p-3 border rounded-lg"
            />
          </div>

          {/* Auto-filled SCSE ID */}
          <div>
            <label className="block text-purple-700 mb-2 font-medium">
              SCSE ID :
            </label>
            <input
              type="text"
              value={userData?.userID || "SCSE1234"}
              readOnly
              className="w-full p-3 border rounded-lg "
            />
          </div>

          {/* Static QR Code */}
          <div>
            <label className="block text-purple-700 mb-2 font-medium">
              Payment QR Code :
            </label>
            <img
              src="/scseqr.png"
              alt="SCSE QR"
              className="w-64 h-64 mx-auto border rounded-lg"
            />
            <p className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              ₹{amount}
            </p>
          </div>

          {/* Payment Proof */}

          <div>
            <label className="block text-purple-700 mb-2 font-medium">
              Payment Proof :
            </label>
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Payment Proof"
                className="w-32 h-32 mt-1 mx-auto"
              />
            ) : (
              <p className="mt-1 text-gray-500 text-center">
                {!imageUrl ? "No image uploaded" : "uploaded"}
              </p>
            )}

            <div className="flex flex-col gap-4 mt-2">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                className="flex-1 p-2 w-full border rounded-lg"
              />
              <button
                type="button"
                onClick={handleImageUpload}
                disabled={loading}
                className="px-6 py-2 bg-gradient-to-r max-w-30 from-blue-400 to-purple-500 text-white rounded-lg hover:opacity-90 disabled:opacity-50"
              >
                {loading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </div>
          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-lg">{error}</div>
          )}
          {/* Transaction IDs */}
          <div className="space-y-4">
            <div>
              <label className="block text-purple-700 mb-2 font-medium">
                Transaction ID 1 <span className="text-red-700">*</span> :
              </label>
              <input
                required
                value={formData.transactionId1}
                onChange={(e) =>
                  setFormData({ ...formData, transactionId1: e.target.value })
                }
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-purple-700 mb-2 font-medium">
                Transaction ID 2 : (if any)
              </label>
              <input
                value={formData.transactionId2}
                onChange={(e) =>
                  setFormData({ ...formData, transactionId2: e.target.value })
                }
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-purple-700 mb-2 font-medium">
                Transaction ID 3 : (if any)
              </label>
              <input
                value={formData.transactionId3}
                onChange={(e) =>
                  setFormData({ ...formData, transactionId3: e.target.value })
                }
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting || !imageUrl}
            className="w-full py-3 bg-gradient-to-r from-blue-400 to-purple-500 text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {submitting ? "Submitting....." : "Submit Payment"}
          </button>
        </div>
      </form>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
              Submitted successfully,
              <p className="text-2xl font-bold mb-4 text-blue-800">
                {" "}
                We will verify soon, then you can register in any events with no
                extra cost, till then{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-pink-500">
                  Explore
                </span>
              </p>
            </h3>
            <button
              onClick={() => router.push("/events")}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              Explore events
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
