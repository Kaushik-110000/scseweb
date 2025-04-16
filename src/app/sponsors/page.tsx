import type { Metadata } from "next";
import Sponsors from "./spage";
document.body.style.overflowY = "auto";
export const metadata: Metadata = {
  title: "Sponsors - SCSE",
  description: "Welcome to the SCSE sponsors page",
  icons: {
    icon: "/logoB.png",
    apple: "/logoB.png", // Apple devices
    shortcut: "/logoB.png", // Shortcut icon
  },
};

export default function DashboardPage() {
  return <Sponsors />;
}
