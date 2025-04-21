import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Question, Quiz } from '@/types/quiz';

interface QuizState {
  currentQuiz: Quiz | null;
  draftQuizzes: Quiz[];
  addQuestion: (question: Question) => void;
  updateQuestion: (index: number, question: Question) => void;
  removeQuestion: (index: number) => void;
  setQuizTitle: (title: string) => void;
  saveQuizDraft: (moduleCode: string) => void;
  loadDraftQuiz: (moduleCode: string, quizId: string) => void;
  clearCurrentQuiz: () => void;
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set) => ({
      currentQuiz: null,
      draftQuizzes: [],

      addQuestion: (question) =>
        set((state) => ({
          currentQuiz: {
            ...state.currentQuiz!,
            questions: [...(state.currentQuiz?.questions || []), question],
          },
        })),

      updateQuestion: (index, question) =>
        set((state) => ({
          currentQuiz: {
            ...state.currentQuiz!,
            questions: state.currentQuiz!.questions.map((q, i) =>
              i === index ? question : q
            ),
          },
        })),

      removeQuestion: (index) =>
        set((state) => ({
          currentQuiz: {
            ...state.currentQuiz!,
            questions: state.currentQuiz!.questions.filter((_, i) => i !== index),
          },
        })),

      setQuizTitle: (title) =>
        set((state) => ({
          currentQuiz: {
            ...state.currentQuiz!,
            title,
          },
        })),

      saveQuizDraft: (moduleCode) =>
        set((state) => {
          const newQuiz: Quiz = {
            ...state.currentQuiz!,
            moduleCode,
            isDraft: true,
            id: state.currentQuiz?.id || crypto.randomUUID(),
            createdAt: state.currentQuiz?.createdAt || new Date(),
            updatedAt: new Date(),
          };

          return {
            draftQuizzes: [
              ...state.draftQuizzes.filter((q) => q.id !== newQuiz.id),
              newQuiz,
            ],
            currentQuiz: null,
          };
        }),

      loadDraftQuiz: (moduleCode, quizId) =>
        set((state) => ({
          currentQuiz:
            state.draftQuizzes.find(
              (q) => q.moduleCode === moduleCode && q.id === quizId
            ) || null,
        })),

      clearCurrentQuiz: () =>
        set({
          currentQuiz: null,
        }),
    }),
    {
      name: 'quiz-storage',
    }
  )
); 