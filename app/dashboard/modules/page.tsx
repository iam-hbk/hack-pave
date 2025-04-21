'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { PlusCircle, Search } from 'lucide-react';

// TODO: Replace with actual module type from your schema
interface Module {
  code: string;
  title: string;
  description: string;
  enrolledCount: number;
  quizCount: number;
}

// TODO: Replace with actual data fetching
const mockModules: Module[] = [
  {
    code: 'IFS03A1',
    title: 'Information Systems',
    description: 'Database security and management',
    enrolledCount: 45,
    quizCount: 3,
  },
  {
    code: 'DEV03A1',
    title: 'Development of Software',
    description: 'Multitier architecture and design patterns',
    enrolledCount: 32,
    quizCount: 5,
  },
];

export default function ModulesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [modules, setModules] = useState<Module[]>(mockModules);

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">My Modules</h1>
          <p className="text-muted-foreground mt-1">
            Manage your teaching modules and course materials
          </p>
        </div>
        {/* <Button>
          <PlusCircle className="h-4 w-4 mr-2" />
          Create Module
        </Button> */}
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search modules..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {modules.map((module) => (
          <Link href={`/dashboard/modules/${module.code}`} key={module.code}>
            <Card className="hover:bg-accent/50 transition-colors">
              <CardHeader>
                <CardTitle>{module.title}</CardTitle>
                <CardDescription>{module.code}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {module.description}
                </p>
                <div className="flex justify-between text-sm">
                  <span>{module.enrolledCount} students</span>
                  <span>{module.quizCount} quizzes</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
} 