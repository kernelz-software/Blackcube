import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types/i18n";

export function Logo({
  locale,
  variant = "dark",
  className,
  priority = false,
}: {
  locale: Locale;
  variant?: "dark" | "light";
  className?: string;
  priority?: boolean;
}) {
  const src =
    variant === "light"
      ? "/images/brand/black-cube-logo-white.png"
      : "/images/brand/black-cube-logo.png";

  return (
    <Link
      href={`/${locale}`}
      className={cn(
        "inline-flex items-center transition-opacity duration-300 hover:opacity-75",
        className,
      )}
      aria-label="Black Cube Engineering Consultancy"
    >
      <Image
        src={src}
        alt="Black Cube Engineering Consultancy"
        width={147}
        height={47}
        priority={priority}
        className="h-8 w-auto sm:h-9"
      />
    </Link>
  );
}
