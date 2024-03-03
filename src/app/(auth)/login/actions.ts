"use server";

import { createUnauthenticatedClient } from "@/lib/supabase/server";
import { LoginSchema } from "./use-form";
import { redirect } from "next/navigation";

export const loginAsync = async (form: LoginSchema) => {
  const client = createUnauthenticatedClient();

  const { error } = await client.auth.signInWithPassword({
    email: form.email,
    password: form.password,
  });

  if (error !== null) {
    return error instanceof Error ? error.message : "An error occurred";
  }

  redirect("/admin");
};
