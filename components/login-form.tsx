'use client';

import { useActionState } from 'react';
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
import { UserRole } from '@/lib/dal';

// Define the initial state
const initialState = {
  error: null as string | null
};

export function LoginForm({
  callbackUrl = '/dashboard'
}: {
  callbackUrl?: string;
}) {
  const [state, formAction] = useActionState(login, initialState);

  return (
    <form action={formAction} className="mt-8 space-y-6">
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

      {state.error && (
        <div className="rounded-md bg-destructive/10 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-destructive">
                Login failed
              </h3>
              <div className="mt-2 text-sm text-destructive">
                {state.error}
              </div>
            </div>
          </div>
        </div>
      )}

      <Button type="submit" className="w-full">
        Sign in
      </Button>
    </form>
  );
} 