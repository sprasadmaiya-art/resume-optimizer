import { NextResponse } from "next/server";
import mammoth from "mammoth";

// We increased the limit to 10MB per user request. Note: on Vercel, payloads >4.5MB might be blocked by the platform.
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ success: false, error: "No file uploaded." }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ success: false, error: "File exceeds the 10MB limit." }, { status: 413 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    let text = "";

    const mimeType = file.type;
    const fileName = file.name.toLowerCase();

    if (mimeType === "application/pdf" || fileName.endsWith(".pdf")) {
      // @ts-ignore
      const pdfParse = (await import("pdf-parse-debugging-disabled")).default || (await import("pdf-parse-debugging-disabled"));
      const pdfData = await (typeof pdfParse === "function" ? pdfParse(buffer) : (pdfParse as any)(buffer));
      text = pdfData.text;
    } else if (
      mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      fileName.endsWith(".docx")
    ) {
      const result = await mammoth.extractRawText({ buffer });
      text = result.value;
    } else if (mimeType === "text/plain" || fileName.endsWith(".txt")) {
      text = buffer.toString("utf-8");
    } else {
      return NextResponse.json(
        { success: false, error: "Unsupported file type. Please upload a PDF, DOCX, or TXT file." },
        { status: 400 }
      );
    }

    if (!text || text.trim() === "") {
      return NextResponse.json({ success: false, error: "Could not extract text from the file. It may be empty or an image-based PDF." }, { status: 400 });
    }

    return NextResponse.json({ success: true, text: text.trim() });
  } catch (error: any) {
    console.error("Error parsing file:", error);
    return NextResponse.json(
      { success: false, error: error.message || "An unexpected error occurred while parsing the file." },
      { status: 500 }
    );
  }
}
