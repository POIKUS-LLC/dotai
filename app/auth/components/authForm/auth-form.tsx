"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { UseFormReturn } from "react-hook-form"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import ResponsiveDialog from "@/components/complex/ResponsiveDialog"

import AuthOTPForm from "../authOTPForm/auth-OTP-form"
import { useAuthForm } from "./use-auth-form"

interface AuthFormData {
  email: string
  rememberMe: boolean
}

const AuthForm = () => {
  const [showOTP, setShowOTP] = useState(false)
  const router = useRouter()

  const { form, isLoading, error, onSubmit } = useAuthForm({
    onSuccess: () => setShowOTP(true),
  })

  const handleOTPSuccess = () => {
    router.push("/dashboard")
  }

  return (
    <div className="w-[350px]">
      <OTPDialog
        showOTP={showOTP}
        onClose={() => setShowOTP(false)}
        onSuccess={handleOTPSuccess}
      />
      <AuthFormHeader />
      {error && <ErrorAlert message={error} />}
      <AuthFormFields
        form={form as UseFormReturn<AuthFormData>}
        isLoading={isLoading}
        onSubmit={onSubmit}
      />
      <AuthFormFooter />
    </div>
  )
}

const OTPDialog = ({
  showOTP,
  onClose,
  onSuccess,
}: {
  showOTP: boolean
  onClose: () => void
  onSuccess: () => void
}) => (
  <ResponsiveDialog
    showDialog={showOTP}
    title="OTP Verification"
    onClose={onClose}
  >
    <AuthOTPForm onVerificationSuccess={onSuccess} otpLength={6} />
  </ResponsiveDialog>
)

const AuthFormHeader = () => (
  <div className="mb-6">
    <h2 className="text-2xl font-bold">Sign In</h2>
    <p className="text-sm text-muted-foreground">
      Enter your email and password to access your account.
    </p>
  </div>
)

const ErrorAlert = ({ message }: { message: string }) => (
  <Alert variant="destructive" className="mb-6">
    <AlertTitle>Error</AlertTitle>
    <AlertDescription>{message}</AlertDescription>
  </Alert>
)

const AuthFormFields = ({
  form,
  isLoading,
  onSubmit,
}: {
  form: UseFormReturn<AuthFormData>
  isLoading: boolean
  onSubmit: (data: AuthFormData) => void
}) => (
  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="Enter your email" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="rememberMe"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>Remember me</FormLabel>
              <FormDescription>
                Keep me signed in on this device
              </FormDescription>
            </div>
          </FormItem>
        )}
      />
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            Signing in...
          </span>
        ) : (
          "Sign In"
        )}
      </Button>
    </form>
  </Form>
)

const AuthFormFooter = () => (
  <div className="mt-6 text-center text-sm text-muted-foreground">
    <p>
      By signing in, you agree to our{" "}
      <Link href="/terms" className="text-primary hover:underline">
        Terms of Service
      </Link>{" "}
      and{" "}
      <Link href="/privacy" className="text-primary hover:underline">
        Privacy Policy
      </Link>
      .
    </p>
  </div>
)

AuthForm.displayName = "AuthForm"

export default AuthForm
