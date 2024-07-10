export default function Error({ error }: { error: Error }) {
  return (
    <div className="bg-red-500 text-white p-4 rounded-md">
      <p>{error.message}</p>
    </div>
  );
}
