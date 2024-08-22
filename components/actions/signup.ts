"use server";

import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { convertFormData } from "@/utils/form";
import { prisma } from "@/utils/prisma";

export const signUp = async (_: any, formData: FormData) => {
  "use server";

  const { email, password } = convertFormData(formData) as {
    email: string;
    password: string;
  };
  const origin = headers().get("origin");
  const supabase = createClient();

  const user = await prisma.users.findFirst({
    where: {
      email: email,
    },
    select: {
      id: true,
    },
  });

  if (user) {
    return { message: "This email is already associated with an account" };
  }

  const { error, data } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.log(error);
    return { message: error.message };
  }

  return {
    message: "Check email to continue sign in process",
  };
};
