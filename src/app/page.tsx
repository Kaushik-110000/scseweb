"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Head from "next/head";
import Link from "next/link";

export default function ParticleBackground() {
  const [text, setText] = useState("");
  const [glitchText, setGlitchText] = useState("Welcome to SCSE");
  const [glitchVisible, setGlitchVisible] = useState(false);
  const [landingVisible, setLandingVisible] = useState(false);
  const [matrixOpacity, setMatrixOpacity] = useState(1);
  const [animationPlayed, setAnimationPlayed] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  // Custom cursor movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };
    
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (!isTouchDevice) {
      document.addEventListener('mousemove', handleMouseMove);
      return () => document.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);
  
  // Particle animation effect
  useEffect(() => {
    // Initialize the particle animation immediately
    const canvas = document.getElementById('particle-canvas') as HTMLCanvasElement;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles: Particle[] = [];
    const particleCount = window.innerWidth < 768 ? 50 : 100;
    
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 1;
        this.speedY = (Math.random() - 0.5) * 1;
        
        // Color gradient between purple and teal
        const ratio = Math.random();
        const r = Math.floor(110 * ratio + 136 * (1 - ratio));
        const g = Math.floor(69 * ratio + 211 * (1 - ratio));
        const b = Math.floor(226 * ratio + 206 * (1 - ratio));
        this.color = `rgba(${r}, ${g}, ${b}, ${Math.random() * 0.5 + 0.1})`;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
      }
      
      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    function connectParticles() {
      if (!ctx) return;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            const opacity = 1 - distance / 150;
            ctx.strokeStyle = `rgba(110, 69, 226, ${opacity * 0.2})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      
      connectParticles();
      requestAnimationFrame(animate);
    }
    
    animate();
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Initialize animation sequence
  useEffect(() => {
    playAnimation();
  }, []);
  
  // Back navigation detection and handling
  useEffect(() => {
    // Check if we're loading the page directly or navigating back
    if (typeof window !== 'undefined') {
      // Check if this page is being loaded via back navigation
      const handleInitialLoad = () => {
        const navigationType = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigationType && navigationType.type === 'back_forward') {
          // We're coming back to this page, trigger the immediate visibility
          showContentImmediately();
        }
      };
      
      // For modern browsers supporting the Navigation Timing API
      if (typeof window !== "undefined" ) {
  handleInitialLoad();
}

      
      // Also set up a popstate listener for runtime back navigation
      const handlePopState = () => {
        // We only want to handle cases where we're returning to the root path
        if (window.location.pathname === '/') {
          showContentImmediately();
        }
      };
      
      window.addEventListener('popstate', handlePopState);
      return () => {
        window.removeEventListener('popstate', handlePopState);
      };
    }
  }, []);
  
  // Immediately show content when coming back to the page
  const showContentImmediately = () => {
    // Remove any existing animations
    document.body.classList.remove('click-transition');
    
    // Set the reverse transition effect
    document.body.classList.add('reverse-transition');
    
    // Set content to be immediately visible
    setGlitchVisible(false);
    setLandingVisible(true);
    setMatrixOpacity(0.2);
    
    // Set the text content directly without animation
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      setText("Society of Computer\nScience & Engineering");
    } else {
      setText("Society of Computer Science and Engineering");
    }
    
    // Remove the reverse transition class after the animation completes
    setTimeout(() => {
      document.body.classList.remove('reverse-transition');
    }, 800);
  };
  
  const playAnimation = () => {
    // Reset any existing animations
    document.body.classList.remove('click-transition');
    document.body.classList.remove('reverse-transition');
    
    setText("");
    setGlitchText("Welcome to SCSE");
    setGlitchVisible(false);
    setLandingVisible(false);
    setMatrixOpacity(1);
    
    const timer1 = setTimeout(() => {
      setGlitchVisible(true);
      let glitchInterval: NodeJS.Timeout;
      const timer2 = setTimeout(() => {
        const originalText = "Welcome to SCSE";
        glitchInterval = setInterval(() => {
          const randomChars = originalText.split('').map(char => {
            return Math.random() > 0.7 ? 
              String.fromCharCode(Math.floor(Math.random() * 26) + 65) : char;
          }).join('');
          setGlitchText(randomChars);
        }, 100);
        
        const timer3 = setTimeout(() => {
          clearInterval(glitchInterval);
          setMatrixOpacity(0.2);
          setGlitchVisible(false);
          
          const timer4 = setTimeout(() => {
            setLandingVisible(true);
            setAnimationPlayed(true);
            const isMobile = window.innerWidth < 768;
            if (isMobile) {
              typeWriterEffect("Society of Computer\nScience & Engineering", setText, 63);
            } else {
              typeWriterEffect("Society of Computer Science and Engineering", setText, 63);
            }
          }, 700);
          return () => clearTimeout(timer4);
        }, 1000);
        return () => clearTimeout(timer3);
      }, 2000);
      return () => clearTimeout(timer2);
    }, 500);
    return () => clearTimeout(timer1);
  };
  
  const typeWriterEffect = (text: string, setTextFunc: React.Dispatch<React.SetStateAction<string>>, speed: number) => {
    let i = 0;
    setTextFunc("");
    const type = () => {
      if (i < text.length) {
        setTextFunc(prev => text.substring(0, i + 1));
        i++;
        setTimeout(type, speed);
      }
    };
    type();
  };
  
  const handleEnterClick = (e: React.MouseEvent) => {
    e.preventDefault();
    document.body.classList.add('click-transition');
    
    // Store the current state in history
    window.history.pushState({ fromLanding: true }, '', '/home');
    
    setTimeout(() => {
      router.push("/home");
    }, 800);
  };

  return (
    <>
      <Head>
        <title>SCSE - Society of Computer Science and Engineering</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Outfit:wght@400;500;700;800&family=JetBrains+Mono:wght@400;700&family=Orbitron:wght@400;700&display=swap" rel="stylesheet" />
      </Head>
      
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          height: 100vh;
          width: 100vw;
          overflow: hidden;
          background-color: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Space Grotesk', sans-serif;
          position: relative;
          cursor: none;
          transition: background-color 0.3s ease;
        }
        
        @media (pointer: coarse) {
          body {
            cursor: auto;
          }
        }
        
        .click-transition {
          animation: zoomFade 0.8s forwards;
        }
        
        .reverse-transition {
          animation: zoomFadeIn 0.8s forwards;
        }
        
        @keyframes zoomFade {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
        }
        
        @keyframes zoomFadeIn {
          0% { transform: scale(2); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        
        @keyframes flicker {
          0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100% {
            opacity: 0.99;
            filter: drop-shadow(0 0 1px rgba(110, 69, 226, 0.8)) drop-shadow(0 0 5px rgba(110, 69, 226, 0.5));
          }
          20%, 21.999%, 63%, 63.999%, 65%, 69.999% {
            opacity: 0.4;
            filter: none;
          }
        }
        
        @keyframes bounce-button {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes glow-border {
          0% {
            box-shadow: 0 0 5px rgba(110, 69, 226, 0.4),
                       0 0 10px rgba(110, 69, 226, 0.3),
                       0 0 15px rgba(136, 211, 206, 0.2);
          }
          50% {
            box-shadow: 0 0 10px rgba(110, 69, 226, 0.8),
                       0 0 20px rgba(110, 69, 226, 0.6),
                       0 0 30px rgba(136, 211, 206, 0.4);
          }
          100% {
            box-shadow: 0 0 5px rgba(110, 69, 226, 0.4),
                       0 0 10px rgba(110, 69, 226, 0.3),
                       0 0 15px rgba(136, 211, 206, 0.2);
          }
        }
        
        .matrix-glow {
          background-image: radial-gradient(circle at 50% 50%, rgba(136, 211, 206, 0.1), transparent 70%);
        }
        
        .type-text {
          white-space: pre-line;
        }
        
        @media (max-width: 767px) {
          .glitch-title { font-size: 2.5rem !important; }
          .type-title { font-size: 2rem !important; padding: 0 1rem; }
          .enter-button { min-width: 250px !important; min-height: 50px !important; font-size: 1.2rem !important; }
        }
        
        @media (max-width: 374px) {
          .glitch-title { font-size: 2rem !important; }
          .type-title { font-size: 1.5rem !important; }
          .enter-button { min-width: 200px !important; font-size: 1rem !important; }
        }
      `}</style>
      
      <div 
        ref={cursorRef}
        className="fixed w-4 h-4 rounded-full pointer-events-none z-50 mix-blend-screen hidden md:block"
        style={{
          background: 'radial-gradient(circle, rgba(110, 69, 226, 1) 0%, rgba(110, 69, 226, 0.5) 50%, rgba(110, 69, 226, 0) 100%)',
          transform: 'translate(-50%, -50%)'
        }}
      />
      
      {/* Particle Animation Background - Always visible */}
      <canvas id="particle-canvas" className="absolute top-0 left-0 w-full h-full z-0"></canvas>
      
      {/* Glow overlay for better particle visibility */}
      <div 
        className="absolute w-full h-full top-0 left-0 mix-blend-screen pointer-events-none z-20 matrix-glow"
        style={{ animation: 'pulse 4s ease-in-out infinite' }}
      />
      
      {/* Glitch Title "Welcome to SCSE" */}
      <div 
        className={`absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 text-center transition-opacity duration-1000 px-4 ${glitchVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        <h1 
          className="text-transparent text-[4.5rem] font-bold relative tracking-wider glitch-title"
          style={{
            background: 'linear-gradient(120deg, #6e45e2, #88d3ce)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            fontFamily: "'JetBrains Mono', monospace",
            textShadow: '0 0 5px rgba(110, 69, 226, 0.5)',
            animation: 'flicker 3s linear infinite'
          }}
          data-text={glitchText}
        >
          {glitchText}
        </h1>
      </div>
      
      {/* Main Text "Society of Computer Science and Engineering" */}
      <motion.section 
        className="absolute w-full h-full flex flex-col items-center justify-center z-40 px-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={landingVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <h1 
          className="mb-8 text-center type-title type-text text-[4rem]"
          style={{ 
            background: 'linear-gradient(120deg, #6e45e2, #88d3ce)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            filter: 'drop-shadow(0px 0px 5px rgba(110, 69, 226, 0.5))',
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 800
          }}
        >
          {text}
          <span 
            className="animate-blink border-r-[0.15em]" 
            style={{ borderColor: '#6e45e2' }}
          >|</span>
        </h1>
        
        <Link
          href="/home"
          onClick={handleEnterClick}
          className="mt-12 min-w-[300px] min-h-[60px] enter-button inline-flex font-['Orbitron'] text-[1.5rem] items-center justify-center uppercase tracking-wider font-bold bg-transparent rounded-lg shadow-lg transition-all duration-300 relative overflow-hidden no-underline px-6 py-3 hover:text-white hover:shadow-lg hover:-translate-y-1 active:transform active:scale-95 animate-bounce-button"
          style={{ 
            background: 'rgba(110, 69, 226, 0.1)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '2px solid rgba(110, 69, 226, 0.2)',
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.3)',
            color: '#6e45e2',
            animation: 'glow-border 2s ease-in-out infinite, bounce-button 2s ease-in-out infinite',
            position: 'fixed',
            top: '70%',
            fontFamily: "'Orbitron', sans-serif"
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'linear-gradient(120deg,rgb(80, 49, 163),rgb(90, 138, 135))';
            e.currentTarget.style.color = '#010101';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(136, 211, 206, 0.4)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(110, 69, 226, 0.1)';
            e.currentTarget.style.color = '#6e45e2';
            e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.3)';
            e.currentTarget.style.animation = 'glow-border 2s ease-in-out infinite, bounce-button 2s ease-in-out infinite';
          }}
        >
          <span className="relative z-10">Enter The System</span>
        </Link>
      </motion.section>
    </>
  );
}
