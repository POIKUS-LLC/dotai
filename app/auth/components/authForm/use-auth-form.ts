import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { useToast } from "@/hooks/use-toast"

import { authFormSchema } from "./auth-form-schema"

export const useAuthForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof authFormSchema>>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      email: "",
      rememberMe: false,
    },
  })

  const onSubmit = async (values: z.infer<typeof authFormSchema>) => {
    setIsLoading(true)
    setError(null)
    try {
      console.log(values) // TODO: Remove this
      // Simulate API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() < 0.3) {
            reject(new Error("Failed to send OTP. Please try again."))
          } else {
            resolve(true)
          }
        }, 2000)
      })

      onSuccess()
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      )
      toast({
        title: "Error",
        description: "Failed to sign in. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return { form, isLoading, error, onSubmit }
}
