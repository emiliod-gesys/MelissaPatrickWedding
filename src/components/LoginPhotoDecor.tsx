"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const BACKDROP_PHOTOS = [
  "/media/fotos/IMG_1471.jpeg",
  "/media/fotos/IMG_5984.jpeg",
  "/media/fotos/IMG_0560.jpeg",
];

interface PolaroidConfig {
  src: string;
  rotate: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  width: string;
  delay: number;
  floatDuration: number;
  hideOnTablet?: boolean;
}

const POLAROIDS: PolaroidConfig[] = [
  {
    src: "/media/fotos/IMG_5686.jpeg",
    rotate: -10,
    top: "12%",
    left: "4%",
    width: "w-36 lg:w-44",
    delay: 0.15,
    floatDuration: 5.5,
  },
  {
    src: "/media/fotos/IMG_1381.jpeg",
    rotate: 8,
    top: "18%",
    right: "4%",
    width: "w-32 lg:w-40",
    delay: 0.35,
    floatDuration: 6.2,
  },
  {
    src: "/media/fotos/IMG_5658.jpeg",
    rotate: -6,
    bottom: "14%",
    left: "6%",
    width: "w-36 lg:w-42",
    delay: 0.5,
    floatDuration: 5.8,
  },
  {
    src: "/media/fotos/IMG_0425.jpeg",
    rotate: 11,
    bottom: "10%",
    right: "5%",
    width: "w-36 lg:w-44",
    delay: 0.25,
    floatDuration: 6.5,
  },
  {
    src: "/media/fotos/IMG_7743.jpeg",
    rotate: 4,
    top: "42%",
    left: "2%",
    width: "w-28 lg:w-36",
    delay: 0.6,
    floatDuration: 7,
    hideOnTablet: true,
  },
  {
    src: "/media/fotos/IMG_0572.jpeg",
    rotate: -7,
    top: "38%",
    right: "2%",
    width: "w-28 lg:w-36",
    delay: 0.45,
    floatDuration: 6.8,
    hideOnTablet: true,
  },
];

function Polaroid({
  src,
  rotate,
  top,
  left,
  right,
  bottom,
  width,
  delay,
  floatDuration,
  hideOnTablet,
}: PolaroidConfig) {
  const position = { top, left, right, bottom };

  return (
    <motion.div
      style={position}
      initial={{ opacity: 0, scale: 0.85, rotate: rotate - 8 }}
      animate={{ opacity: 1, scale: 1, rotate }}
      transition={{ delay, duration: 0.9, ease: "easeOut" }}
      className={`pointer-events-none absolute z-[1] ${
        hideOnTablet ? "hidden lg:block" : "hidden md:block"
      }`}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{
          repeat: Infinity,
          duration: floatDuration,
          ease: "easeInOut",
        }}
        className={`${width} bg-ivory p-2.5 pb-10 shadow-2xl shadow-charcoal/10 ring-1 ring-gold/20`}
      >
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={src}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 160px, 200px"
          />
        </div>
        <p className="mt-3 text-center font-[family-name:var(--font-display)] text-xs tracking-widest text-gold/70 italic">
          Melissa & Patrick
        </p>
      </motion.div>
    </motion.div>
  );
}

export function LoginPhotoDecor() {
  return (
    <>
      {/* Fondo con crossfade suave */}
      <div className="absolute inset-0 overflow-hidden">
        {BACKDROP_PHOTOS.map((src, i) => (
          <motion.div
            key={src}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{
              opacity: [0, 0.45, 0.45, 0],
              scale: [1.05, 1.12, 1.12, 1.05],
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              delay: i * (14 / BACKDROP_PHOTOS.length),
              ease: "easeInOut",
            }}
          >
            <Image
              src={src}
              alt=""
              fill
              className="object-cover blur-[2px]"
              sizes="100vw"
              priority={i === 0}
            />
          </motion.div>
        ))}

        <div className="absolute inset-0 bg-gradient-to-br from-ivory/90 via-cream/85 to-blush/55" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(250,246,240,0.4)_70%)]" />
      </div>

      {/* Marco decorativo central */}
      <div className="pointer-events-none absolute inset-8 z-[1] hidden rounded-[2rem] border border-gold/10 lg:block" />
      <div className="pointer-events-none absolute inset-12 z-[1] hidden rounded-[1.5rem] border border-gold/5 lg:block" />

      {/* Polaroids */}
      {POLAROIDS.map((polaroid) => (
        <Polaroid key={polaroid.src} {...polaroid} />
      ))}

      {/* Fotos en móvil: tira horizontal sutil */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] flex gap-2 overflow-hidden p-3 md:hidden">
        {POLAROIDS.slice(0, 4).map((p, i) => (
          <motion.div
            key={p.src}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.7, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="h-20 w-16 shrink-0 rotate-[-3deg] overflow-hidden rounded-sm bg-ivory p-1 shadow-lg ring-1 ring-gold/20 first:rotate-[-6deg] last:rotate-[5deg]"
          >
            <div className="relative h-full w-full">
              <Image src={p.src} alt="" fill className="object-cover" sizes="64px" />
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}
