"use client";

import { useQueryClient } from "@tanstack/react-query";
import { signOut } from "@/app/actions/auth";
import Button from "@/components/Button";

export default function LogoutButton() {
  const queryClient = useQueryClient();

  const handleSignOut = () => {
    signOut().then(() => queryClient.clear());
  };

  return (
    <form action={handleSignOut}>
      <Button variant="secondary" type="submit">
        Log out
      </Button>
    </form>
  );
}
