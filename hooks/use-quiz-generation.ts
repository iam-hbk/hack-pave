'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Question } from '@/types/quiz';
import { useQuizStore } from '@/store/use-quiz-store';

interface APIResponse {
  object: Question[];
  finishReason: string;
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

async function generateQuestions(file: File): Promise<Question[]> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/api/quiz/generate', {
    method: 'POST',
    body: formData,
  });

  const data: APIResponse = await response.json();

  if (!response.ok) {
    throw new Error('Failed to generate questions');
  }

  if (!data.object || !Array.isArray(data.object)) {
    throw new Error('Invalid response format from AI service');
  }

  // Add moduleCode to each question
  const questions = data.object.map(question => ({
    ...question,
    moduleCode: file.name.split('.')[0], // Use filename as moduleCode
  }));

  return questions;
}

export function useQuizGeneration() {
  const setQuestions = useQuizStore((state) => state.setQuestions);

  return useMutation({
    mutationFn: generateQuestions,
    onSuccess: (data) => {
      setQuestions(data);
    },
    onError: (error: Error) => {
      toast.error('Generation Failed', {
        description: error.message || 'Failed to generate questions. Please try again.',
      });
    },
  });
} 