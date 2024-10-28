"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const useOTPForm = (onVerificationSuccess: () => void, otpLength: number) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const FormSchema = z.object({
    otp: z.string().length(otpLength, {
      message: `Your one-time password must be ${otpLength} characters.`,
    }),
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  })

  const handleSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsLoading(true)
    setError(null)

    try {
      // Mock API call
      await new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() < 0.3) {
            reject(new Error("Failed to verify OTP. Please try again."))
          } else {
            resolve()
          }
        }, 2000)
      })

      onVerificationSuccess()
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      )
    } finally {
      setIsLoading(false)
    }
  }

  return { form, isLoading, error, handleSubmit }
}

export default useOTPForm
