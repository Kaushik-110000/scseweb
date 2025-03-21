"use client";
import React from "react";
import axios from "axios";

const loadRazorpayScript = () => {
  return new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Razorpay SDK failed to load"));
    document.body.appendChild(script);
  });
};

interface RegistrationFeesButtonProps {
  email: string;
}

export default function RegistrationFeesButton({
  email,
}: RegistrationFeesButtonProps) {
  const handlePayment = async () => {
    try {
      await loadRazorpayScript();
      const response = await axios.post("/api/razorpay/registrationFeesOrder");
      const data = await response.data;
      if (!data.success) {
        alert("Failed to create order: " + data.message + "Retry Later");
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
          alert("Payment successful!");
          console.log(response);
          await axios.post("/api/razorpay/verifyRegistrationPayment", {
            ...response,
            email,
          });
        },
        prefill: {
          email,
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
  return (
    <div
      className="bg-red-400 w-50 h-10 flex justify-center items-center mt-5 rounded-2xl"
      onClick={handlePayment}
    >
      Pay registration fees
    </div>
  );
}
