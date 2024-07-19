"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";
import { redirect, useRouter } from "next/navigation";
import { signOut } from "@/app/actions/auth";

export default function LogoutButton({ userId }: { userId: string }) {
  const queryClient = useQueryClient();

  const handleSignOut = () => {
    signOut().then(() => queryClient.clear());
  };

  return (
    <form action={handleSignOut}>
      {userId}
      <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
        Logout
      </button>
    </form>
  );
}
