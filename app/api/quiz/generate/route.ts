import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";
import { QuestionType } from "@/types/quiz";

// Define schema for quiz questions
const questionSchema = z.object({
  type: z.enum([
    QuestionType.MULTIPLE_CHOICE,
    QuestionType.TEXT,
    QuestionType.FILL_IN_BLANK,
    QuestionType.SELECT_ALL,
  ]),
  question: z.string(),
  options: z.array(z.string()),
  correctAnswer: z.union([z.string(), z.array(z.string())]),
  explanation: z.string().optional(),
});

const quizSchema = z.array(questionSchema);

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return new Response(JSON.stringify({ error: "No file provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (file.type !== "application/pdf") {
      return new Response(
        JSON.stringify({ error: "Only PDF files are supported" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // Check file size (limit to 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return new Response(
        JSON.stringify({ error: "File size exceeds 10MB limit" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const result = await generateObject({
      model: google("gemini-2.0-flash-001"),
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Generate 5 quiz questions based on this PDF content. Include a mix of question types:
              - Multiple choice questions with 4 options
              - Fill in the blank questions
              - Text-based questions requiring short answers
              - Select all that apply questions with multiple correct answers
              
              Make sure each question:
              - Tests understanding of key concepts from the material
              - Has clear and unambiguous answers
              - Includes a brief explanation of the correct answer
              - Is challenging but fair
              
              Format the response according to the provided schema.`,
            },
            {
              type: "file",
              data: await file.arrayBuffer(),
              mimeType: "application/pdf",
            },
          ],
        },
      ],
      schema: quizSchema,
      maxRetries: 2,
    });

    return new Response(JSON.stringify(result), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Quiz generation error:", error);

    const errorMessage = error.message?.includes("API key")
      ? "API configuration error. Please contact the administrator."
      : error.message?.includes("timeout") || error.message?.includes("aborted")
        ? "The generation took too long. Please try with a smaller PDF."
        : "Failed to generate quiz questions. Please try again.";

    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
