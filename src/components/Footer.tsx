"use client";
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  CopyPlus,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

export default function Page() {
  return (
    <div className="relative flex flex-col ">
      {/* Unique Navbar */}
      {/* <header className="bg-gradient-to-r from-gray-900 to-blue-900 text-white shadow-xl">
        <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between">
          <div className="text-2xl font-bold mb-4 md:mb-0">
            <span className="text-blue-400">SCSE</span> 2025
          </div>
          <div className="flex flex-wrap gap-6 text-sm font-medium">
            <Link
              href="/home"
              className="hover:text-blue-400 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="hover:text-blue-400 transition-colors"
            >
              About
            </Link>
            <Link
              href="/events"
              className="hover:text-blue-400 transition-colors"
            >
              Events
            </Link>
            <Link
              href="/schedule"
              className="hover:text-blue-400 transition-colors"
            >
              Schedule
            </Link>
            <Link
              href="/sponsors"
              className="hover:text-blue-400 transition-colors"
            >
              Sponsors
            </Link>
          </div>
        </nav>
      </header> */}

      {/* Main Content would go here */}

      {/* Enhanced Footer */}
      <footer className="bg-black/40 text-white mt-auto ">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Section - Logo, Description & Social */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-blue-400">SCSE 2025</h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                Innovate. Create. Dominate. Join the biggest tech event of the
                year!
              </p>
              <div className="flex space-x-4">
                {/* <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Facebook size={20} />
                </a> */}
                {/* <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Twitter size={20} />
                </a> */}
                <a
                  href="https://www.instagram.com/scse.nitjsr/"
                  target="_blank"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="https://www.scse-nitjsr.in/"
                  target="_blank"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <CopyPlus size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/company/scse-nitjsr/"
                  target="_blank"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>

            {/* Middle Section - Quick Links in columns */}
            <div className="md:col-span-2 lg:col-span-1">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="text-blue-400 font-semibold mb-3">
                    Quick Links
                  </h3>
                  <Link
                    href="/termsandconditions"
                    className="block text-gray-400 hover:text-blue-400 text-sm"
                  >
                    Terms & Conditions
                  </Link>
                  <Link
                    href="/contact"
                    className="block text-gray-400 hover:text-blue-400 text-sm"
                  >
                    Contact
                  </Link>
                  <Link
                    href="/privacypolicy"
                    className="block text-gray-400 hover:text-blue-400 text-sm"
                  >
                    Privacy Policy
                  </Link>
                </div>
                <div className="space-y-2">
                  <h3 className="text-blue-400 font-semibold mb-3">&nbsp;</h3>
                  <Link
                    href="/refundandcancellation"
                    className="block text-gray-400 hover:text-blue-400 text-sm"
                  >
                    Refund & Cancellation
                  </Link>
                  <Link
                    href="/shippinganddelievery"
                    className="block text-gray-400 hover:text-blue-400 text-sm"
                  >
                    Shipping & Delivery
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Section - Contact Information */}
            <div className="space-y-4">
              <h3 className="text-blue-400 font-semibold">Contact Us</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  <p>National Institute of Technology Jamshedpur,</p>
                </div>
                <p>Adityapur, Jamshedpur,</p>
                <p>Jharkhand 831014</p>
                <div className="flex items-center gap-2 mt-3">
                  <Phone className="w-4 h-4 text-blue-400" />
                  <a href="tel:+919118841006" className="hover:text-blue-400">
                    +91 91188 41006
                  </a>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <Phone className="w-4 h-4 text-blue-400" />
                  <a href="tel:+919798687024" className="hover:text-blue-400">
                    +91 97986 87024
                  </a>
                </div>
                <div className="flex flex-col mb-1">
                  <div className="flex items-center mb-1 gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-mail w-4 h-4 text-blue-400"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </svg>
                    <a
                      href="mailto:amrishrock2002@@gmail.com"
                      className="hover:text-blue-400"
                    >
                      amrishrock2002@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-mail w-4 h-4 text-blue-400"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </svg>
                    <a
                      href="mailto:abhishekscsenitjsr@gmail.com"
                      className="hover:text-blue-400"
                    >
                      abhishekscsenitjsr@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-400">
            © 2025 TechFest. All rights reserved. | Designed by SCSE Web Team
          </div>
        </div>
      </footer>
    </div>
  );
}
