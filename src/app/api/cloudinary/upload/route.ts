import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import busboy from "busboy";
import { Readable } from "stream";

export const runtime = "nodejs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "",
  api_key: process.env.CLOUDINARY_API_KEY || "",
  api_secret: process.env.CLOUDINARY_API_SECRET || "",
});

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json(
        { error: "Unsupported content type, expected multipart/form-data" },
        { status: 415 }
      );
    }

    const body = req.body;
    if (!body) {
      return NextResponse.json(
        { error: "No file or form data provided" },
        { status: 400 }
      );
    }
    const nodeReadable = Readable.fromWeb(body as any);
    const bb = busboy({ headers: { "content-type": contentType } });

    const fields: Record<string, any> = {};
    const uploads: Record<string, any> = {};

    // Array to collect file upload promises
    const uploadPromises: Promise<void>[] = [];

    bb.on("file", (fieldname, fileStream, fileInfo) => {
      const fileBuffer: Buffer[] = [];

      fileStream.on("data", (chunk: Buffer) => {
        fileBuffer.push(chunk);
      });

      const promise = new Promise<void>((resolve) => {
        fileStream.on("end", async () => {
          const finalBuffer = Buffer.concat(fileBuffer);
          try {
            const uploadResult = await new Promise(
              (resolveUpload, rejectUpload) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                  { folder: "nextjs_uploads" },
                  (error, result) => {
                    if (error) return rejectUpload(error);
                    resolveUpload(result);
                  }
                );
                uploadStream.end(finalBuffer);
              }
            );
            uploads[fieldname] = uploadResult;
          } catch (err) {
            uploads[fieldname] = { error: (err as Error).message };
          }
          resolve(); // Resolve the promise once the upload is complete
        });
      });
      uploadPromises.push(promise);
    });

    bb.on("field", (fieldname, value) => {
      fields[fieldname] = value;
    });

    const finished = new Promise<void>((resolve, reject) => {
      bb.on("close", () => resolve());
      bb.on("error", (err) => reject(err));
    });

    nodeReadable.pipe(bb);
    await finished;
    // Wait for all file uploads to finish
    await Promise.all(uploadPromises);

    return NextResponse.json({ fields, uploads }, { status: 200 });
  } catch (error) {
    console.error("Error in POST /api/upload:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
