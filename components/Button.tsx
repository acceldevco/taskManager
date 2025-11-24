import { Save } from "lucide-react";
import React, { useState } from "react";


type GradientButtonProps = {
  onSubmit: () => Promise<void> | void; // تابع ارسال می‌تواند async باشد
  buttonText?: string;
  Icon?: React.ReactNode;
  className?: string; // برای شخصی‌سازی کلاس‌ها
};

const GradientButton: React.FC<GradientButtonProps> = ({
  onSubmit,
  buttonText = "ثبت",
  Icon = <Save size={20} color="#fff" strokeWidth={1.5} />,
  className = "",
}) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      await onSubmit();
    } catch (err) {
      console.error("Error submitting:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`flex flex-col-reverse sm:flex-row gap-3 p-6 sm:p-8 pt-0 sm:pt-0 ${className}`}>
      <button
        type="button"
        onClick={handleClick}
        className="flex-1 px-6 py-3.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
                   hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white
                   font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200
                   hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
        disabled={loading}
      >
        <span>{Icon}</span>
        <span>{loading ? <span className="animate-spin">⏳</span> : buttonText}</span>
      </button>
    </div>
  );
};

export default GradientButton;
