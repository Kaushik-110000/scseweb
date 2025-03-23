import React from 'react';
import './page.css';

import 'boxicons/css/boxicons.min.css';

function Sponsors() {
  return (
    <div className="page-container">
      <div className="bg-image" />
      {/* Main content */}
      <div className="relative z-10 text-white flex flex-col justify-center items-center h-full px-4">
        <div className="title">OUR SPONSORS AND PARTNERS</div>
        <div className="subtitle">Be Our Sponsors</div>
        <div className="innertext" style={{ marginTop: "50px" }}>
          Be at the forefront of innovation! SCSE, the premier event of NIT Jamshedpur, where creativity meets cutting-edge technology. By sponsoring us, you align your brand with groundbreaking innovations, vibrant competitions, and a community of future leaders. Partner with us to drive progress, inspire excellence, and be a part of the legacy that shapes tomorrow.
        </div>
        <div className="whysponsorus">
          <div id="whysponsortitle">Why sponsor us?</div>

          <div className="whysponsortext">
            <p className="whysponsortexttitle">Brand Exposure:</p> Get visibility on social media, event banners, and official merchandise.
            Connect with top-tier tech talent and future innovators.
          </div>
          <div className="whysponsortext">
            <p className="whysponsortexttitle">Recruitment Edge:</p> Targeted Reach: Access a pool of skilled students for internships and job opportunities.
          </div>
          <div className="whysponsortext">
            <p className="whysponsortexttitle">Campus Presence:</p> Strengthen your presence in the academic ecosystem of NIT Jamshedpur.
          </div>
          <div className="whysponsortext">
            <p className="whysponsortexttitle">Credibility Boost:</p> Associate your brand with a prestigious technical society.
          </div>
          <div className="whysponsortext">
            <p className="whysponsortexttitle">Industry Collaboration:</p> Connect with future tech leaders and create opportunities for collaborative projects and internships.
          </div>

        </div>

        <button className="download-brochure-button">
          <a href="/SCSE BROCHURE (1).pdf" target="_blank" rel="noopener noreferrer">
            <i className="bx bxs-download download-icon" style={{ marginRight: "10px" }}></i>
            Brochure
          </a>
        </button>

        <div className="footer">
          <p>For more enquires</p> <a href="/contact"><button id="contactusbtn">Contact Us</button></a>
        </div>
      </div>
    </div>
  );
}

export default Sponsors;


