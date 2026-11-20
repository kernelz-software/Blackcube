import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonLink = cva(
  "group/button inline-flex items-center justify-center gap-3 border font-mono text-[11px] uppercase tracking-[0.18em] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage",
  {
    variants: {
      variant: {
        primary:
          "border-graphite bg-graphite text-offwhite hover:border-forest hover:bg-forest",
        light:
          "border-offwhite bg-offwhite text-graphite hover:border-sage hover:bg-sage",
        outline:
          "border-graphite/25 text-ink hover:border-graphite hover:bg-graphite hover:text-offwhite",
        "outline-light":
          "border-white/30 text-offwhite hover:border-sage hover:bg-sage hover:text-graphite",
        ghost: "border-transparent px-0 py-0 text-ink hover:text-forest",
      },
      size: {
        md: "px-6 py-4",
        lg: "px-8 py-5",
        sm: "px-5 py-3",
        none: "p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

interface ButtonLinkProps extends VariantProps<typeof buttonLink> {
  href: string;
  children: React.ReactNode;
  className?: string;
  withArrow?: boolean;
  external?: boolean;
  ariaLabel?: string;
}

export function ButtonLink({
  href,
  children,
  variant,
  size,
  className,
  withArrow = true,
  external = false,
  ariaLabel,
}: ButtonLinkProps) {
  const content = (
    <>
      <span>{children}</span>
      {withArrow ? (
        <ArrowUpRight
          aria-hidden="true"
          className="size-4 transition-transform duration-300 group-hover/button:-translate-y-0.5 group-hover/button:translate-x-0.5 rtl:-scale-x-100"
          strokeWidth={1.5}
        />
      ) : null}
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        className={cn(buttonLink({ variant, size }), className)}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={cn(buttonLink({ variant, size }), className)}
    >
      {content}
    </Link>
  );
}
