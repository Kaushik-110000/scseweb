import React from "react";
import { motion } from "framer-motion";

function Loading() {
  return (
    <div className="flex justify-center items-center h-screen bg-black/40">
      <motion.div
        className="w-20 h-20 bg-white rounded-full"
        initial={{ scale: 0 }}
        animate={{ scale: [0.8, 1, 0.8] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

export default Loading;
