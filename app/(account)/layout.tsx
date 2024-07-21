export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white sm:bg-[#f9f6ed] min-h-screen w-full flex sm:items-center justify-center px-4 py-8">
      <div className="max-w-lg w-full sm:shadow-xl sm:ring-1 sm:ring-gray-400/10 bg-white rounded-xl flex-1 sm:p-12">
        {children}
      </div>
    </div>
  );
}
