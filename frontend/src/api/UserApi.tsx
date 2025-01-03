import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import { RegisterFormData } from "../pages/RegisterPage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LoginFormData } from "../pages/LoginPage";
import { UserType } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const useCreateUser = () => {
  const queryClient = useQueryClient();
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
    onSuccess: async () => {
      showToast({ message: "Registration Success", type: "SUCCESS" });
      await queryClient.invalidateQueries({ queryKey: ["validateToken"] });
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

export const useLoginUser = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const loginUserRequest = async (formData: LoginFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/user/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const body = await response.json();

    if (!response.ok) {
      throw new Error(body.message);
    }

    return body;
  };

  const { mutateAsync: loginUser } = useMutation({
    mutationFn: loginUserRequest,
    onSuccess: async () => {
      showToast({ message: "Sign in Successful", type: "SUCCESS" });
      await queryClient.invalidateQueries({ queryKey: ["validateToken"] });
      navigate(location.state?.from?.pathname || "/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  return { loginUser };
};

export const useLogoutUser = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const logoutUserRequest = async () => {
    const response = await fetch(`${API_BASE_URL}/api/user/logout`, {
      credentials: "include",
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Error durring logout");
    }
  };

  const { mutateAsync: logoutUser } = useMutation({
    mutationFn: logoutUserRequest,
    onSuccess: async () => {
      showToast({ message: "Signed Out", type: "SUCCESS" });
      await queryClient.invalidateQueries({ queryKey: ["validateToken"] });
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  return { logoutUser };
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

  const {
    data: authToken,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["validateToken"],
    queryFn: validateToken,
    retry: false,
  });

  return {
    authToken,
    isError,
    isLoading,
  };
};

export const useGetCurrentUser = () => {
  const getCurrentUserRequest = async (): Promise<UserType> => {
    const response = await fetch(`${API_BASE_URL}/api/user/me`, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Error get current user");
    }

    return response.json();
  };

  const { data: currentUser, isError } = useQuery({
    queryKey: ["fetchCurrent"],
    queryFn: getCurrentUserRequest,
  });

  return { currentUser, isError };
};
