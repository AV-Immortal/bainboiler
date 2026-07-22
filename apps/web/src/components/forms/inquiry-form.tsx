"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { inquirySchema, type InquiryInput } from "@/lib/validation/inquiry";

type InquiryFormProps = {
  locale: "zh" | "en";
  submitLabel: string;
};

const COPY = {
  zh: {
    name: "姓名",
    email: "邮箱",
    country: "国家/地区",
    boilerType: "锅炉类型",
    message: "项目需求",
    placeholderName: "请输入姓名",
    placeholderEmail: "请输入邮箱",
    placeholderCountry: "例如：中国、印度尼西亚",
    placeholderBoilerType: "例如：蒸汽锅炉",
    placeholderMessage: "请描述容量、燃料、压力、交期等需求。",
    helper: "提交后我们会尽快与您联系。",
    success: "询盘已提交，我们会尽快与您联系。",
    failure: "提交失败，请稍后重试。",
    honeypot: "请留空",
  },
  en: {
    name: "Name",
    email: "Email",
    country: "Country",
    boilerType: "Boiler Type",
    message: "Project Details",
    placeholderName: "Your name",
    placeholderEmail: "Your email",
    placeholderCountry: "Country or region",
    placeholderBoilerType: "Steam boiler, hot water boiler, etc.",
    placeholderMessage:
      "Share capacity, fuel, pressure, delivery schedule, or other project details.",
    helper: "Our team will respond as soon as possible.",
    success: "Inquiry submitted successfully. We will contact you soon.",
    failure: "Unable to submit your inquiry. Please try again later.",
    honeypot: "Leave this field empty",
  },
} as const;

export function InquiryForm({ locale, submitLabel }: InquiryFormProps) {
  const copy = COPY[locale];
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InquiryInput>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      name: "",
      email: "",
      country: "",
      boilerType: "",
      message: "",
      website: "",
    },
  });

  async function onSubmit(values: InquiryInput) {
    setServerMessage(null);

    const response = await fetch("/api/inquiry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      setServerMessage(copy.failure);
      return;
    }

    reset();
    setServerMessage(copy.success);
  }

  return (
    <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Field
        error={errors.name?.message}
        label={copy.name}
        input={
          <input
            {...register("name")}
            aria-invalid={Boolean(errors.name)}
            className="w-full rounded-sm border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-sky-300"
            placeholder={copy.placeholderName}
          />
        }
      />
      <div className="grid gap-4 md:grid-cols-2">
        <Field
          error={errors.email?.message}
          label={copy.email}
          input={
            <input
              {...register("email")}
              aria-invalid={Boolean(errors.email)}
              className="w-full rounded-sm border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-sky-300"
              placeholder={copy.placeholderEmail}
              type="email"
            />
          }
        />
        <Field
          error={errors.country?.message}
          label={copy.country}
          input={
            <input
              {...register("country")}
              aria-invalid={Boolean(errors.country)}
              className="w-full rounded-sm border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-sky-300"
              placeholder={copy.placeholderCountry}
            />
          }
        />
      </div>
      <Field
        error={errors.boilerType?.message}
        label={copy.boilerType}
        input={
          <input
            {...register("boilerType")}
            aria-invalid={Boolean(errors.boilerType)}
            className="w-full rounded-sm border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-sky-300"
            placeholder={copy.placeholderBoilerType}
          />
        }
      />
      <Field
        error={errors.message?.message}
        label={copy.message}
        input={
          <textarea
            {...register("message")}
            aria-invalid={Boolean(errors.message)}
            className="min-h-36 w-full rounded-sm border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-sky-300"
            placeholder={copy.placeholderMessage}
          />
        }
      />
      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="website">{copy.honeypot}</label>
        <input
          {...register("website")}
          autoComplete="off"
          id="website"
          tabIndex={-1}
        />
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-400">{copy.helper}</p>
        <button
          className="inline-flex items-center justify-center rounded-sm bg-sky-400 px-6 py-3.5 text-sm font-semibold tracking-[0.12em] text-slate-950 transition hover:bg-sky-300 disabled:cursor-not-allowed disabled:opacity-70"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "..." : submitLabel}
        </button>
      </div>
      {serverMessage ? (
        <p
          className={`text-sm ${
            serverMessage === copy.success ? "text-emerald-300" : "text-rose-300"
          }`}
          role="status"
        >
          {serverMessage}
        </p>
      ) : null}
    </form>
  );
}

type FieldProps = {
  label: string;
  error?: string;
  input: React.ReactNode;
};

function Field({ label, error, input }: FieldProps) {
  return (
    <label className="grid gap-2 text-sm font-medium text-slate-200">
      <span>{label}</span>
      {input}
      {error ? <span className="text-xs text-rose-300">{error}</span> : null}
    </label>
  );
}
