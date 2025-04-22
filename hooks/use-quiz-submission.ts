"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Quiz } from "@/types/quiz";
// import { BACKEND_URL } from '@/lib/api-url';

const API_URL =
  process.env.NEXT_BACKEND_URL ?? "https://pave-django-3zd6n.kinsta.app/api";

async function submitQuiz(quiz: Quiz) {
  console.log("Submitting quiz to API_URL:", API_URL);
  const response = await fetch(`${API_URL}/quizzes/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(quiz),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to save quiz");
  }

  const data = await response.json();
  return data;
}

export function useQuizSubmission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitQuiz,
    onSuccess: () => {
      toast.success("Quiz saved successfully");
      // Invalidate the quizzes list query to trigger a refetch
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });
    },
    onError: (error: Error) => {
      toast.error("Failed to save quiz", {
        description: error.message || "Please try again",
      });
    },
  });
}
