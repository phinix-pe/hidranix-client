// src/modules/auth/pages/LoginPage.tsx
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-primary-dark">
      <div className="w-full max-w-md p-6 bg-transparent rounded-lg">
        {/* <h1 className="text-3xl font-bold text-center text-primary-light mb-6">Hello world!</h1> */}
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
