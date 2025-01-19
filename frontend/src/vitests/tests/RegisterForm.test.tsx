import { ReactElement } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import RegisterForm, {
  registerFormSchema,
} from "../../forms/register-form/RegisterForm";
import { TFunction } from "i18next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const mockT = ((key: string) => key) as TFunction;

vi.mock("../../api/UserApi", () => ({
  useCreateUser: () => ({
    createUser: vi.fn(),
  }),
}));

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
        staleTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  });

const renderWithProviders = (ui: ReactElement) => {
  const testQueryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={testQueryClient}>
      <MemoryRouter>{ui}</MemoryRouter>
    </QueryClientProvider>
  );
};

describe("RegisterForm schema validation", () => {
  const schema = registerFormSchema(mockT);

  it("should validate a valid form data", () => {
    const validData = {
      firstName: "Test",
      lastName: "Test2",
      email: "1111@1.com",
      password: "Qwerty123!",
      confirmPassword: "Qwerty123!",
    };
    expect(() => schema.parse(validData)).not.toThrow();
  });

  it("should throw error for invalid email", () => {
    const invalidData = {
      firstName: "Test",
      lastName: "Test2",
      email: "invalid@email",
      password: "Qwerty123!",
      confirmPassword: "Qwerty123!",
    };
    expect(() => schema.parse(invalidData)).toThrow(
      "RegisterPage.validation.email.message"
    );
  });

  it("should throw error for password mismatch", () => {
    const invalidData = {
      firstName: "Test",
      lastName: "Test2",
      email: "1111@1.com",
      password: "Qwerty123!",
      confirmPassword: "Qwerty12345!",
    };
    expect(() => schema.parse(invalidData)).toThrow(
      "RegisterPage.validation.confirmPassword.message"
    );
  });
});

describe("RegisterForm component", () => {
  it("should render all input fields", () => {
    renderWithProviders(<RegisterForm />);

    expect(
      screen.getByLabelText("RegisterPage.validation.firstName.label")
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("RegisterPage.validation.lastName.label")
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("RegisterPage.validation.email.label")
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("RegisterPage.validation.password.label")
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("RegisterPage.validation.confirmPassword.label")
    ).toBeInTheDocument();
  });

  it("should display validation errors for invalid input", async () => {
    renderWithProviders(<RegisterForm />);

    const submitButton = screen.getByRole("button", {
      name: "RegisterPage.button",
    });

    fireEvent.click(submitButton);

    expect(
      await screen.findByText("RegisterPage.validation.firstName.message")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("RegisterPage.validation.lastName.message")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("RegisterPage.validation.email.message")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("RegisterPage.validation.password.min")
    ).toBeInTheDocument();
  });
});
