import type { Metadata } from "next";
import RefundCancellation from "./racpage";
document.body.style.overflowY = "auto";
export const metadata: Metadata = {
  title: "RefundCancellation - SCSE",
  description: "Refund and Cancellation page of SCSE ",
  icons: {
    icon: "/SCSElogo.svg",
    apple: "/SCSElogo.svg", // Apple devices
    shortcut: "/SCSElogo.svg", // Shortcut icon
  },
};

export default function DashboardPage() {
  return <RefundCancellation />;
}
