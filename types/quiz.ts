export enum QuestionType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  TEXT = 'TEXT',
  FILL_IN_BLANK = 'FILL_IN_BLANK',
  SELECT_ALL = 'SELECT_ALL',
}

export interface Question {
  type: QuestionType;
  question: string;
  options: string[];
  correctAnswer: string | string[];
  moduleCode: string;
  explanation?: string;
}

export interface Quiz {
  id?: string;
  title: string;
  questions: Question[];
  moduleCode: string;
  isDraft: boolean;
  createdAt?: Date;
  updatedAt?: Date;
} 