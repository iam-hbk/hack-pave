'use client';

import { createContext, useContext, useCallback } from 'react';
import { User } from '@/lib/dal';

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser: User | null;
}) {
  // We don't need useState since we're using server data
  // and only updating on login/logout via full page navigation
  
  const setUser = useCallback((user: User | null) => {
    // This will trigger a full page navigation/refresh via the server action
    // so we don't need to manage local state
  }, []);

  return (
    <UserContext.Provider value={{ user: initialUser, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
} 