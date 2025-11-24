"use client";
import React from "react";
import clsx from "clsx";
import { Check, X } from "lucide-react";

type TextareaProps = {
  name: string;
  label?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  register: any;
  errors?: Record<string, any>;
  dirtyFields?: Record<string, boolean>;
  watch?: any;
  rows?: number;
  defaultValue?: string;
};

export default function Textarea({
  name,
  label,
  placeholder,
  icon,
  register,
  errors,
  dirtyFields,
  watch,
  rows = 4,
  defaultValue,
}: TextareaProps) {
  const hasError = !!errors?.[name];
  const isDirty = !!dirtyFields?.[name];
  const value = watch?.(name);
  const showValid = isDirty && value && !hasError;

  return (
    <div className="space-y-3">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-semibold text-slate-700"
        >
          {label}
        </label>
      )}

      <div className="relative">
        {icon && (
          <div className="absolute right-4 top-4 text-slate-400 pointer-events-none z-10">
            {icon}
          </div>
        )}

        <textarea
          id={name}
          defaultValue={defaultValue}
          placeholder={placeholder}
          rows={rows}
          {...register}
          className={clsx(
            "w-full pr-12 pl-4 py-4 border-2 rounded-xl transition-all duration-300 outline-none font-medium resize-none",
            hasError
              ? "border-red-300 bg-red-50/50 focus:border-red-500 focus:ring-4 focus:ring-red-100/50"
              : showValid
              ? "border-emerald-300 bg-emerald-50/30 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100/50"
              : "border-slate-200 bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100/50"
          )}
        />

        {hasError ? (
          <div className="absolute left-4 top-4 text-red-500 pointer-events-none">
            <X className="w-5 h-5" />
          </div>
        ) : showValid ? (
          <div className="absolute left-4 top-4 text-emerald-500 pointer-events-none">
            <Check className="w-5 h-5" />
          </div>
        ) : null}
      </div>

      {hasError && (
        <span className="text-red-600 text-sm">{errors[name]?.message}</span>
      )}
    </div>
  );
}
