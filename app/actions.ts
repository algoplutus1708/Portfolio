"use server"

import { z } from "zod"

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(5),
  message: z.string().min(10),
})

export async function submitContactForm(formData: z.infer<typeof formSchema>) {
  const validatedFields = formSchema.safeParse(formData)

  if (!validatedFields.success) {
    throw new Error("Invalid form data")
  }

  try {
    // Log the form submission (for demonstration purposes)
    console.log("Form submission:", validatedFields.data)

    // In a real implementation, you would send this data to a backend service
    // For now, we'll simulate a successful submission

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Return success
    return { success: true }
  } catch (error) {
    console.error("Error submitting form:", error)
    throw new Error("Failed to submit form")
  }
}
