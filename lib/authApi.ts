export type UserRole = 'STUDENT' | 'INSTRUCTOR' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function simulateLogin(
  email: string,
  password: string,
  role: UserRole
): Promise<User> {
  // Simulate network delay
  await delay(2000);

  // Simulate login failure
  if (password === 'fail') {
    throw new Error('Invalid credentials');
  }

  // Generate a name from the email
  const name = email.split('@')[0]
    .split('.')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

  // Return dummy user data based on role
  return {
    id: `${role}123`,
    name,
    email,
    role,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
  };
}

export async function simulateLogout(): Promise<void> {
  // Simulate short network delay
  await delay(500);
  return Promise.resolve();
} 