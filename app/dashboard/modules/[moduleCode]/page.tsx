"use client";

import { use, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateQuizModal } from "@/components/modules/CreateQuizModal";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, FileText, PlusCircle } from "lucide-react";

interface Student {
  id: string;
  name: string;
  email: string;
  progress: number;
  averageScore: number;
}

interface Quiz {
  id: string;
  title: string;
  type: "draft" | "published";
  questions: number;
  submissions: number;
  averageScore: number;
}

const studentColumns: ColumnDef<Student>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "progress",
    header: "Progress",
    cell: ({ row }) => (
      <div className="h-2.5 w-full rounded-full bg-gray-200">
        <div
          className="bg-primary h-2.5 rounded-full"
          style={{ width: `${row.original.progress}%` }}
        />
      </div>
    ),
  },
  {
    accessorKey: "averageScore",
    header: "Average Score",
    cell: ({ row }) => `${row.original.averageScore}%`,
  },
];

const quizColumns: ColumnDef<Quiz>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "type",
    header: "Status",
    cell: ({ row }) => (
      <span
        className={
          row.original.type === "draft" ? "text-yellow-600" : "text-green-600"
        }
      >
        {row.original.type.charAt(0).toUpperCase() + row.original.type.slice(1)}
      </span>
    ),
  },
  {
    accessorKey: "questions",
    header: "Questions",
  },
  {
    accessorKey: "submissions",
    header: "Submissions",
  },
  {
    accessorKey: "averageScore",
    header: "Average Score",
    cell: ({ row }) => `${row.original.averageScore}%`,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <Button variant="ghost" size="icon">
        <Eye className="h-4 w-4" />
      </Button>
    ),
  },
];

// TODO: Replace with actual data fetching
const mockStudents: Student[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    progress: 75,
    averageScore: 85,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    progress: 90,
    averageScore: 92,
  },
];

const mockQuizzes: Quiz[] = [
  {
    id: "1",
    title: "Midterm Quiz",
    type: "published",
    questions: 10,
    submissions: 45,
    averageScore: 78,
  },
  {
    id: "2",
    title: "Final Review",
    type: "draft",
    questions: 15,
    submissions: 0,
    averageScore: 0,
  },
];
type Params = Promise<{ moduleCode: string }>;

export default function ModuleDetailPage(props: { params: Params }) {
  const params = use(props.params);
  const { moduleCode } = params;
  const [isCreateQuizModalOpen, setIsCreateQuizModalOpen] = useState(false);

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Module: {moduleCode}</h1>
          <p className="text-muted-foreground mt-1">
            Manage module content and monitor student progress
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Add Material
          </Button>
          <Button onClick={() => setIsCreateQuizModalOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Quiz
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
          <TabsTrigger value="materials">Learning Materials</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Enrolled Students</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{mockStudents.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Active Quizzes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {mockQuizzes.filter((q) => q.type === "published").length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Average Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">82%</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="students">
          <Card>
            <CardHeader>
              <CardTitle>Enrolled Students</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable columns={studentColumns} data={mockStudents} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quizzes">
          <Card>
            <CardHeader>
              <CardTitle>Quizzes</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable columns={quizColumns} data={mockQuizzes} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="materials">
          <Card>
            <CardHeader>
              <CardTitle>Learning Materials</CardTitle>
            </CardHeader>
            <CardContent>
              {/* TODO: Add learning materials list */}
              <p className="text-muted-foreground">
                No materials uploaded yet.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <CreateQuizModal
        open={isCreateQuizModalOpen}
        onOpenChange={setIsCreateQuizModalOpen}
        moduleCode={moduleCode}
      />
    </div>
  );
}
