'use client';

import { useTransition } from 'react';
import { login } from '@/app/actions/auth';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { UserRole } from '@/lib/authApi';
import { useState } from 'react';
import { Loader } from 'lucide-react';

export function LoginForm({
  callbackUrl = '/dashboard'
}: {
  callbackUrl?: string;
}) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    startTransition(async () => {
      const result = await login(formData);
      if (result?.error) {
        setError(result.error);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="Enter your email"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            placeholder="Enter your password"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="role">Role (For Testing)</Label>
          <Select name="role" defaultValue="STUDENT">
            <SelectTrigger>
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="STUDENT">Student</SelectItem>
              <SelectItem value="INSTRUCTOR">Instructor</SelectItem>
              <SelectItem value="ADMIN">Admin</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Use this to simulate different user roles
          </p>
        </div>
      </div>

      {error && (
        <div className="rounded-md bg-destructive/10 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-destructive">
                Login failed
              </h3>
              <div className="mt-2 text-sm text-destructive">
                {error}
              </div>
            </div>
          </div>
        </div>
      )}

      <Button type="submit" className="w-full cursor-pointer" disabled={isPending} >
        {isPending ? <><Loader className="w-4 h-4 mr-2 animate-spin" />Signing in...</> : 'Sign in'}
      </Button>
    </form>
  );
} 