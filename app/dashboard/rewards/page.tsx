import { currentUser, mockRewards } from "@/lib/mock-data"
import { Trophy, Star, Calendar } from "lucide-react"

export default function RewardsPage() {
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
        <h1 className="text-3xl font-bold">My Rewards</h1>
      </div>

      {/* Points Overview */}
      <div className="rounded-lg border bg-card p-6">
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-primary/10 p-3">
            <Trophy className="h-8 w-8 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Points</p>
            <h2 className="text-3xl font-bold">{mockRewards.totalPoints}</h2>
          </div>
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Recent Achievements</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockRewards.recentAchievements.map((achievement) => (
            <div key={achievement.id} className="rounded-lg border p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <h3 className="font-medium">{achievement.title}</h3>
                </div>
                <span className="text-sm font-medium text-primary">+{achievement.points}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{achievement.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {mockRewards.recentAchievements.length === 0 && (
        <div className="flex h-[30vh] items-center justify-center rounded-lg border">
          <p className="text-lg text-muted-foreground">No achievements yet</p>
        </div>
      )}
    </div>
  )
} 