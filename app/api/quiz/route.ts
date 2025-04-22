import { NextResponse } from 'next/server';
import { Quiz } from '@/types/quiz';

export async function POST(req: Request) {
  try {
    const quiz = await req.json();

    // Make the API call to the backend
    const response = await fetch(`${process.env.NEXT_BACKEND_URL}/quizzes/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: quiz.title,
        description: '', // Add this to the Quiz type if needed
        time_limit: 0, // Add this to the Quiz type if needed
        questions: quiz.questions.map((q: any) => ({
          text: q.question,
          type: q.type,
          options: q.options.map((option: string) => ({
            text: option,
            is_correct: Array.isArray(q.correctAnswer) 
              ? q.correctAnswer.includes(option)
              : q.correctAnswer === option,
          })),
          explanation: q.explanation,
        })),
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to save quiz');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error saving quiz:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to save quiz' },
      { status: 500 }
    );
  }
} 