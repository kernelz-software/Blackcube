"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowUpRight, Check } from "lucide-react";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";
import type { Dictionary, Locale } from "@/types/i18n";

type FormValues = {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  service: string;
  message: string;
  consent: boolean;
};

export function ContactForm({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const [sent, setSent] = useState(false);

  const schema = useMemo(
    () =>
      z.object({
        name: z.string().trim().min(2, dict.contact.required),
        company: z.string().trim().optional(),
        email: z.string().trim().email(dict.contact.invalidEmail),
        phone: z.string().trim().optional(),
        service: z.string().min(1, dict.contact.required),
        message: z.string().trim().min(10, dict.contact.required),
        consent: z.boolean().refine((value) => value, {
          message: dict.contact.required,
        }),
      }),
    [dict],
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      service: "",
      message: "",
      consent: false,
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, locale }),
      });

      const payload = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;

      if (!response.ok) {
        toast.error(dict.contact.errorTitle, {
          description:
            payload?.error === "not_configured"
              ? dict.contact.configError
              : dict.contact.errorMessage,
        });
        return;
      }

      setSent(true);
      reset();
    } catch {
      toast.error(dict.contact.errorTitle, {
        description: dict.contact.errorMessage,
      });
    }
  };

  const inputClass =
    "w-full border-0 border-b border-graphite/25 bg-transparent px-0 py-3 text-base text-graphite outline-none transition-colors placeholder:text-support/70 focus:border-forest focus:ring-0";

  if (sent) {
    return (
      <div className="flex min-h-[30rem] flex-col justify-between border border-graphite/15 bg-[#eef0ea] p-8 sm:p-10">
        <div className="flex size-12 items-center justify-center border border-forest text-forest">
          <Check aria-hidden="true" className="size-5" strokeWidth={1.5} />
        </div>
        <div className="mt-12">
          <h3 className="text-2xl leading-snug font-light tracking-[-0.02em] text-graphite sm:text-3xl">
            {dict.contact.successTitle}
          </h3>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/60">
            {dict.contact.successMessage}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-10 inline-flex w-fit items-center gap-3 border-b border-graphite/25 pb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink transition-colors hover:border-forest hover:text-forest"
        >
          {dict.contact.sendAnother}
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="border border-graphite/15 bg-offwhite p-6 sm:p-10"
    >
      <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label
            htmlFor="name"
            className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-ink/60"
          >
            {dict.contact.name}
            <span className="text-sage">*</span>
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            aria-invalid={errors.name ? "true" : undefined}
            aria-describedby={errors.name ? "name-error" : undefined}
            aria-required="true"
            className={inputClass}
            {...register("name")}
          />
          {errors.name ? (
            <p
              id="name-error"
              role="alert"
              className="mt-2 text-xs text-[#9a3d2b]"
            >
              {errors.name.message}
            </p>
          ) : null}
        </div>

        <div className="sm:col-span-1">
          <label
            htmlFor="company"
            className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-ink/60"
          >
            {dict.contact.company}
            <span className="text-support/70">({dict.contact.optional})</span>
          </label>
          <input
            id="company"
            type="text"
            autoComplete="organization"
            className={inputClass}
            {...register("company")}
          />
        </div>

        <div className="sm:col-span-1">
          <label
            htmlFor="email"
            className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-ink/60"
          >
            {dict.contact.email}
            <span className="text-sage">*</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            dir="ltr"
            aria-invalid={errors.email ? "true" : undefined}
            aria-describedby={errors.email ? "email-error" : undefined}
            aria-required="true"
            className={cn(inputClass, "text-start")}
            {...register("email")}
          />
          {errors.email ? (
            <p
              id="email-error"
              role="alert"
              className="mt-2 text-xs text-[#9a3d2b]"
            >
              {errors.email.message}
            </p>
          ) : null}
        </div>

        <div className="sm:col-span-1">
          <label
            htmlFor="phone"
            className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-ink/60"
          >
            {dict.contact.phone}
            <span className="text-support/70">({dict.contact.optional})</span>
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            dir="ltr"
            className={cn(inputClass, "text-start")}
            {...register("phone")}
          />
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="service"
            className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-ink/60"
          >
            {dict.contact.service}
            <span className="text-sage">*</span>
          </label>
          <select
            id="service"
            aria-invalid={errors.service ? "true" : undefined}
            aria-describedby={errors.service ? "service-error" : undefined}
            aria-required="true"
            className={cn(inputClass, "appearance-none")}
            defaultValue=""
            {...register("service")}
          >
            <option value="" disabled>
              {dict.contact.servicePlaceholder}
            </option>
            {services.map((service) => (
              <option key={service.slug} value={service.slug}>
                {service.title[locale]}
              </option>
            ))}
            <option value="other">
              {locale === "ar" ? "استشارة أخرى" : "Other enquiry"}
            </option>
          </select>
          {errors.service ? (
            <p
              id="service-error"
              role="alert"
              className="mt-2 text-xs text-[#9a3d2b]"
            >
              {errors.service.message}
            </p>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="message"
            className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-ink/60"
          >
            {dict.contact.projectDescription}
            <span className="text-sage">*</span>
          </label>
          <textarea
            id="message"
            rows={4}
            aria-invalid={errors.message ? "true" : undefined}
            aria-describedby={errors.message ? "message-error" : undefined}
            aria-required="true"
            className={cn(inputClass, "resize-none")}
            {...register("message")}
          />
          {errors.message ? (
            <p
              id="message-error"
              role="alert"
              className="mt-2 text-xs text-[#9a3d2b]"
            >
              {errors.message.message}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-8 border-t border-graphite/12 pt-6">
        <label
          htmlFor="consent"
          className="flex cursor-pointer items-start gap-3"
        >
          <input
            id="consent"
            type="checkbox"
            aria-invalid={errors.consent ? "true" : undefined}
            aria-describedby={errors.consent ? "consent-error" : undefined}
            className="mt-0.5 size-4 shrink-0 accent-[#344A3B]"
            {...register("consent")}
          />
          <span className="text-xs leading-relaxed text-ink/60">
            {dict.contact.consent}{" "}
            <Link
              href={`/${locale}/privacy`}
              className="underline decoration-graphite/25 underline-offset-4 transition-colors hover:text-forest"
            >
              {dict.contact.privacyLink}
            </Link>
            .
          </span>
        </label>
        {errors.consent ? (
          <p
            id="consent-error"
            role="alert"
            className="mt-2 text-xs text-[#9a3d2b]"
          >
            {errors.consent.message}
          </p>
        ) : null}
      </div>

      <div className="mt-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="max-w-xs text-[11px] leading-relaxed text-support">
          {dict.contact.formSubtitle}
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="group inline-flex items-center gap-3 border border-graphite bg-graphite px-6 py-4 font-mono text-[10px] uppercase tracking-[0.18em] text-offwhite transition-colors hover:border-forest hover:bg-forest disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? dict.contact.submitting : dict.contact.submit}
          <ArrowUpRight
            aria-hidden="true"
            className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100"
            strokeWidth={1.5}
          />
        </button>
      </div>
    </form>
  );
}
