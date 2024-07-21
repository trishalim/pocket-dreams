import Link from "next/link";

interface Props {
  variant?: "primary" | "secondary" | "tertiary";
  className?: string;
}

interface ButtonProps
  extends Props,
    React.ButtonHTMLAttributes<HTMLButtonElement> {}

interface AnchorProps
  extends Props,
    React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export default function Button(props: AnchorProps | ButtonProps) {
  const {
    className: customClassName = "",
    variant = "primary",
    children,
  } = props;

  const classNames = {
    base: "py-2 px-3 inline-flex justify-center rounded-lg",
    primary:
      "bg-teal-500 text-white/95 border border-teal-500 hover:text-white hover:bg-[#1dccb9] font-semibold",
    secondary:
      "text-gray-900 border border-gray-100 hover:bg-gray-100 font-semibold",
    tertiary: "text-gray-700 border border-transparent font-medium",
  };

  const className = `${customClassName} ${classNames.base} ${classNames[variant]}`;

  if (!!(props as AnchorProps).href) {
    const anchorProps = props as AnchorProps;
    return (
      <Link href={anchorProps.href} className={className}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as ButtonProps;

  return <button {...buttonProps} className={className} />;
}
