import type { Metadata } from "next";
import Gallery from "./gpage";

export const metadata: Metadata = {
  title: "Gallery - SCSE",
  description: "Welcome to the SCSE Gallery",
  icons: {
    icon: "/SCSElogo.svg",
    apple: "/SCSElogo.svg", // Apple devices
    shortcut: "/SCSElogo.svg", // Shortcut icon
  },
};

export default function DashboardPage() {
  return <Gallery />;
}
