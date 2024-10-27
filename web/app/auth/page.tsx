import Testimonials from "@/components/complex/Testimonials";
import { mockTestimonials } from "@/components/complex/Testimonials/testimonial-model";
import AuthForm from "./components/authForm/auth-form";

const AuthPage = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
            <div className="flex flex-col items-center justify-center">
                <AuthForm />
            </div>

            <div className="hidden lg:flex">
                <Testimonials testimonials={mockTestimonials} />
            </div>
        </div>
    )
}

export default AuthPage;

AuthPage.displayName = "AuthPage";

