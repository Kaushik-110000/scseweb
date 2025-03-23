import type { Metadata } from "next";
import PrivacyPolicy from "./pppage";

export const metadata: Metadata = {
  title: "PrivacyPolicy - SCSE",
  description: "Privacyand Policy of SCSE ",
  icons: {
    icon: "/SCSElogo.svg",
    apple: "/SCSElogo.svg", // Apple devices
    shortcut: "/SCSElogo.svg", // Shortcut icon
  },
};

export default function DashboardPage() {
  return <PrivacyPolicy />;
}
