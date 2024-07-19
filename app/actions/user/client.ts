"use client";

import { createClient } from "@/utils/supabase/client";

export const getUser = async () => {
  const supabase = createClient();

  return supabase.auth.getUser();
};
