import { currentUser, mockQuizzes, mockResults, mockRewards } from "@/lib/mock-data"

export default function DashboardPage() {
  const renderStudentDashboard = () => (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Student Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Available Quizzes */}
        <div className="rounded-lg border p-4">
          <h2 className="text-xl font-semibold mb-4">Available Quizzes</h2>
          <div className="space-y-2">
            {mockQuizzes.filter(q => q.available).map(quiz => (
              <div key={quiz.id} className="rounded border p-2">
                <p className="font-medium">{quiz.title}</p>
                <p className="text-sm text-muted-foreground">
                  {quiz.duration} mins • {quiz.questions} questions
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Results */}
        <div className="rounded-lg border p-4">
          <h2 className="text-xl font-semibold mb-4">Recent Results</h2>
          <div className="space-y-2">
            {mockResults.map(result => (
              <div key={result.id} className="rounded border p-2">
                <p className="font-medium">{result.quizTitle}</p>
                <p className="text-sm text-muted-foreground">
                  Score: {result.score}% • {result.completedAt}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Rewards */}
        <div className="rounded-lg border p-4">
          <h2 className="text-xl font-semibold mb-4">Rewards</h2>
          <p className="text-2xl font-bold mb-2">{mockRewards.totalPoints} Points</p>
          <div className="space-y-2">
            {mockRewards.recentAchievements.map(achievement => (
              <div key={achievement.id} className="rounded border p-2">
                <p className="font-medium">{achievement.title}</p>
                <p className="text-sm text-muted-foreground">
                  +{achievement.points} points • {achievement.date}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderInstructorDashboard = () => (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Instructor Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* Manage Quizzes */}
        <div className="rounded-lg border p-4">
          <h2 className="text-xl font-semibold mb-4">Your Quizzes</h2>
          <div className="space-y-2">
            {mockQuizzes.map(quiz => (
              <div key={quiz.id} className="rounded border p-2">
                <p className="font-medium">{quiz.title}</p>
                <p className="text-sm text-muted-foreground">
                  Status: {quiz.available ? 'Available' : 'Draft'}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-lg border p-4">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <button className="w-full rounded-lg bg-primary px-4 py-2 text-primary-foreground">
              Create New Quiz
            </button>
            <button className="w-full rounded-lg border px-4 py-2">
              View Student Results
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderAdminDashboard = () => (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* System Overview */}
        <div className="rounded-lg border p-4">
          <h2 className="text-xl font-semibold mb-4">System Overview</h2>
          <div className="space-y-2">
            <div className="rounded border p-2">
              <p className="font-medium">Total Users</p>
              <p className="text-2xl font-bold">150</p>
            </div>
            <div className="rounded border p-2">
              <p className="font-medium">Active Quizzes</p>
              <p className="text-2xl font-bold">{mockQuizzes.length}</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-lg border p-4">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <button className="w-full rounded-lg bg-primary px-4 py-2 text-primary-foreground">
              Manage Users
            </button>
            <button className="w-full rounded-lg border px-4 py-2">
              System Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const dashboardByRole = {
    STUDENT: renderStudentDashboard,
    INSTRUCTOR: renderInstructorDashboard,
    ADMIN: renderAdminDashboard,
  }

  return dashboardByRole[currentUser.role]()
} 