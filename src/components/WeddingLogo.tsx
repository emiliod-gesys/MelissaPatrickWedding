import Image from "next/image";

interface WeddingLogoProps {
  /** onLight = fondos claros (cream/ivory), onDark = fondos oscuros o con foto */
  variant: "onLight" | "onDark";
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export function WeddingLogo({
  variant,
  className = "h-auto w-44",
  width = 180,
  height = 80,
  priority = false,
}: WeddingLogoProps) {
  const src =
    variant === "onLight"
      ? "/media/iconos/Logo1.png"
      : "/media/iconos/Logo_Blanco.png";

  const wrapperClass =
    variant === "onLight"
      ? "rounded-full bg-gradient-to-br from-gold/10 via-ivory to-blush/40 p-5 ring-1 ring-gold/25"
      : "";

  const image = (
    <Image
      src={src}
      alt="Melissa & Patrick"
      width={width}
      height={height}
      className={className}
      priority={priority}
    />
  );

  if (variant === "onLight") {
    return <div className={`flex justify-center ${wrapperClass}`}>{image}</div>;
  }

  return image;
}
