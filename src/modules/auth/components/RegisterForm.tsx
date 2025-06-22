import { SignUp } from '@clerk/clerk-react'

const RegisterForm = () => {
  return (
    <SignUp forceRedirectUrl="/" />
  )
}

export default RegisterForm