import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";
import { SectionLabel } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

export function CtaBand({
  locale,
  label,
  heading,
  subtitle,
  button,
  className,
}: {
  locale: string;
  label?: string;
  heading: string;
  subtitle: string;
  button: string;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-forest text-offwhite",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #f5f6f3 1px, transparent 1px), linear-gradient(to bottom, #f5f6f3 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -end-24 -bottom-40 size-[30rem] rounded-full border border-sage/20"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -end-10 -bottom-24 size-[20rem] rounded-full border border-sage/15"
      />

      <Container className="relative py-20 sm:py-28 lg:py-32">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-8">
            {label ? (
              <SectionLabel onDark className="mb-6">
                {label}
              </SectionLabel>
            ) : null}
            <h2 className="max-w-3xl text-[clamp(2.2rem,4.6vw,4.2rem)] leading-[1.02] font-light tracking-[-0.035em] text-balance">
              {heading}
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-offwhite/70 sm:text-lg">
              {subtitle}
            </p>
          </div>
          <div className="flex lg:col-span-4 lg:justify-end">
            <ButtonLink href={`/${locale}/contact`} variant="light" size="lg">
              {button}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
