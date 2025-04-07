"use client";

import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { UserContext } from "@/context/UserContext";

// Lucide icons
import {
  Home,
  Info,
  Calendar,
  ImageIcon,
  WalletCards,
  Mail,
  LogIn,
  UserPlus,
  LayoutDashboard,
  MessageCircle,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { userData } = useContext(UserContext);

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Add a "glass/blur" effect when scrolling
  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 0);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hide navbar if on the landing page ("/")
  if (pathname === "/") return null;

  // Checks if a given href is the active route
  const isActiveLink = (href: any) => pathname === href;

  // Base styling for all links
  const baseLinkClasses =
    "relative flex items-center gap-2 transition-all duration-300 transform";

  // Active link container styling:
  // - Slight scale
  // - White ring around
  // - Rounded corners
  // - Some padding for aesthetics
  const activeContainerClasses =
    "scale-105 ring-1 ring-white rounded-full px-2 py-1";

  // Hover effect for non-active links
  const hoverContainerClasses =
    "hover:scale-120 hover:p-2 hover:rounded-2xl  hover:bg-white/10";

  // Icon color changes if active; text remains white
  const getIconClass = (active: any) =>
    active ? "text-purple-500" : "text-inherit";

  // We keep the text always white
  const textClass = "text-white";

  // Define nav items (desktop + mobile)
  const navItems = [
    { href: "/home", label: "Home", Icon: Home },
    { href: "/about", label: "About", Icon: Info },
    { href: "/events", label: "Events", Icon: Calendar },
    { href: "/gallery", label: "Gallery", Icon: ImageIcon },
    { href: "/sponsors", label: "Sponsors", Icon: WalletCards },
    { href: "/contact", label: "Contact", Icon: Mail },
    {
      href: "https://chat.whatsapp.com/IHwesDcS08RAVDGHPUb0bp",
      label: "Whatsapp",
      Icon: MessageCircle,
    },
  ];

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`
          fixed top-0 left-0 w-full z-5000 
          text-white py-4 px-6 flex justify-between items-center
          transition-colors duration-300
          
          ${
            isScrolled
              ? "bg-gradient-to-b from-transparent to-black/40 backdrop-blur-md"
              : "bg-transparent"
          }
        `}
      >
        <div className="flex w-screen flex-row justify-between">
          {/* LOGO */}
          {pathname === "/" || pathname === "/home" ? (
            <Link href={"/home"}>
              <h1 className="text-2xl font-bold tracking-wider">SCSE</h1>
            </Link>
          ) : (
            <Link href={"/home"}>
              <Image
                src={"/logo.png"}
                alt="SCSE"
                height={30}
                width={30}
              ></Image>
            </Link>
          )}
          {/* DESKTOP LINKS */}
          <div className="hidden lg:flex space-x-8">
            {navItems.map(({ href, label, Icon }) => {
              const active = isActiveLink(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`
                  ${baseLinkClasses}
                  ${active ? activeContainerClasses : hoverContainerClasses}
                `}
                >
                  <Icon className={`w-5 h-5 ${getIconClass(active)}`} />
                  <span className={textClass}>{label}</span>
                </Link>
              );
            })}
          </div>
          <div className="hidden lg:flex lg:flex-row justify-between w-48">
            {/* Conditionally render userData-based links */}
            {!userData ? (
              <>
                <Link
                  href="/login"
                  className={`
                  ${baseLinkClasses}
                  ${
                    isActiveLink("/login")
                      ? activeContainerClasses
                      : hoverContainerClasses
                  }
                `}
                >
                  <LogIn
                    className={`w-5 h-5 ${getIconClass(
                      isActiveLink("/login")
                    )}`}
                  />
                  <span className={textClass}>Login</span>
                </Link>

                <Link
                  href="/register"
                  className={`
                  ${baseLinkClasses}
                  ${
                    isActiveLink("/register")
                      ? activeContainerClasses
                      : hoverContainerClasses
                  }
                `}
                >
                  <UserPlus
                    className={`w-5 h-5 ${getIconClass(
                      isActiveLink("/register")
                    )}`}
                  />
                  <span className={textClass}>Register</span>
                </Link>
              </>
            ) : (
              <Link
                href="/dashboard"
                className={`
                ${baseLinkClasses}
                ${
                  isActiveLink("/dashboard")
                    ? activeContainerClasses
                    : hoverContainerClasses
                }
              `}
              >
                <LayoutDashboard
                  className={`w-5 h-5 ${getIconClass(
                    isActiveLink("/dashboard")
                  )}`}
                />
                <span className={textClass}>Dashboard</span>
              </Link>
            )}
          </div>
        </div>

        {/* MOBILE MENU ICON (Hamburger) */}
        <div className="lg:hidden">
          <Image
            src="/navbar.svg"
            alt="Menu"
            width={24}
            height={24}
            className="cursor-pointer"
            onClick={() => setIsOpen(true)}
          />
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/90 z-[9999] flex flex-col items-center justify-center lg:hidden">
          {/* CLOSE BUTTON */}
          <button
            className="absolute top-6 right-6 text-white text-3xl"
            onClick={() => setIsOpen(false)}
          >
            &times;
          </button>

          {/* MOBILE LINKS */}
          <div className="flex flex-col items-center gap-8">
            {navItems.map(({ href, label, Icon }) => {
              const active = isActiveLink(href);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className={`
                    ${baseLinkClasses}
                    text-2xl
                    ${active ? activeContainerClasses : hoverContainerClasses}
                  `}
                >
                  <Icon className={`w-6 h-6 ${getIconClass(active)}`} />
                  <span className={textClass}>{label}</span>
                </Link>
              );
            })}

            {!userData ? (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className={`
                    ${baseLinkClasses}
                    text-2xl
                    ${
                      isActiveLink("/login")
                        ? activeContainerClasses
                        : hoverContainerClasses
                    }
                  `}
                >
                  <LogIn
                    className={`w-6 h-6 ${getIconClass(
                      isActiveLink("/login")
                    )}`}
                  />
                  <span className={textClass}>Login</span>
                </Link>

                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className={`
                    ${baseLinkClasses}
                    text-2xl
                    ${
                      isActiveLink("/register")
                        ? activeContainerClasses
                        : hoverContainerClasses
                    }
                  `}
                >
                  <UserPlus
                    className={`w-6 h-6 ${getIconClass(
                      isActiveLink("/register")
                    )}`}
                  />
                  <span className={textClass}>Register</span>
                </Link>
              </>
            ) : (
              <Link
                href="/dashboard"
                onClick={() => setIsOpen(false)}
                className={`
                  ${baseLinkClasses}
                  text-2xl
                  ${
                    isActiveLink("/dashboard")
                      ? activeContainerClasses
                      : hoverContainerClasses
                  }
                `}
              >
                <LayoutDashboard
                  className={`w-6 h-6 ${getIconClass(
                    isActiveLink("/dashboard")
                  )}`}
                />
                <span className={textClass}>Dashboard</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}
