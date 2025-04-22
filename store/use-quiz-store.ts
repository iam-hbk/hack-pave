import { create } from 'zustand';
import { Question } from '@/types/quiz';

interface QuizState {
  questions: Question[];
  setQuestions: (questions: Question[]) => void;
  clearQuestions: () => void;
}

export const useQuizStore = create<QuizState>((set) => ({
  questions: [],
  setQuestions: (questions) => set({ questions }),
  clearQuestions: () => set({ questions: [] }),
})); 