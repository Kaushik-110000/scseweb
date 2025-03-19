"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    password: "",
    collegeName: "",
  });

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
      await axios.post("/api/auth/fillCredentials", formData);
      // Redirect to dashboard upon success
      router.push("/dashboard");
    } catch (error) {
      console.error("Error submitting form:", error);
      // Optionally handle error (e.g., show error message to user)
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <form
        onSubmit={handleSubmit}
        className=" p-6 shadow-md rounded-lg w-96"
      >
        <h2 className="text-xl font-bold mb-4">User Details</h2>

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
