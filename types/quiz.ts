import { z } from 'zod';

export enum QuestionType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  TEXT = 'TEXT',
  FILL_IN_BLANK = 'FILL_IN_BLANK',
  SELECT_ALL = 'SELECT_ALL',
}

export const questionSchema = z.object({
  type: z.nativeEnum(QuestionType),
  question: z.string().min(1, 'Question text is required'),
  options: z.array(z.string()),
  correctAnswer: z.union([z.string(), z.array(z.string())]),
  explanation: z.string().optional(),
  moduleCode: z.string(),
}).refine(
  (data) => {
    if (data.type === QuestionType.MULTIPLE_CHOICE || data.type === QuestionType.SELECT_ALL) {
      return data.options.length >= 2;
    }
    return true;
  },
  {
    message: "Multiple choice and select all questions must have at least 2 options",
  }
);

export const quizSchema = z.object({
  title: z.string().min(1, 'Quiz title is required'),
  description: z.string().optional(),
  questions: z.array(questionSchema).min(1, 'At least one question is required'),
  moduleCode: z.string(),
  timeLimit: z.number().optional(),
});

export type Question = z.infer<typeof questionSchema>;
export type Quiz = z.infer<typeof quizSchema> & {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}; 