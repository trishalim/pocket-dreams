export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#f9f6ed] min-h-screen w-full flex items-center justify-center px-4">
      <div className="max-w-lg w-full p-12 shadow-xl ring-1 ring-gray-400/10 bg-white rounded-xl flex-1">
        {children}
      </div>
    </div>
  );
}
