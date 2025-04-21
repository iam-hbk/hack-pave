import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Course {
  id: string
  title: string
  studentsCount: number
  averageProgress: number
  pendingAssignments: number
  recentActivity: {
    type: 'submission' | 'question' | 'feedback'
    student: string
    description: string
    date: string
  }[]
}

const dummyCourses: Course[] = [
  {
    id: '1',
    title: 'Introduction to Programming',
    studentsCount: 45,
    averageProgress: 65,
    pendingAssignments: 12,
    recentActivity: [
      {
        type: 'submission',
        student: 'John Doe',
        description: 'Submitted Variables Exercise',
        date: '2024-03-24'
      },
      {
        type: 'question',
        student: 'Jane Smith',
        description: 'Asked about loops concept',
        date: '2024-03-23'
      }
    ]
  },
  {
    id: '2',
    title: 'Web Development Basics',
    studentsCount: 38,
    averageProgress: 45,
    pendingAssignments: 8,
    recentActivity: [
      {
        type: 'feedback',
        student: 'Mike Johnson',
        description: 'Requested feedback on project',
        date: '2024-03-24'
      }
    ]
  }
]

export function InstructorDashboard() {
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="courses">My Courses</TabsTrigger>
        <TabsTrigger value="assignments">Assignments</TabsTrigger>
        <TabsTrigger value="activity">Recent Activity</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Course Statistics</CardTitle>
              <CardDescription>Overview of your courses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-2xl font-bold">{dummyCourses.length}</p>
                  <p className="text-sm text-muted-foreground">Active Courses</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {dummyCourses.reduce((acc, course) => acc + course.studentsCount, 0)}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Students</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pending Reviews</CardTitle>
              <CardDescription>Assignments needing attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dummyCourses.map((course) => (
                  <div key={course.id} className="flex justify-between items-center">
                    <span className="text-sm font-medium">{course.title}</span>
                    <span className="text-sm text-muted-foreground">
                      {course.pendingAssignments} pending
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Course Progress</CardTitle>
              <CardDescription>Average student progress</CardDescription>
            </CardHeader>
            <CardContent>
              {dummyCourses.map((course) => (
                <div key={course.id} className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium">{course.title}</p>
                    <span className="text-sm text-muted-foreground">
                      {course.averageProgress}%
                    </span>
                  </div>
                  <Progress value={course.averageProgress} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="courses" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          {dummyCourses.map((course) => (
            <Card key={course.id}>
              <CardHeader>
                <CardTitle>{course.title}</CardTitle>
                <CardDescription>
                  {course.studentsCount} students enrolled
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium">Average Progress</p>
                    <Progress value={course.averageProgress} className="h-2 mt-2" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Pending Assignments</p>
                    <p className="text-sm text-muted-foreground">
                      {course.pendingAssignments} assignments need review
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="assignments" className="space-y-4">
        <div className="grid gap-4">
          {dummyCourses.map((course) => (
            <Card key={course.id}>
              <CardHeader>
                <CardTitle>{course.title}</CardTitle>
                <CardDescription>
                  {course.pendingAssignments} assignments pending review
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    You have {course.pendingAssignments} assignments that need grading
                  </p>
                  <button className="text-sm text-primary hover:underline">
                    Review Assignments
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="activity" className="space-y-4">
        <div className="grid gap-4">
          {dummyCourses.map((course) => (
            <Card key={course.id}>
              <CardHeader>
                <CardTitle>{course.title}</CardTitle>
                <CardDescription>Recent student activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {course.recentActivity.map((activity, index) => (
                    <div key={index} className="flex flex-col space-y-1">
                      <span className="text-sm font-medium">{activity.student}</span>
                      <span className="text-sm text-muted-foreground">
                        {activity.description}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {activity.date}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  )
} 