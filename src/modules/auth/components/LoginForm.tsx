// src/modules/auth/components/LoginForm.tsx
import { SignIn } from "@clerk/clerk-react";

const LoginForm = () => {
  return (
    <SignIn
      forceRedirectUrl="/dashboard"
    />
  );
}

export default LoginForm;