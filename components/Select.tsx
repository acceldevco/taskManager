// "use client";
// import React from "react";
// import clsx from "clsx";
// import { Check, X, ChevronDown } from "lucide-react";

// type Option = {
//   label: string;
//   value: string | number;
// };

// type SelectProps = {
//   name: string;
//   label?: string;
//   placeholder?: string;
//   icon?: React.ReactNode;
//   register: any;
//   errors?: Record<string, any>;
//   dirtyFields?: Record<string, boolean>;
//   watch?: any;
//   options: Option[];
//   defaultValue?: string | number;
// };

// export default function Select({
//   name,
//   label,
//   placeholder = "انتخاب کنید...",
//   icon,
//   register,
//   errors,
//   dirtyFields,
//   watch,
//   options,
//   defaultValue,
// }: SelectProps) {
//   const hasError = !!errors?.[name];
//   const isDirty = !!dirtyFields?.[name];
//   const value = watch?.(name);
//   const showValid = isDirty && value && !hasError;

//   return (
//     <div className="space-y-3">
//       {label && (
//         <label
//           htmlFor={name}
//           className="block text-sm font-semibold text-slate-700"
//         >
//           {label}
//         </label>
//       )}

//       <div className="relative">
//         {icon && (
//           <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10">
//             {icon}
//           </div>
//         )}

//         <select
//           id={name}
//           defaultValue={defaultValue || ""}
//           {...register}
//           className={clsx(
//             "w-full appearance-none pr-12 pl-4 py-4 border-2 rounded-xl transition-all duration-300 outline-none font-medium bg-white",
//             hasError
//               ? "border-red-300 bg-red-50/50 focus:border-red-500 focus:ring-4 focus:ring-red-100/50"
//               : showValid
//               ? "border-emerald-300 bg-emerald-50/30 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100/50"
//               : "border-slate-200 bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100/50"
//           )}
//         >
//           <option value="" disabled>
//             {placeholder}
//           </option>
//           {options.map((opt) => (
//             <option key={opt.value} value={opt.value}>
//               {opt.label}
//             </option>
//           ))}
//         </select>

//         {/* آیکون پایین‌کش */}
//         <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
//           <ChevronDown className="w-5 h-5" />
//         </div>

//         {hasError ? (
//           <div className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500 pointer-events-none">
//             <X className="w-5 h-5" />
//           </div>
//         ) : showValid ? (
//           <div className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500 pointer-events-none">
//             <Check className="w-5 h-5" />
//           </div>
//         ) : null}
//       </div>

//       {hasError && (
//         <span className="text-red-600 text-sm">{errors[name]?.message}</span>
//       )}
//     </div>
//   );
// }





"use client";
import React from "react";
import clsx from "clsx";
import { Check, X, ChevronDown } from "lucide-react";

type Option = {
  label: string;
  value: string | number;
};

type SelectProps = {
  name: string;
  label?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  register: any;
  errors?: Record<string, any>;
  dirtyFields?: Record<string, boolean>;
  watch?: any;
  options: Option[];
  defaultValue?: string | number;
};

export default function Select({
  name,
  label,
  placeholder = "انتخاب کنید...",
  icon,
  register,
  errors,
  dirtyFields,
  watch,
  options,
  defaultValue,
}: any) {
  const hasError = Boolean(errors?.[name]);
  const isDirty = Boolean(dirtyFields?.[name]);
  const value = watch?.(name);
  const showValid = isDirty && value && !hasError;

  const baseStyle =
    "w-full appearance-none pr-12 pl-4 py-4 border-2 rounded-xl font-medium bg-white transition-all duration-300 outline-none";
  const stateStyle = clsx({
    "border-red-300 bg-red-50/50 focus:border-red-500 focus:ring-4 focus:ring-red-100/50":
      hasError,
    "border-emerald-300 bg-emerald-50/30 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100/50":
      showValid,
    "border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100/50":
      !hasError && !showValid,
  });

  return (
    <div className="space-y-3">
      {/* برچسب */}
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-semibold text-slate-700"
        >
          {label}
        </label>
      )}

      {/* فیلد انتخاب */}
      <div className="relative">
        {/* آیکون سمت راست (اختیاری) */}
        {icon && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10">
            {icon}
          </div>
        )}

        {/* المنت Select */}
        <select
          id={name}
          defaultValue={defaultValue || ""}
          {...register}
          className={clsx(baseStyle, stateStyle)}
        >
          <option value="" disabled>
            {placeholder}
          </option>

          {options.map(({ label, value }:any) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>

        {/* آیکون فلش پایین */}
        {/* <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
          <ChevronDown className="w-5 h-5" />
        </div> */}

        {/* آیکون وضعیت (خطا / تأیید) */}
        {hasError && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500 pointer-events-none">
            <X className="w-5 h-5" />
          </div>
        )}

        {showValid && !hasError && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500 pointer-events-none">
            <Check className="w-5 h-5" />
          </div>
        )}
      </div>

      {/* پیام خطا */}
      {hasError && (
        <span className="text-red-600 text-sm">{errors[name]?.message}</span>
      )}
    </div>
  );
}
