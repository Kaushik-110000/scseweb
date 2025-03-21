"use client";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/UserContext";

function Page() {
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
    try {
      console.log("Form Data:", formData);
      const response = await axios.post("/api/auth/fillCredentials", formData);
      const data = response.data;
      if (data.status === 200) {

        const userResponse = await axios.get("/api/users/getCurrent");
        if (userResponse.data.data.status === 200) {
          setUserData(userResponse.data.data._doc);
        }
        router.push("/dashboard");
        setStatus(data.error || data.message || "Successfully registered");
        
      }
    } catch (error: any) {
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

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <form onSubmit={handleSubmit} className=" p-6 shadow-md rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">User Details</h2>
        {<p>{status}</p>}
        <label className="block mb-2">
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            readOnly
            className="w-full mt-1 p-2 border border-gray-300 rounded"
          />
        </label>

        <label className="block mb-2">
          Full Name:
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded"
          />
        </label>

        <label className="block mb-2">
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded"
          />
        </label>

        <label className="block mb-2">
          College Name:
          <input
            type="text"
            name="collegeName"
            value={formData.collegeName}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded"
          />
        </label>

        <button
          type="submit"
          className="w-full mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Page;
