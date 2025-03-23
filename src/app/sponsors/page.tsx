"use client"
import React, { useEffect } from 'react';
import Image from 'next/image';
import './Sponsors2.css';

function Sponsors() {
  return (




    <div className="relative min-h-screen bg-black text-white">
      {/* Background image with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1524334228333-0f6db392f8a1?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJsYWNrJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D"
          alt="Background"
          fill
          priority
          className="object-cover"
        />
      </div>

      <div className="body">
        <div className="title">OUR SPONSORS AND PARTNERS</div>
        <div className="subtitle">Be Our Sponsors</div>
        <div className="innertext" style={{ marginTop: "50px" }}>
            Be at the forefront of innovation! SCSE, the premier event of NIT Jamshedpur, where creativity meets cutting-edge technology. By    sponsoring us, you align your brand with groundbreaking innovations, vibrant competitions, and a community of future leaders. Partner with us to drive progress, inspire excellence, and be a part of the legacy that shapes tomorrow.
        </div>

        <div className="whysponsorus">
          <div id="whysponsortitle">Why sponsor us?</div>

          <div className="whysponsortext">
            <p className="whysponsortexttitle">Brand Exposure:</p> Get visibility on social media, event banners, and official merchandise.
            Connect with top-tier tech talent and future innovators.
          </div>

          <div className="whysponsortext">
            <p className="whysponsortexttitle">Recruitment Edge:</p> Targeted Reach: Access a pool of   skilled students for internships and job opportunities.
          </div>

          <div className="whysponsortext">
            <p className="whysponsortexttitle">Campus Presence:</p> Strengthen your presence in the    academic ecosystem of NIT Jamshedpur.
          </div>

          <div className="whysponsortext">
            <p className="whysponsortexttitle">Credibility Boost:</p> Associate your brand with a   prestigious technical society.
          </div>

          <div className="whysponsortext">
            <p className="whysponsortexttitle">Industry Collaboration:</p> Connect with future tech     leaders and create opportunities for collaborative projects and internships.
          </div>
        </div>

        <button className="download-brochure-button">
          <a href="/SCSE_brochure.pdf" target="_blank">Brochure</a>
        </button>

        <div className="footer">
          <p>For more inquiries</p>
          <div className="contactUsBtn">
            <a href="/contact">Contact Us</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sponsors;
