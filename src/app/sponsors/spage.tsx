"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
export default function Sponsors() {
  const brand = [
    {
      title: "Brand Exposure:",
      text: "Get visibility on social media, event banners, and official merchandise. Connect with top-tier tech talent and future innovators.",
    },
    {
      title: "Targeted Reach:",
      text: "Connect with top teir tech talent and future innovators.",
    },
    {
      title: "Recruitment Edge:",
      text: "Targeted Reach: Access a pool of skilled students for internships and job opportunities.",
    },
    {
      title: "Campus Presence:",
      text: "Strengthen your presence in the academic ecosystem of NIT Jamshedpur.",
    },
    {
      title: "Credibility Boost:",
      text: "Associate your brand with a prestigious technical society.",
    },
    {
      title: "Industry Collaboration:",
      text: "Connect with future tech leaders and create opportunities for collaborative projects and internships.",
    },
  ];
  useEffect(() => {
    document.body.style.overflowY = "auto";
  });

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden pt-10">
      {/* Background image with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1524334228333-0f6db392f8a1?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJsYWNrJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D"
          alt="Background"
          fill
          priority
          className="object-cover opacity-60"
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black/90 z-1"></div>

      {/* Animated particles */}
      <div className="particle-container">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="particle"></div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center space-y-12">
          {/* Main title with animated gradient */}
          <h1 className="title-text text-4xl md:text-5xl lg:text-6xl font-bold text-center">
            OUR SPONSORS AND PARTNERS
          </h1>

          {/* Subtitle with border animation */}
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSclbHWh3OGFRJP31Zic5KFtvQ1QSQ-wOyAnJLbhBM3huR39hw/viewform?usp=header"
            target="_blank"
          >
            <div className="subtitle-container">
              <h2 className="subtitle-text text-xl md:text-2xl font-medium text-gray-300">
                {" "}
                Be Our Sponsors
              </h2>
            </div>
          </a>

          {/* Main description with gradient hover effect */}
          <p className="inner-text max-w-3xl text-center text-lg text-gray-300 leading-relaxed">
            Be at the forefront of innovation! SCSE, the premier event of NIT
            Jamshedpur, where creativity meets cutting-edge technology. By
            sponsoring us, you align your brand with groundbreaking innovations,
            vibrant competitions, and a community of future leaders. Partner
            with us to drive progress, inspire excellence, and be a part of the
            legacy that shapes tomorrow.
          </p>

          {/* Why sponsor us section */}
          <div className="why-sponsor-section w-full max-w-4xl mt-16">
            <h3 className="why-sponsor-title text-3xl font-bold text-center mb-12">
              Why sponsor us?
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {brand.map((item, index) => (
                <div key={index} className="sponsor-card">
                  <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                  <p className="text-gray-300">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Brochure button */}
          <a
            href="/SCSE_brochure.pdf"
            target="_blank"
            className="brochure-button"
            rel="noreferrer"
          >
            Download Brochure
          </a>

          {/* Footer */}
          <div className="mt-16 text-center">
            <p className="text-gray-400 mb-4">For more inquiries</p>
            <a href="/contact" className="contact-button stylea">
              Contact Us
            </a>
          </div>
          <div className="mt-16 text-center">
            <h3 className="text-3xl mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Our Bank Details
            </h3>
            <p className="inner-text max-w-3xl mb-2 text-left text-2xl text-gray-300 leading-relaxed">
              <span className="text-purple-500">Account Name </span>: Society of
              Computer Application <br />
              <span className="text-purple-500">Bank Branch </span>: NIT Campus
              Adityapur
              <br /> <span className="text-purple-500">Account Number </span>:
              35637764271
              <br /> <span className="text-purple-500">IFSC Code </span>:
              SBIN0001882 <br />
              <span className="text-purple-500">CIF </span>: 88953256160
              <br />
              <span className="text-purple-500">QR Scanner </span>: Click on
              fill details below.
            </p>
          </div>
          <div className="mt-16 text-center">
            <p className="max-w-3xl mb-5 text-center text-lg text-gray-300 ">
              If you have supported our event as a sponsor, we sincerely
              appreciate your contribution in making this a success! Kindly fill
              your details here so that we may know you
            </p>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSclbHWh3OGFRJP31Zic5KFtvQ1QSQ-wOyAnJLbhBM3huR39hw/viewform?usp=header"
              className="contact-button"
              target="_blank"
            >
              Fill Details
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .title-text {
          background: linear-gradient(90deg, #60a5fa, #9333ea, #60a5fa);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradient 6s linear infinite;
          text-transform: uppercase;
          letter-spacing: 2px;
          text-shadow: 0 0 20px rgba(186, 36, 206, 0.3);
        }

        @keyframes gradient {
          0% {
            background-position: 0% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        .subtitle-container {
          position: relative;
          padding: 10px 30px;
          border-radius: 8px;
          overflow: hidden;
        }

        .subtitle-container::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border: 2px solid transparent;
          border-radius: 8px;
          background: linear-gradient(90deg, #60a5fa, #9333ea, #60a5fa)
            border-box;
          -webkit-mask: linear-gradient(#fff 0 0) padding-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          animation: borderAnimation 4s linear infinite;
          background-size: 200% auto;
        }

        @keyframes borderAnimation {
          0% {
            background-position: 0% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        .inner-text {
          transition: all 0.3s ease;
        }

        .inner-text:hover {
          background: linear-gradient(
            90deg,
            rgba(186, 36, 206, 0.1),
            rgba(255, 117, 140, 0.1)
          );
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
          border-radius: 8px;
          padding: 20px;
        }

        .why-sponsor-title {
          position: relative;
          display: inline-block;
          background: linear-gradient(90deg, #60a5fa, #9333ea, #60a5fa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          padding: 0 20px;
        }

        .why-sponsor-title::after {
          content: "";
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
          height: 3px;
          background: linear-gradient(90deg, #60a5fa, #9333ea, #60a5fa);
          border-radius: 3px;
        }

        .sponsor-card {
          background: rgba(30, 30, 30, 0.6);
          backdrop-filter: blur(5px);
          border-radius: 12px;
          padding: 24px;
          transition: all 0.3s ease;
          border: 1px solid rgba(186, 36, 206, 0.2);
          height: 100%;
        }

        .sponsor-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 15px 30px rgba(186, 36, 206, 0.2);
          border-color: rgba(255, 117, 140, 0.4);
        }

        .sponsor-card h4 {
          background: linear-gradient(90deg, #60a5fa, #9333ea, #60a5fa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .brochure-button,
        .contact-button {
          position: relative;
          display: inline-block;
          padding: 12px 30px;
          background: linear-gradient(90deg, #60a5fa, #9333ea, #60a5fa);
          color: white;
          font-weight: bold;
          border-radius: 30px;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 5px 15px rgba(186, 36, 206, 0.3);
          overflow: hidden;
          z-index: 1;
        }

        .brochure-button::before,
        .contact-button::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, #ff758c, #ba24ce);
          z-index: -1;
          transition: opacity 0.3s ease;
          opacity: 0;
        }

        .brochure-button:hover,
        .contact-button:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(186, 36, 206, 0.5);
        }

        .brochure-button:hover::before,
        .contact-button:hover::before {
          opacity: 1;
        }

        .brochure-button:active,
        .contact-button:active {
          transform: translateY(0);
        }

        .particle-container {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 2;
        }

        .particle {
          position: absolute;
          width: 6px;
          height: 6px;
          background: linear-gradient(90deg, #60a5fa, #9333ea, #60a5fa);
          border-radius: 50%;
          opacity: 0.3;
          animation: float 15s infinite linear;
        }

        .particle:nth-child(1) {
          top: 10%;
          left: 20%;
          animation-duration: 15s;
          animation-delay: 0s;
        }
        .particle:nth-child(2) {
          top: 20%;
          left: 80%;
          animation-duration: 25s;
          animation-delay: 2s;
        }
        .particle:nth-child(3) {
          top: 30%;
          left: 45%;
          animation-duration: 18s;
          animation-delay: 4s;
        }
        .particle:nth-child(4) {
          top: 40%;
          left: 15%;
          animation-duration: 22s;
          animation-delay: 6s;
        }
        .particle:nth-child(5) {
          top: 50%;
          left: 70%;
          animation-duration: 20s;
          animation-delay: 8s;
        }
        .particle:nth-child(6) {
          top: 60%;
          left: 30%;
          animation-duration: 16s;
          animation-delay: 10s;
        }
        .particle:nth-child(7) {
          top: 70%;
          left: 65%;
          animation-duration: 24s;
          animation-delay: 12s;
        }
        .particle:nth-child(8) {
          top: 80%;
          left: 50%;
          animation-duration: 19s;
          animation-delay: 14s;
        }
        .particle:nth-child(9) {
          top: 85%;
          left: 25%;
          animation-duration: 21s;
          animation-delay: 16s;
        }
        .particle:nth-child(10) {
          top: 90%;
          left: 90%;
          animation-duration: 17s;
          animation-delay: 18s;
        }
        .particle:nth-child(11) {
          top: 15%;
          left: 10%;
          animation-duration: 23s;
          animation-delay: 1s;
        }
        .particle:nth-child(12) {
          top: 25%;
          left: 60%;
          animation-duration: 26s;
          animation-delay: 3s;
        }
        .particle:nth-child(13) {
          top: 35%;
          left: 35%;
          animation-duration: 14s;
          animation-delay: 5s;
        }
        .particle:nth-child(14) {
          top: 45%;
          left: 85%;
          animation-duration: 27s;
          animation-delay: 7s;
        }
        .particle:nth-child(15) {
          top: 55%;
          left: 5%;
          animation-duration: 15s;
          animation-delay: 9s;
        }
        .particle:nth-child(16) {
          top: 65%;
          left: 75%;
          animation-duration: 18s;
          animation-delay: 11s;
        }
        .particle:nth-child(17) {
          top: 75%;
          left: 40%;
          animation-duration: 20s;
          animation-delay: 13s;
        }
        .particle:nth-child(18) {
          top: 5%;
          left: 55%;
          animation-duration: 22s;
          animation-delay: 15s;
        }
        .particle:nth-child(19) {
          top: 95%;
          left: 15%;
          animation-duration: 24s;
          animation-delay: 17s;
        }
        .particle:nth-child(20) {
          top: 50%;
          left: 50%;
          animation-duration: 19s;
          animation-delay: 19s;
        }

        @keyframes float {
          0% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0.3;
          }
          25% {
            transform: translateY(-100px) translateX(50px) scale(1.2);
            opacity: 0.5;
          }
          50% {
            transform: translateY(-200px) translateX(-50px) scale(0.8);
            opacity: 0.7;
          }
          75% {
            transform: translateY(-300px) translateX(100px) scale(1.1);
            opacity: 0.4;
          }
          100% {
            transform: translateY(-400px) translateX(-100px) scale(0.9);
            opacity: 0.2;
          }
        }
      `}</style>
    </div>
  );
}
