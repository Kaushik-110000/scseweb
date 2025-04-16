"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import "./Gallery.css";
document.body.style.overflowY = "auto";
function Gallery() {
  // Sample data for past events
  const events = [
    {
      id: 1,
      image: "/images/Squid_game.jpg",
      title: "Squid Game",
      date: "9 FEB, 2025",
      description:
        "Intense 2-round challenge where both tech & non-tech questions will push your limits!",
    },
    {
      id: 2,
      image: "/images/cricket2024.webp",
      title: "SCSE Premier League - Season 2",
      date: "FEB, 2025",
      description:
        "Ultimate cricket showdown as teams compete for glory in the second season of the SCSE Premier League!",
    },
    {
      id: 3,
      image: "/images/scavenger_hunt.jpg",
      title: "Scavenger Hunt",
      date: "2024",
      description:
        "A thrilling adventure where participants solve clues, explore the campus, and race against time to win exciting rewards.",
    },
    {
      id: 4,
      image: "/images/Dodgeball.jpeg",
      title: "Dodgeball",
      date: "2024",
      description:
        "Fast-paced and action-packed dodgeball tournament where agility and teamwork lead to victory.",
    },
    {
      id: 5,
      image: "/images/Cricket2023.jpg",
      title: "SCSE Premier League - Season 1",
      date: "2024",
      description:
        "The inaugural season of our highly anticipated cricket tournament, bringing intense competition and unforgettable moments.",
    },
    {
      id: 6,
      image: "/images/kodi_yatava.jpg",
      title: "Kodi Yatava",
      date: "2024",
      description: "Beyond coding.",
    },
  ];

  // Add scroll reveal animation
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all gallery items
    const galleryItems = document.querySelectorAll(".gallery-item");
    galleryItems.forEach((item) => {
      observer.observe(item);
    });

    return () => {
      galleryItems.forEach((item) => {
        observer.unobserve(item);
      });
    };
  }, []);
  
  document.body.style.overflowY = "auto";

  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* Background image with enhanced gradient overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://plus.unsplash.com/premium_photo-1667119474172-812ae69ae694?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Gallery Background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-[#1a1033]/80 to-black/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 py-20">
        {/* Added Font links */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700;800&family=Inter:wght@400;500&display=swap"
        />

        <h1 className="gallery-title">Gallery</h1>

        <div className="gallery-grid">
          {events.map((event) => (
            <div key={event.id} className="gallery-item">
              <div className="glass-card">
                <img
                  src={event.image}
                  alt={event.title}
                  className="event-image"
                />
                <div className="event-details">
                  <h3>{event.title}</h3>
                  <p className="event-date">{event.date}</p>
                  <p className="event-description">{event.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Gallery;
