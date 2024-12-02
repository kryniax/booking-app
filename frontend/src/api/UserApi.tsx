import { useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import { RegisterFormData } from "../pages/RegisterPage";
import { useMutation, useQuery } from "@tanstack/react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreateUser = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const createUserRequest = async (formData: RegisterFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/user/register`, {
      method: "POST",
      credentials: "include",
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
    onSuccess: () => {
      showToast({ message: "Registration Success", type: "SUCCESS" });
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  return {
    createUser,
    isError: status === "error",
    isSuccess: status === "success",
  };
};

export const useValidateToken = () => {
  const validateToken = async () => {
    const response = await fetch(`${API_BASE_URL}/api/user/validate-token`, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Token invalid");
    }

    return response.json();
  };

  const { data: authToken, isError } = useQuery({
    queryKey: ["validateToken"],
    queryFn: validateToken,
    retry: false,
  });

  return {
    authToken,
    isError,
  };
};
