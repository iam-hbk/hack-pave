import { currentUser, mockResults } from "@/lib/mock-data"
import { BarChart, Calendar } from "lucide-react"

export default function ResultsPage() {
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
        <h1 className="text-3xl font-bold">My Results</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockResults.map((result) => (
          <div key={result.id} className="rounded-lg border p-6 space-y-4">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">{result.quizTitle}</h2>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <BarChart className="h-4 w-4" />
                  <span>Score: {result.score}%</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{result.completedAt}</span>
                </div>
              </div>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div 
                className="h-full bg-primary" 
                style={{ width: `${result.score}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              {result.score >= 80 ? 'Excellent work!' : 
               result.score >= 60 ? 'Good effort!' : 
               'Keep practicing!'}
            </p>
          </div>
        ))}
      </div>

      {mockResults.length === 0 && (
        <div className="flex h-[30vh] items-center justify-center rounded-lg border">
          <p className="text-lg text-muted-foreground">No quiz results yet</p>
        </div>
      )}
    </div>
  )
} 