import { getUser } from "@/app/actions/user";
import { redirect } from "next/navigation";

export default async function Protected({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  return <>{children}</>;
}
