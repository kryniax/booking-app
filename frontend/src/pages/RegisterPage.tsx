import HelmetSEO from "../components/HelmetSEO";
import RegisterForm from "../forms/register-form/RegisterForm";

const RegisterPage = () => {
  return (
    <>
      {" "}
      <HelmetSEO
        title="Create Hotel Booking Account | Free Registration"
        description="Sign up for a free account to manage bookings and get access to exclusive hotel deals and promotions."
        keywords="hotel registration, create account, sign up, booking account, free registration"
        pathName="/register"
      />
      <RegisterForm />
    </>
  );
};

export default RegisterPage;
