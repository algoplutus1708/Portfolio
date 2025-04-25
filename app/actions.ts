"use server"

import { z } from "zod"
import ExcelJS from "exceljs"
import fs from "fs/promises"
import path from "path"

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(5),
  message: z.string().min(10),
})

const excelFilePath = path.join(process.cwd(), "contact_submissions.xlsx")

async function ensureExcelFile() {
  try {
    await fs.access(excelFilePath);
    console.log("Excel file exists at:", excelFilePath);
  } catch (error) {
    console.log("Creating new Excel file at:", excelFilePath);
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Submissions");
    
    if (worksheet) {
      worksheet.columns = [
        { header: "Name", key: "name" },
        { header: "Email", key: "email" },
        { header: "Subject", key: "subject" },
        { header: "Message", key: "message" },
        { header: "Timestamp", key: "timestamp" },
      ];
      await workbook.xlsx.writeFile(excelFilePath);
      console.log("New Excel file created successfully.");
    } else {
      throw new Error("Failed to create worksheet");
    }
  }
}

export async function submitContactForm(formData: z.infer<typeof formSchema>) {
  const validatedFields = formSchema.safeParse(formData)

  if (!validatedFields.success) {
    console.error("Validation failed:", validatedFields.error);
    throw new Error("Invalid form data");
  }

  try {
    console.log("Ensuring Excel file exists at:", excelFilePath);
    await ensureExcelFile();
    
    console.log("Reading Excel file...");
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(excelFilePath);
    
    console.log("Getting worksheet...");
    const worksheet = workbook.getWorksheet("Submissions");
    
    if (!worksheet) {
      throw new Error("Worksheet 'Submissions' not found");
    }

    console.log("Adding new row with data:", validatedFields.data);
    worksheet.addRow({
      ...validatedFields.data,
      timestamp: new Date().toISOString()
    });

    // First check if file is accessible for writing
    try {
      await fs.access(excelFilePath, fs.constants.W_OK);
    } catch (error: any) {
      if (error.code === 'EBUSY') {
        throw new Error(
          'The Excel file is currently locked by another program. ' +
          'Please close Excel or any other program using this file and try again.'
        );
      }
    }

    const maxRetries = 3;
    let retryCount = 0;
    let lastError;

    while (retryCount < maxRetries) {
      try {
        console.log("Writing to file at absolute path:", path.resolve(excelFilePath));
        // Write and force close the file
        await workbook.xlsx.writeFile(excelFilePath);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Allow time for file system
        
        // Read raw file contents
        const rawContents = await fs.readFile(excelFilePath);
        console.log("First 100 bytes of file:", rawContents.slice(0, 100).toString('hex'));
        
        // Verify file was written
        try {
          const stats = await fs.stat(excelFilePath);
          console.log("File stats after write:", {
            size: stats.size,
            modified: stats.mtime
          });

          // Read back file to verify contents
          const verifyWorkbook = new ExcelJS.Workbook();
          await verifyWorkbook.xlsx.readFile(excelFilePath);
          const verifyWorksheet = verifyWorkbook.getWorksheet("Submissions");
          console.log("File contains rows:", verifyWorksheet?.rowCount);
        } catch (verifyError) {
          console.error("File verification failed:", verifyError);
        }

        // Read back file to verify contents
        const verifyWorkbook = new ExcelJS.Workbook();
        await verifyWorkbook.xlsx.readFile(excelFilePath);
        const verifyWorksheet = verifyWorkbook.getWorksheet("Submissions");
        const rows = verifyWorksheet?.getRows(1, verifyWorksheet.rowCount);
        console.log("Rows in file after write:", rows?.map(row => row.values));
        
        return { success: true };
      } catch (error: any) {
        if (error.code === 'EBUSY') {
          retryCount++;
          lastError = error;
          console.log(`File busy, retrying (${retryCount}/${maxRetries})...`);
          await new Promise(resolve => setTimeout(resolve, 500 * retryCount));
          continue;
        }
        throw error; // Rethrow if it's not an EBUSY error
      }
    }

    // If we reach here, it means we exhausted retries
    throw new Error(
      `Failed to write to Excel file after ${maxRetries} attempts. ` +
      `Please ensure the file is not open in Excel or another program. ` +
      `Original error: ${lastError?.message}`
    );
  } catch (error: unknown) {
    console.error("Full error submitting form:", error);
    
    // Check file existence
    try {
      const exists = await fs.access(excelFilePath).then(() => true).catch(() => false);
      console.log(`File exists: ${exists}, Path: ${excelFilePath}`);
    } catch (accessError) {
      console.error("File access check failed:", accessError);
    }

    if (error instanceof Error) {
      throw new Error(`Failed to submit form: ${error.message}`);
    }
    throw new Error("Failed to submit form: Unknown error occurred");
  }
}
