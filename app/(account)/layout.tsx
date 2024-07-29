export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-purple-gradient min-h-screen w-full flex sm:items-center justify-center px-4 py-8">
      <div className="max-w-sm w-full flex-1">{children}</div>
    </div>
  );
}
