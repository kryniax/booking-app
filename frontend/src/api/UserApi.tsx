import { RegisterFormData } from "../pages/RegisterPage";
import { useMutation } from "@tanstack/react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreateUser = () => {
  const createUserRequest = async (formData: RegisterFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }
  };

  const { mutateAsync: createUser, status } = useMutation({
    mutationFn: createUserRequest,
  });

  return {
    createUser,
    isError: status === "error",
    isSuccess: status === "success",
  };
};
