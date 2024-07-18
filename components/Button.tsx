export default function Button(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) {
  return (
    <button
      {...props}
      className={`py-2 px-3 inline-flex rounded-lg no-underline bg-teal-500 text-white/95 border-b-4 border-teal-600 hover:text-white hover:bg-[#1dccb9] font-semibold ${
        props.className || ""
      }`}
    />
  );
}
