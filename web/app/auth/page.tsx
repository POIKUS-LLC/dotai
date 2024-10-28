import Image from "next/image"

import Testimonials from "@/components/complex/Testimonials"
import { mockTestimonials } from "@/components/complex/Testimonials/testimonial-model"

import AuthForm from "./components/authForm/auth-form"
import AuthLogo from "./components/AuthLogo/auth-logo"

const AuthPage = () => {
  return (
    <main
      className="grid grid-cols-1 lg:grid-cols-2 h-screen"
      aria-labelledby="auth-page-title"
    >
      <div className="flex flex-col items-center justify-center relative w-full">
        <AuthLogo />
        <div role="region" aria-label="Authentication form">
          <AuthForm />
        </div>
      </div>

      <div
        className="hidden lg:flex"
        role="complementary"
        aria-label="Customer testimonials"
      >
        <Testimonials testimonials={mockTestimonials} />
      </div>
    </main>
  )
}

export default AuthPage

AuthPage.displayName = "AuthPage"
