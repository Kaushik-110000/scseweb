import type { Metadata } from "next";
import ContactPage from "./cpage";

export const metadata: Metadata = {
  title: "ContactPage - SCSE",
  description: "Welcome to the SCSE Contact Page",
  icons: {
    icon: "/SCSElogo.svg",
    apple: "/SCSElogo.svg", // Apple devices
    shortcut: "/SCSElogo.svg", // Shortcut icon
  },
};

export default function DashboardPage() {
  return <ContactPage />;
}
