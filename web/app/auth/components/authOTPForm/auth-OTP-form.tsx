"use client"

import { useRef, useMemo } from "react"
import { Loader2 } from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import AuthOTPFormProps from "./auth-OTP-form-props"
import useOTPForm from "./use-OTP-form"

const getOTPGroups = (otpLength: number): number[] => {
  if (otpLength <= 5) return [otpLength];
  if (otpLength === 6) return [3, 3];
  if (otpLength === 7) return [2, 3, 2];
  if (otpLength === 8) return [4, 4];
  if (otpLength === 9) return [3, 3, 3];
  if (otpLength <= 12) return [3, 3, 3, otpLength - 9];
  return [4, 4, 4, otpLength - 12];
}

const AuthOTPForm = ({ onVerificationSuccess, otpLength }: AuthOTPFormProps) => {
  const { form, isLoading, error, handleSubmit } = useOTPForm(onVerificationSuccess, otpLength)
  const formRef = useRef<HTMLFormElement>(null)

  const otpGroups = useMemo(() => getOTPGroups(otpLength), [otpLength]);

  return (
    <Form {...form}>
      <form ref={formRef} onSubmit={form.handleSubmit(handleSubmit)} className="w-full space-y-6">
        <h2 id="otpFormTitle" className="text-lg font-semibold">One-Time Password Verification</h2>
        {error && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="otp-input">One-Time Password</FormLabel>
              <FormControl>
                <InputOTP
                  maxLength={otpLength}
                  {...field}
                  id="otp-input"
                  aria-labelledby="otpFormTitle"
                  aria-describedby="otpDescription otpErrorMessage"
                >
                  {otpGroups.map((groupLength, groupIndex) => (
                    <InputOTPGroup key={groupIndex}>
                      {[...Array(groupLength)].map((_, index) => (
                        <InputOTPSlot key={index} index={groupIndex * 4 + index} />
                      ))}
                      {groupIndex < otpGroups.length - 1 && <InputOTPSeparator />}
                    </InputOTPGroup>
                  ))}
                </InputOTP>
              </FormControl>
              <FormDescription id="otpDescription">
                Please enter the {otpLength}-digit one-time password sent to your phone.
              </FormDescription>
              <FormMessage id="otpErrorMessage" aria-live="polite" />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
              <span className="sr-only">Loading</span>
              Verifying...
            </span>
          ) : (
            "Verify OTP"
          )}
        </Button>
      </form>
    </Form>
  )
}

export default AuthOTPForm;

AuthOTPForm.displayName = "AuthOTPForm";
