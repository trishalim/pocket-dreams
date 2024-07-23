import Link from "next/link";
import type { ComponentProps } from "react";
import SpinnerIcon from "@/components/icons/SpinnerIcon";

interface Props {
  variant?: "primary" | "secondary" | "tertiary";
  className?: string;
  pending?: boolean;
  pendingText?: string;
  size?: "sm" | "md" | "lg";
}

interface AnchorProps
  extends Props,
    React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

type ButtonProps = ComponentProps<"button"> & Props;

export default function Button(props: AnchorProps | ButtonProps) {
  const {
    className: customClassName = "",
    variant = "primary",
    children,
    pending,
    pendingText,
    size = "md",
  } = props;

  const variantClassNames = {
    base: "inline-flex gap-2 items-center justify-center rounded-lg overflow-hidden",
    primary:
      "group relative isolate font-medium transition duration-300 ease-[cubic-bezier(0.4,0.36,0,1)] before:duration-300 before:ease-[cubic-bezier(0.4,0.36,0,1)] before:transtion-opacity shadow-[0_1px_theme(colors.white/0.07)_inset,0_1px_3px_theme(colors.gray.900/0.2)] before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-md before:bg-gradient-to-b before:from-white/20 before:opacity-50 hover:before:opacity-100 after:pointer-events-none after:absolute after:inset-0 after:-z-10 after:rounded-md after:bg-gradient-to-b after:from-white/10 after:from-[46%] after:to-[54%] after:mix-blend-overlay ring-1 bg-teal-500 text-white ring-teal-500",
    secondary:
      "text-gray-700 border border-gray-100 hover:bg-gray-100 font-medium",
    tertiary: "text-gray-700 border border-transparent font-medium",
  };

  const sizeClassNames = {
    sm: "py-1.5 px-3 text-sm",
    md: "py-2 px-5",
    lg: "py-2.5 px-6 text-lg",
  };

  const className = `${customClassName} ${pending && pendingText ? " cursor-not-allowed opacity-50" : ""} ${variantClassNames.base} ${variantClassNames[variant]} ${sizeClassNames[size]}`;

  if (!!(props as AnchorProps).href) {
    const anchorProps = props as AnchorProps;
    return (
      <Link href={anchorProps.href} className={className}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as ButtonProps;

  return (
    <button {...buttonProps} className={className}>
      {pending && pendingText ? (
        <>
          <SpinnerIcon className="text-white"></SpinnerIcon> {pendingText}
        </>
      ) : (
        children
      )}
    </button>
  );
}
