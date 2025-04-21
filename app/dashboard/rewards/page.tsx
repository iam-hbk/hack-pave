'use client';

import { useUser } from '@/providers/user-provider';

export default function RewardsPage() {
  const { user } = useUser();

  if (!user) {
    return null; // or some loading state
  }

  if (user.role !== 'STUDENT') {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold">Access Denied</h1>
        <p>Only students can access rewards.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Rewards for {user.name}</h1>
      <div className="mt-4">
        {/* Add your rewards UI here */}
        <p>Your rewards will appear here</p>
      </div>
    </div>
  );
} 