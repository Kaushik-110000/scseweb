"use client";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Page() {
  return (
    <div className="flex flex-col">
      {/* Header with Navigation */}
      <header className="bg-gray-800 text-white p-4">
        <nav className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-lg font-bold mb-2 md:mb-0">Advaya 2025</div>
          <div className="flex flex-wrap gap-4">
            <Link href="/termsandconditions">
              <p className="hover:text-blue-400 ">Terms &amp; Conditions</p>
            </Link>
            <Link href="/contact">
              <p className="hover:text-blue-400">Contact</p>
            </Link>
            <Link href="/privacypolicy">
              <p className="hover:text-blue-400">Privacy Policy</p>
            </Link>
            <Link href="/refundandcancellation">
              <p className="hover:text-blue-400">Refund &amp; Cancellation</p>
            </Link>
            <Link href="/shippinganddelievery">
              <p className="hover:text-blue-400">Shipping &amp; Delivery</p>
            </Link>
          </div>
        </nav>
      </header>
      {/* Footer */}
      <footer className="relative bg-gray-900 text-white py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          {/* Left Section - Logo & About */}
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-3xl font-bold text-blue-400">Advaya 2025</h2>
            <p className="mt-2 mx-2 text-gray-400">
              Innovate. Create. Dominate. Join the biggest tech event of the
              year!
            </p>
          </div>

          {/* Center Section - Quick Links */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Link href="/termsandconditions">
              <p className="text-gray-300 hover:text-blue-400">
                Terms &amp; Conditions
              </p>
            </Link>
            <Link href="/contact">
              <p className="text-gray-300 hover:text-blue-400">Contact</p>
            </Link>
            <Link href="/privacypolicy">
              <p className="text-gray-300 hover:text-blue-400">
                Privacy Policy
              </p>
            </Link>
            <Link href="/refundandcancellation">
              <p className="text-gray-300 hover:text-blue-400">
                Refund &amp; Cancellation
              </p>
            </Link>
            <Link href="/shippinganddelievery">
              <p className="text-gray-300 hover:text-blue-400">
                Shipping &amp; Delivery
              </p>
            </Link>
          </div>

          {/* Right Section - Social Icons */}
          <div className="flex gap-4 mt-6 md:mt-0">
            <a href="#" className="hover:text-blue-400 transition duration-300">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="#" className="hover:text-blue-400 transition duration-300">
              <Twitter className="w-6 h-6" />
            </a>
            <a href="#" className="hover:text-blue-400 transition duration-300">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="#" className="hover:text-blue-400 transition duration-300">
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="text-center text-gray-500 text-sm mt-8 border-t border-gray-700 pt-4">
          © 2025 TechFest. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
