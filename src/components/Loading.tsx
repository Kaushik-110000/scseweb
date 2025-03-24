import React from "react";
import { motion, Variants } from "framer-motion";

function Loading() {
  const orbVariants: Variants = {
    initial: { scale: 0, rotate: 0 },
    animate: {
      scale: [0.8, 1, 0.8],
      rotate: [0, 180, 360],
      background: [
        "linear-gradient(0deg, #3b82f6 0%, #8b5cf6 50%)",
        "linear-gradient(180deg, #3b82f6 0%, #8b5cf6 50%)",
        "linear-gradient(360deg, #3b82f6 0%, #8b5cf6 50%)",
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const particleVariants: Variants = {
    initial: { scale: 0, opacity: 0 },
    animate: (i: number) => ({
      scale: [0, 1, 0],
      opacity: [0, 1, 0],
      transition: {
        delay: i * 0.1,
        duration: 1.5,
        repeat: Infinity,
        repeatType: "loop" as const,
      },
    }),
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black/90 backdrop-blur-sm">
      <motion.div
        className="relative w-24 h-24 rounded-full shadow-2xl shadow-blue-500/30"
        variants={orbVariants}
        initial="initial"
        animate="animate"
      >
        <div className="absolute inset-0 rounded-full border-2 border-blue-400/30 blur-sm" />

        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-400 rounded-full"
            custom={i}
            variants={particleVariants}
            initial="initial"
            animate="animate"
            style={{
              top: `${Math.cos((i * 45 * Math.PI) / 180) * 40 + 40}%`,
              left: `${Math.sin((i * 45 * Math.PI) / 180) * 40 + 40}%`,
            }}
          />
        ))}
      </motion.div>

      <motion.div
        className="absolute bottom-1/3 text-blue-200 font-light text-lg"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: "mirror" as const,
        }}
      >
        Loading...
      </motion.div>

      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            initial={{
              scale: 0,
              x: `${Math.random() * 100 - 50}%`,
              y: `${Math.random() * 100 - 50}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Loading;
