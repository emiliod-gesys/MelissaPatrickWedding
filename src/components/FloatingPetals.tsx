"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

export function FloatingPetals() {
  const petals = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: `${(i * 5.5 + 3) % 100}%`,
        delay: (i * 0.4) % 5,
        duration: 8 + (i % 5),
        size: 6 + (i % 4) * 2,
      })),
    [],
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute rounded-full bg-gold/20"
          style={{
            left: petal.left,
            width: petal.size,
            height: petal.size,
            top: "-5%",
          }}
          animate={{
            y: ["0vh", "110vh"],
            x: [0, Math.sin(petal.id) * 40, 0],
            rotate: [0, 360],
            opacity: [0, 0.6, 0.6, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
