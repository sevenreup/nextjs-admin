import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { loginAsync } from "./actions";
import { useForm } from "react-hook-form";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Required" })
    .email({ message: "Invalid email address" })
    .trim(),
  password: z.string().min(1, { message: "Required" }),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const useLogin = () => {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const submitHandler = form.handleSubmit(async (props) => {
    const res = await loginAsync(props);

    if (res !== null) {
      form.setError("root.apiError", { message: res });
    }
  });

  return {
    form,
    errors: form.formState.errors,
    isLoadingSubmit: form.formState.isSubmitting,
    submitHandler,
  };
};
