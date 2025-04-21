import { User, NavigationItem } from "./types";

// Mock current user - this would normally come from authentication
export const mockUser: User = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  role: "STUDENT",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
};
export const mockInstructor: User = {
  id: "2",
  name: "Jane Smith",
  email: "jane@example.com",
  role: "INSTRUCTOR",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
};
export const mockAdmin: User = {
  id: "3",
  name: "Admin User",
  email: "admin@example.com",
  role: "ADMIN",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin",
};

// Navigation items by role
export const navigationItems: Record<string, NavigationItem[]> = {
  STUDENT: [
    { title: "Dashboard", href: "/dashboard", icon: "home" },
    { title: "Available Quizzes", href: "/dashboard/quizzes", icon: "book" },
    { title: "My Results", href: "/dashboard/results", icon: "chart" },
    { title: "Rewards", href: "/dashboard/rewards", icon: "trophy" },
  ],
  INSTRUCTOR: [
    { title: "Dashboard", href: "/dashboard", icon: "home" },
    {
      title: "Manage Modules",
      href: "/dashboard/modules",
      icon: "manage-modules",
    },
    {
      title: "Manage Quizzes",
      href: "/dashboard/manage-quizzes",
      icon: "list",
    },
    {
      title: "Student Results",
      href: "/dashboard/student-results",
      icon: "chart",
    },
  ],
  ADMIN: [
    { title: "Dashboard", href: "/dashboard", icon: "home" },
    { title: "User Management", href: "/dashboard/users", icon: "users" },
    { title: "All Quizzes", href: "/dashboard/all-quizzes", icon: "database" },
    { title: "System Settings", href: "/dashboard/settings", icon: "settings" },
  ],
};

// Mock quizzes
export const mockQuizzes = [
  {
    id: "1",
    title: "Introduction to React",
    duration: 30,
    questions: 10,
    available: true,
  },
  {
    id: "2",
    title: "Advanced JavaScript",
    duration: 45,
    questions: 15,
    available: true,
  },
  {
    id: "3",
    title: "Python Basics",
    duration: 25,
    questions: 8,
    available: false,
  },
];

// Mock results
export const mockResults = [
  {
    id: "1",
    quizTitle: "Introduction to React",
    score: 85,
    totalQuestions: 10,
    completedAt: "2024-03-20",
  },
  {
    id: "2",
    quizTitle: "JavaScript Fundamentals",
    score: 92,
    totalQuestions: 15,
    completedAt: "2024-03-18",
  },
];

// Mock rewards
export const mockRewards = {
  totalPoints: 1250,
  recentAchievements: [
    { id: "1", title: "Perfect Score", points: 100, date: "2024-03-20" },
    { id: "2", title: "Quick Learner", points: 50, date: "2024-03-18" },
  ],
};
