import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateUser } from "../api/UserApi";
import { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { Link } from "react-router-dom";

const registerFormSchema = (t: TFunction) =>
  z
    .object({
      firstName: z
        .string()
        .min(3, { message: t("RegisterPage.validation.firstName.message") }),
      lastName: z
        .string()
        .min(3, { message: t("RegisterPage.validation.lastName.message") }),
      email: z
        .string()
        .email({ message: t("RegisterPage.validation.email.message") }),
      password: z
        .string()
        .min(8, t("RegisterPage.validation.password.min"))
        .refine(
          (value) => /[A-Z]/.test(value),
          t("RegisterPage.validation.password.upperCase")
        )
        .refine(
          (value) => /[0-9]/.test(value),
          t("RegisterPage.validation.password.number")
        )
        .refine(
          (value) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/.test(value),
          t("RegisterPage.validation.password.special")
        ),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("RegisterPage.validation.confirmPassword.message"),
      path: ["confirmPassword"],
    });

export type RegisterFormData = z.infer<ReturnType<typeof registerFormSchema>>;

const RegisterPage = () => {
  const { t } = useTranslation();
  const formSchema = useMemo(() => {
    return registerFormSchema(t);
  }, [t]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(formSchema),
  });

  const { createUser } = useCreateUser();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await createUser(data);
    } catch (error) {
      console.error("Registration failed: ", error);
    }
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">{t("RegisterPage.title")}</h2>
      <div className="flex flex-col md:flex-row gap-5">
        <label className="text-gray-700 text-sm capitalize font-bold flex-1">
          {t("RegisterPage.validation.firstName.label")}
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("firstName")}
          />
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm capitalize font-bold flex-1">
          {t("RegisterPage.validation.lastName.label")}
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("lastName")}
          />
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}
        </label>
      </div>
      <label className="text-gray-700 text-sm capitalize font-bold flex-1">
        {t("RegisterPage.validation.email.label")}
        <input
          type="email"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("email")}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm capitalize font-bold flex-1">
        {t("RegisterPage.validation.password.label")}
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("password")}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm capitalize font-bold flex-1">
        {t("RegisterPage.validation.confirmPassword.label")}
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}
      </label>
      <span className="flex items-center justify-between">
        <span className="text-sm">
          {t("RegisterPage.alreadyAccount")}{" "}
          <Link
            className="underline hover:text-black/80 transition duration-100"
            to="/login"
          >
            {t("BookingApp.signIn")}
          </Link>
        </span>
        <button
          type="submit"
          className="bg-blue-600 text-white text-xl p-2 font-bold rounded-md hover:bg-blue-500 transition duration-100"
        >
          {t("RegisterPage.button")}
        </button>
      </span>
    </form>
  );
};

export default RegisterPage;
