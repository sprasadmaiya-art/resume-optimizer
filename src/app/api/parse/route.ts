import { NextResponse } from "next/server";

import mammoth from "mammoth";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    let text = "";

    const mimeType = file.type;
    const fileName = file.name.toLowerCase();

    if (mimeType === "application/pdf" || fileName.endsWith(".pdf")) {
      const pdfParse = (await import("pdf-parse")).default || (await import("pdf-parse"));
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
        { error: "Unsupported file type. Please upload a PDF, DOCX, or TXT file." },
        { status: 400 }
      );
    }

    if (!text || text.trim() === "") {
      return NextResponse.json({ error: "Could not extract text from file" }, { status: 400 });
    }

    return NextResponse.json({ text: text.trim() });
  } catch (error: any) {
    console.error("Error parsing file:", error);
    return NextResponse.json(
      { error: error.message || "Failed to parse file" },
      { status: 500 }
    );
  }
}
