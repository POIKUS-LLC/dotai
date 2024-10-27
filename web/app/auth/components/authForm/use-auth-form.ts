import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { authFormSchema } from './auth-form-schema'
import { useToast } from '@/hooks/use-toast'

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
            setError(error instanceof Error ? error.message : "An unexpected error occurred")
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
