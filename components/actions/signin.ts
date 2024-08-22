"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { convertFormData } from "@/utils/form";

export const signIn = async (_: any, formData: FormData) => {
  "use server";

  const { email, password } = convertFormData(formData) as {
    email: string;
    password: string;
  };
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.log(error);
    return { message: error.message };
  }

  return redirect("/");
};
