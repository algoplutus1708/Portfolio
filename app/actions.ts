"use server"

import { z } from "zod"
import { google } from "googleapis";

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
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: [
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    });

    const sheets = google.sheets({
      auth,
      version: 'v4',
    });

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A1:E1',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          [
            validatedFields.data.name,
            validatedFields.data.email,
            validatedFields.data.subject,
            validatedFields.data.message,
            new Date().toLocaleString(),
          ],
        ],
      },
    });

    return { success: true, data: response.data };

  } catch (error) {
    console.error("Error submitting form:", error)
    throw new Error("Failed to submit form")
  }
}
