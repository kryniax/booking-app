import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useLoginUser } from "../../api/UserApi";
import Input from "../../components/Input";
import { TFunction } from "i18next";
import { z } from "zod";
import ButtonLink from "../../components/ButtonLink";
import Button from "../../components/Button";

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

const LoginForm = () => {
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
        <span className="flex gap-1 text-sm dark:text-zinc-200">
          {t("LoginPage.notRegistered")}{" "}
          <ButtonLink variant="text" to="/register" className="p-0 font-normal">
            {t("LoginPage.createAccount")}
          </ButtonLink>
        </span>
        <Button variant="primary" type="submit" className="text-xl">
          {t("BookingApp.signIn")}
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
