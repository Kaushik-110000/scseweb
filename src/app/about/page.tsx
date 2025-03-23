import type { Metadata } from "next";
import Page from "./apage";

export const metadata: Metadata = {
  title: "About SCSE",
  description: "Welcome to the SCSE about us",
  icons: {
    icon: "/SCSElogo.svg",
    apple: "/SCSElogo.svg", // Apple devices
    shortcut: "/SCSElogo.svg", // Shortcut icon
  },
};

export default function DashboardPage() {
  return <Page />;
}
