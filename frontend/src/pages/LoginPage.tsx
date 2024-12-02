import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Input from "../components/Input";
import { useLoginUser } from "../api/UserApi";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, "Password is required")
    .refine(
      (value) => /[A-Z]/.test(value),
      "Password must contain at least one uppercase letter"
    )
    .refine(
      (value) => /[0-9]/.test(value),
      "Password must contain at least one number"
    )
    .refine(
      (value) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/.test(value),
      "Password must contain at least one special character"
    ),
});

export type LoginFormData = z.infer<typeof formSchema>;

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(formSchema),
  });

  const { loginUser } = useLoginUser();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await loginUser(data);
    } catch (error) {
      console.log("Login error: ", error);
    }
  });
  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Sign In</h2>
      <Input
        label="Email"
        type="email"
        error={errors.email}
        {...register("email")}
      />
      <Input
        label="Password"
        type="password"
        error={errors.password}
        {...register("password")}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white text-xl p-2 font-bold rounded-md hover:bg-blue-500 transition duration-100"
      >
        Sign In
      </button>
    </form>
  );
};

export default LoginPage;
