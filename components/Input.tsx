export default function Input({
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`${className} w-full rounded-full ring-1 ring-gray-400/30 px-4 py-2 bg-white/10 focus:outline-none focus:ring-2 focus:ring-purple-200 text-slate-800`}
      {...props}
    />
  );
}
