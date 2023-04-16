import React from "react";
import { cva } from "class-variance-authority";

const buttonStyles = cva(
  "flex items-center justify-center rounded-md border border-transparent shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      size: {
        sm: "px-3 py-2 text-xs",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base",
      },
      intent: {
        primary: "bg-blue text-white hover:bg-primary-dark",
        secondary: "bg-transparent text-white hover:bg-secondary-dark",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed",
      },
    },
    defaultVariants: {
      size: "md",
      intent: "secondary",
      disabled: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  intent?: "primary" | "secondary" | null | undefined;
  size?: "sm" | "md" | "lg" | null | undefined;
  class?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const Button = ({
  children,
  onClick,
  intent,
  size,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={buttonStyles({ intent, size, disabled }) + ` ${props.class}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
