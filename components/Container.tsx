export default function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`${className} max-w-5xl mx-auto px-4 py-12 lg:py-16`}>
      {children}
    </div>
  );
}
