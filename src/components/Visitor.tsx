import { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function VisitorCounter() {
  const [count, setCount] = useState<number>(0);
  const countRef = useRef<HTMLElement | null>(null);
  const observerRef = useRef<HTMLDivElement | null>(null); // Ref for the observer

  useEffect(() => {
    // Fetch data only once
    const fetchData = async () => {
      try {
        const response = await axios.post<{ count: number }>("/api/visitor");
        setCount(response.data.count);
      } catch (error) {
        console.error("Error fetching visitor count:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateCount(0, count); // Trigger animation when visible
        }
      },
      { threshold: 0.6 } // Trigger when 60% visible
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [count]); // Runs every time `count` changes (which happens only once after fetching)

  const animateCount = (start: number, end: number) => {
    const current = start;
    const duration = 1000;
    const startTime = performance.now();

    const updateCounter = (timestamp: number) => {
      const elapsedTime = timestamp - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const newValue = Math.floor(start + progress * (end - start));

      if (countRef.current) {
        countRef.current.textContent = newValue.toLocaleString();
      }

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };

    requestAnimationFrame(updateCounter);
  };

  return (
    <div
      ref={observerRef}
      className="mb-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3"
    >
      {/* Icon & SVG */}
      <div className="flex items-center gap-1 sm:gap-2">
        <span className="text-2xl">🌍</span>
        <img
          src="/visitor.svg"
          className="h-12 w-20 sm:w-40 hidden sm:inline-block"
          alt="Visitor Icon"
        />
        <span className="text-2xl inline-block sm:hidden">Visitors</span>
        <span className="text-2xl">:</span>
      </div>

      {/* Count Display */}
      <span ref={countRef} className="text-2xl font-bold">
        {count.toLocaleString()}
      </span>
    </div>
  );
}
