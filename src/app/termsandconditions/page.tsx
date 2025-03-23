import type { Metadata } from "next";
import TermsAndConditions from "./tacpage";

export const metadata: Metadata = {
  title: "TermsAndConditions - SCSE",
  description: "Terms And Conditions SCSE ",
  icons: {
    icon: "/SCSElogo.svg",
    apple: "/SCSElogo.svg", // Apple devices
    shortcut: "/SCSElogo.svg", // Shortcut icon
  },
};

export default function DashboardPage() {
  return <TermsAndConditions />;
}
