import { currentUser, mockQuizzes } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Clock, FileQuestion } from "lucide-react"

export default function QuizzesPage() {
  if (currentUser.role !== 'STUDENT') {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <p className="text-lg text-muted-foreground">Access Denied</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Available Quizzes</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockQuizzes.filter(q => q.available).map((quiz) => (
          <div key={quiz.id} className="rounded-lg border p-6 space-y-4">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">{quiz.title}</h2>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{quiz.duration} mins</span>
                </div>
                <div className="flex items-center gap-1">
                  <FileQuestion className="h-4 w-4" />
                  <span>{quiz.questions} questions</span>
                </div>
              </div>
            </div>
            <Button className="w-full">Start Quiz</Button>
          </div>
        ))}
      </div>

      {mockQuizzes.filter(q => q.available).length === 0 && (
        <div className="flex h-[30vh] items-center justify-center rounded-lg border">
          <p className="text-lg text-muted-foreground">No quizzes available at the moment</p>
        </div>
      )}
    </div>
  )
} 