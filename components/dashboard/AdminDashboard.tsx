import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface PlatformStats {
  totalUsers: number
  activeUsers: number
  totalCourses: number
  activeCourses: number
  systemHealth: number
  recentRegistrations: {
    name: string
    role: 'student' | 'instructor'
    date: string
  }[]
  systemAlerts: {
    type: 'error' | 'warning' | 'info'
    message: string
    date: string
  }[]
}

const dummyStats: PlatformStats = {
  totalUsers: 2500,
  activeUsers: 1800,
  totalCourses: 45,
  activeCourses: 38,
  systemHealth: 98,
  recentRegistrations: [
    {
      name: "Alice Johnson",
      role: "student",
      date: "2024-03-24"
    },
    {
      name: "Dr. Robert Smith",
      role: "instructor",
      date: "2024-03-23"
    }
  ],
  systemAlerts: [
    {
      type: "warning",
      message: "High server load detected",
      date: "2024-03-24"
    },
    {
      type: "info",
      message: "Daily backup completed successfully",
      date: "2024-03-24"
    }
  ]
}

export function AdminDashboard() {
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="users">Users</TabsTrigger>
        <TabsTrigger value="system">System</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Platform Statistics</CardTitle>
              <CardDescription>Overall platform usage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-2xl font-bold">{dummyStats.totalUsers}</p>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{dummyStats.totalCourses}</p>
                  <p className="text-sm text-muted-foreground">Total Courses</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Active Users</p>
                  <Progress 
                    value={(dummyStats.activeUsers / dummyStats.totalUsers) * 100} 
                    className="h-2 mt-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Health</CardTitle>
              <CardDescription>Current system status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-2xl font-bold">{dummyStats.systemHealth}%</p>
                  <p className="text-sm text-muted-foreground">System Performance</p>
                </div>
                <Progress value={dummyStats.systemHealth} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Alerts</CardTitle>
              <CardDescription>System notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dummyStats.systemAlerts.map((alert, index) => (
                  <div key={index} className="flex flex-col space-y-1">
                    <span className={`text-sm font-medium ${
                      alert.type === 'error' ? 'text-red-500' :
                      alert.type === 'warning' ? 'text-yellow-500' :
                      'text-blue-500'
                    }`}>
                      {alert.type.toUpperCase()}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {alert.message}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {alert.date}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="users" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>Recent user registrations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dummyStats.recentRegistrations.map((registration, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">{registration.name}</p>
                    <p className="text-sm text-muted-foreground capitalize">
                      {registration.role}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {registration.date}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="system" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>System Performance</CardTitle>
              <CardDescription>Current system metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium">System Health</p>
                  <Progress value={dummyStats.systemHealth} className="h-2 mt-2" />
                </div>
                <div>
                  <p className="text-sm font-medium">Active Courses</p>
                  <Progress 
                    value={(dummyStats.activeCourses / dummyStats.totalCourses) * 100} 
                    className="h-2 mt-2" 
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Alerts</CardTitle>
              <CardDescription>Recent system notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dummyStats.systemAlerts.map((alert, index) => (
                  <div key={index} className="flex flex-col space-y-1">
                    <span className={`text-sm font-medium ${
                      alert.type === 'error' ? 'text-red-500' :
                      alert.type === 'warning' ? 'text-yellow-500' :
                      'text-blue-500'
                    }`}>
                      {alert.message}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {alert.date}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="reports" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Analytics Reports</CardTitle>
            <CardDescription>Platform usage statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium">User Engagement</p>
                <p className="text-2xl font-bold">
                  {((dummyStats.activeUsers / dummyStats.totalUsers) * 100).toFixed(1)}%
                </p>
                <p className="text-sm text-muted-foreground">
                  Active users: {dummyStats.activeUsers} / Total users: {dummyStats.totalUsers}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Course Utilization</p>
                <p className="text-2xl font-bold">
                  {((dummyStats.activeCourses / dummyStats.totalCourses) * 100).toFixed(1)}%
                </p>
                <p className="text-sm text-muted-foreground">
                  Active courses: {dummyStats.activeCourses} / Total courses: {dummyStats.totalCourses}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
} 