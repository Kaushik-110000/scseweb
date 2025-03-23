import type { Metadata } from "next";
import ShipAndDelievery from "./sadpage";

export const metadata: Metadata = {
  title: "Ship And Delievery - SCSE",
  description: "Ship And Delievery page SCSE ",
  icons: {
    icon: "/SCSElogo.svg",
    apple: "/SCSElogo.svg", // Apple devices
    shortcut: "/SCSElogo.svg", // Shortcut icon
  },
};

export default function DashboardPage() {
  return <ShipAndDelievery />;
}
