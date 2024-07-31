import Link from "next/link";
import type { ComponentProps } from "react";
import SpinnerIcon from "@/components/icons/SpinnerIcon";

interface Props {
  variant?: "primary" | "secondary";
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
    base: "inline-flex gap-2 items-center justify-center rounded-full overflow-hidden transition-colors",
    primary:
      "bg-purple-300 font-medium text-purple-950 px-4 py-2 rounded-full hover:bg-purple-200",
    secondary:
      "rounded-full bg-slate-100 font-medium text-slate-600 hover:bg-slate-200",
  };

  const sizeClassNames = {
    sm: "py-1.5 px-3 text-sm",
    md: "py-2 px-5",
    lg: "py-2 md:py-2.5 px-6 md:text-lg",
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
