import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Input from "../components/Input";
import { useLoginUser } from "../api/UserApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { TFunction } from "i18next";
import { useTranslation } from "react-i18next";

const loginFormSchema = (t: TFunction) =>
  z.object({
    email: z
      .string()
      .email({ message: t("LoginPage.validation.email.message") }),
    password: z
      .string()
      .min(8, t("LoginPage.validation.password.min"))
      .refine(
        (value) => /[A-Z]/.test(value),
        t("LoginPage.validation.password.upperCase")
      )
      .refine(
        (value) => /[0-9]/.test(value),
        t("LoginPage.validation.password.number")
      )
      .refine(
        (value) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/.test(value),
        t("LoginPage.validation.password.special")
      ),
  });

export type LoginFormData = z.infer<ReturnType<typeof loginFormSchema>>;

const LoginPage = () => {
  const { t } = useTranslation();
  const formSchema = useMemo(() => {
    return loginFormSchema(t);
  }, [t]);

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
      <h2 className="text-3xl font-bold capitalize dark:text-zinc-100">
        {t("BookingApp.signIn")}
      </h2>
      <Input
        label={t("LoginPage.validation.email.label")}
        type="email"
        error={errors.email}
        {...register("email")}
      />
      <Input
        label={t("LoginPage.validation.password.label")}
        type="password"
        error={errors.password}
        {...register("password")}
      />
      <div className="flex items-center justify-between">
        <span className="text-sm dark:text-zinc-100">
          {t("LoginPage.notRegistered")}{" "}
          <Link
            className="underline hover:text-black/80 transition duration-100"
            to="/register"
          >
            {t("LoginPage.createAccount")}
          </Link>
        </span>
        <button
          type="submit"
          className="bg-blue-600 dark:bg-blue-900 text-white text-xl capitalize p-2 font-bold rounded-md hover:bg-blue-500 hover:dark:bg-blue-800 transition duration-100"
        >
          {t("BookingApp.signIn")}
        </button>
      </div>
    </form>
  );
};

export default LoginPage;
