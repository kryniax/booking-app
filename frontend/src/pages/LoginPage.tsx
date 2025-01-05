import HelmetSEO from "../components/HelmetSEO";
import LoginForm from "../forms/login-form/LoginForm";

const LoginPage = () => {
  return (
    <>
      {" "}
      <HelmetSEO
        title="Hotel Account Login | Access Your Dashboard"
        description="Sign in to your hotel booking account. Manage your reservations, view saved hotels, and access exclusive deals."
        keywords="hotel login, account access, user dashboard, booking account"
        pathName="/login"
      />
      <LoginForm />
    </>
  );
};

export default LoginPage;
