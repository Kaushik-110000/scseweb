import type { Metadata } from "next";
import Page from "./epage";

export const metadata: Metadata = {
  title: "Events - SCSE",
  description: "Welcome to the SCSE Events page",
  icons: {
    icon: "/SCSElogo.svg",
    apple: "/SCSElogo.svg", // Apple devices
    shortcut: "/SCSElogo.svg", // Shortcut icon
  },
};

export default function DashboardPage() {
  return <Page />;
}
