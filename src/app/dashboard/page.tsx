import type { Metadata } from "next";
import Dashboard from "./dashboardclient";

export const metadata: Metadata = {
  title: "Dashboard - SCSE",
  description: "Welcome to the SCSE Dashboard",
  icons: {
    icon: "/SCSElogo.svg",
    apple: "/SCSElogo.svg", // Apple devices
    shortcut: "/SCSElogo.svg", // Shortcut icon
  },
};

export default function DashboardPage() {
  return <Dashboard />;
}
