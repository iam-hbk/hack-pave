import { getUser } from '@/lib/dal';
import { redirect } from 'next/navigation';
import { StudentDashboard } from '@/components/dashboard/StudentDashboard';
import { InstructorDashboard } from '@/components/dashboard/InstructorDashboard';
import { AdminDashboard } from '@/components/dashboard/AdminDashboard';

export default async function DashboardPage() {
  const user = await getUser();

  if (!user) {
    redirect('/login');
  }

  const getDashboardContent = () => {
    switch (user.role) {
      case 'STUDENT':
        return <StudentDashboard />;
      case 'INSTRUCTOR':
        return <InstructorDashboard />;
      case 'ADMIN':
        return <AdminDashboard />;
      default:
        return (
          <div className="text-center p-8">
            <h2 className="text-xl font-semibold">Invalid Role</h2>
            <p className="text-muted-foreground mt-2">
              Please contact an administrator to fix your account role.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome, {user.name}!</h1>
      </div>
      {getDashboardContent()}
    </div>
  );
} 