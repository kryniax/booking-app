import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateUser } from "../api/UserApi";
import { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import Input from "../components/Input";

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
      <h2 className="text-3xl font-bold dark:text-zinc-100">
        {t("RegisterPage.title")}
      </h2>
      <div className="flex flex-col md:flex-row gap-5">
        <Input
          label={t("RegisterPage.validation.firstName.label")}
          type="text"
          error={errors.firstName}
          {...register("firstName")}
        />
        <Input
          label={t("RegisterPage.validation.lastName.label")}
          type="text"
          error={errors.lastName}
          {...register("lastName")}
        />
      </div>
      <Input
        label={t("RegisterPage.validation.email.label")}
        type="email"
        error={errors.email}
        {...register("email")}
      />
      <Input
        label={t("RegisterPage.validation.password.label")}
        type="password"
        error={errors.password}
        {...register("password")}
      />
      <Input
        label={t("RegisterPage.validation.confirmPassword.label")}
        type="password"
        error={errors.confirmPassword}
        {...register("confirmPassword")}
      />
      <div className="flex items-center justify-between">
        <span className="text-sm dark:text-zinc-100">
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
          className="bg-blue-600 dark:bg-blue-900 text-white text-xl p-2 font-bold rounded-md hover:bg-blue-500 dark:hover:bg-blue-800 transition duration-100"
        >
          {t("RegisterPage.button")}
        </button>
      </div>
    </form>
  );
};

export default RegisterPage;
