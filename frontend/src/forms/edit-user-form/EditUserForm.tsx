import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useUpdateUser } from "../../api/UserApi";
import Input from "../../components/Input";
import { TFunction } from "i18next";
import { z } from "zod";
import { UserType } from "../../types";
import { CiEdit } from "react-icons/ci";
import Button from "../../components/Button";

const updateFormSchema = (t: TFunction) =>
  z
    .object({
      email: z
        .string()
        .email({ message: t("LoginPage.validation.email.message") }),
      oldPassword: z
        .string({ required_error: t("LoginPage.validation.password.required") })
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
      password: z
        .string({ required_error: t("LoginPage.validation.password.required") })
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
      confirmPassword: z.string({
        required_error: t("LoginPage.validation.password.required"),
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("RegisterPage.validation.confirmPassword.message"),
      path: ["confirmPassword"],
    });

export type UpdateFormData = z.infer<ReturnType<typeof updateFormSchema>>;

type EditUserFormProps = {
  currentUser: UserType;
};

const EditUserForm = ({ currentUser }: EditUserFormProps) => {
  const { t } = useTranslation();
  const { updateUser, isPending, isSuccess } = useUpdateUser();

  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [serverError, setServerError] = useState<string>();

  const formSchema = useMemo(() => {
    return updateFormSchema(t);
  }, [t, serverError]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<UpdateFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: currentUser.email,
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    setServerError(undefined);
    try {
      await updateUser(data);
      setIsDisabled(true);
      console.log(isSuccess);
    } catch (error) {
      if (error) {
        setError("oldPassword", {
          message: t("MyProfilePage.validation.oldPassword.invalid"),
        });
        setIsDisabled(false);
      }
      console.log("Update error:", error);
    }
  });

  return (
    <form className="flex flex-1 p-4 flex-col gap-5" onSubmit={onSubmit}>
      <header className="flex items-center justify-between">
        <h3 className="text-xl font-bold dark:text-zinc-100">
          {t("MyProfilePage.editUser")}
        </h3>
        <CiEdit
          size={25}
          className="cursor-pointer dark:text-zinc-100"
          onClick={() => setIsDisabled(!isDisabled)}
        />
      </header>

      <Input
        label={t("LoginPage.validation.email.label")}
        type="email"
        disabled={isDisabled || isPending}
        error={errors.email}
        {...register("email")}
      />
      <Input
        label={t("MyProfilePage.oldPassword")}
        type="password"
        disabled={isDisabled || isPending}
        error={errors.oldPassword}
        {...register("oldPassword")}
      />
      <Input
        label={t("MyProfilePage.newPassword")}
        type="password"
        disabled={isDisabled || isPending}
        error={errors.password}
        {...register("password")}
      />
      <Input
        label={t("RegisterPage.validation.confirmPassword.label")}
        type="password"
        disabled={isDisabled || isPending}
        error={errors.confirmPassword}
        {...register("confirmPassword")}
      />
      <Button
        variant="primary"
        type="submit"
        disabled={isPending || isDisabled}
        className="text-xl justify-center"
      >
        {isPending ? `${t("BookingApp.saving")}...` : t("BookingApp.save")}
      </Button>
    </form>
  );
};

export default EditUserForm;
