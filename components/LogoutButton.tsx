"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";
import { redirect, useRouter } from "next/navigation";
import { signOut } from "@/app/actions/auth";
import Button from "@/components/Button";

export default function LogoutButton({ userId }: { userId: string }) {
  const queryClient = useQueryClient();

  const handleSignOut = () => {
    signOut().then(() => queryClient.clear());
  };

  return (
    <form action={handleSignOut}>
      {userId}
      <Button variant="secondary" type="submit">
        Logout
      </Button>
    </form>
  );
}
