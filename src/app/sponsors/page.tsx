"use client"
import Image from "next/image"
import './Sponsors2.css'
export default function Sponsors() {
  const brand=[
    {
      title: "Brand Exposure:",
      text: "Get visibility on social media, event banners, and official merchandise. Connect with top-tier tech talent and future innovators.",
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
  ]
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1524334228333-0f6db392f8a1?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJsYWNrJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D"
          alt="Background"
          fill
          priority
          className="object-cover opacity-60"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black/90 z-1"></div>

      <div className="particle-container">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="particle"></div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center space-y-12">

          <h1 className="title-text text-4xl md:text-5xl lg:text-6xl font-bold text-center">
            OUR SPONSORS AND PARTNERS
          </h1>

          <div className="subtitle-container">
            <h2 className="subtitle-text text-xl md:text-2xl font-medium text-gray-300">Be Our Sponsors</h2>
          </div>

          <p className="inner-text max-w-3xl text-center text-lg text-gray-300 leading-relaxed">
            Be at the forefront of innovation! SCSE, the premier event of NIT Jamshedpur, where creativity meets
            cutting-edge technology. By sponsoring us, you align your brand with groundbreaking innovations, vibrant
            competitions, and a community of future leaders. Partner with us to drive progress, inspire excellence, and
            be a part of the legacy that shapes tomorrow.
          </p>

          <div className="why-sponsor-section w-full max-w-4xl mt-16">
            <h3 className="why-sponsor-title text-3xl font-bold text-center mb-12">Why sponsor us?</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {brand.map((item, index) => (
                <div key={index} className="sponsor-card">
                  <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                  <p className="text-gray-300">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <a href="/SCSE_brochure.pdf" target="_blank" className="brochure-button" rel="noreferrer">
            Download Brochure
          </a>

          <div className="mt-16 text-center">
            <p className="text-gray-400 mb-4">For more inquiries</p>
            <a href="/contact" className="contact-button">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

