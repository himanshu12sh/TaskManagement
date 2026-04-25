"use client";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  loading?: boolean;
  children: React.ReactNode;
}

export default function Button({ 
  children, 
  variant = "primary", 
  loading = false,
  disabled,
  ...props 
}: ButtonProps) {
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
  };

  return (
    <button
      className={`${variants[variant]} px-4 py-2 rounded-lg transition-all duration-200 
        disabled:opacity-50 disabled:cursor-not-allowed font-medium
        ${!loading && !disabled && 'transform hover:scale-[1.02]'}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          <span>{children}</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
}