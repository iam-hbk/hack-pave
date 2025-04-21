import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Course {
  id: string
  title: string
  progress: number
  nextLesson: string
  assignments: {
    title: string
    dueDate: string
    status: 'pending' | 'submitted' | 'graded'
  }[]
}

const dummyCourses: Course[] = [
  {
    id: '1',
    title: 'Introduction to Programming',
    progress: 65,
    nextLesson: 'Functions and Methods',
    assignments: [
      { title: 'Variables Exercise', dueDate: '2024-03-25', status: 'graded' },
      { title: 'Loops Challenge', dueDate: '2024-03-28', status: 'pending' }
    ]
  },
  {
    id: '2',
    title: 'Web Development Basics',
    progress: 30,
    nextLesson: 'CSS Layouts',
    assignments: [
      { title: 'HTML Structure', dueDate: '2024-03-26', status: 'submitted' },
      { title: 'CSS Styling', dueDate: '2024-03-29', status: 'pending' }
    ]
  }
]

export function StudentDashboard() {
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="courses">My Courses</TabsTrigger>
        <TabsTrigger value="assignments">Assignments</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Course Progress</CardTitle>
              <CardDescription>Your overall learning progress</CardDescription>
            </CardHeader>
            <CardContent>
              {dummyCourses.map((course) => (
                <div key={course.id} className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium">{course.title}</p>
                    <span className="text-sm text-muted-foreground">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Next Lessons</CardTitle>
              <CardDescription>Upcoming content in your courses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dummyCourses.map((course) => (
                  <div key={course.id} className="flex flex-col">
                    <span className="text-sm font-medium">{course.title}</span>
                    <span className="text-sm text-muted-foreground">{course.nextLesson}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Due Assignments</CardTitle>
              <CardDescription>Upcoming deadlines</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dummyCourses.flatMap((course) => 
                  course.assignments
                    .filter((assignment) => assignment.status === 'pending')
                    .map((assignment) => (
                      <div key={`${course.id}-${assignment.title}`} className="flex flex-col">
                        <span className="text-sm font-medium">{assignment.title}</span>
                        <span className="text-sm text-muted-foreground">Due: {assignment.dueDate}</span>
                      </div>
                    ))
                )}
              </div>
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
                <CardDescription>Progress: {course.progress}%</CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={course.progress} className="h-2 mb-4" />
                <p className="text-sm font-medium">Next Lesson: {course.nextLesson}</p>
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
                <CardDescription>Assignment Status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {course.assignments.map((assignment) => (
                    <div key={assignment.title} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{assignment.title}</p>
                        <p className="text-sm text-muted-foreground">Due: {assignment.dueDate}</p>
                      </div>
                      <span className="text-sm capitalize">{assignment.status}</span>
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