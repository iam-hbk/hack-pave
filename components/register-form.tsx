'use client';

import { useTransition } from 'react';
import { register } from '@/app/actions/auth';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export function RegisterForm({
  callbackUrl = '/dashboard'
}: {
  callbackUrl?: string;
}) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [showPasswords, setShowPasswords] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // Validate passwords match
    const password1 = formData.get('password1') as string;
    const password2 = formData.get('password2') as string;
    
    if (password1 !== password2) {
      setError('Passwords do not match');
      return;
    }

    startTransition(async () => {
      const result = await register(formData);
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
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            required
            placeholder="Enter your username"
          />
        </div>

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
          <Label htmlFor="password1">Password</Label>
          <div className="relative">
            <Input
              id="password1"
              name="password1"
              type={showPasswords ? "text" : "password"}
              autoComplete="new-password"
              required
              placeholder="Enter your password"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPasswords(!showPasswords)}
            >
              {showPasswords ? (
                <EyeOff className="h-4 w-4 text-gray-400" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400" />
              )}
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password2">Confirm Password</Label>
          <div className="relative">
            <Input
              id="password2"
              name="password2"
              type={showPasswords ? "text" : "password"}
              autoComplete="new-password"
              required
              placeholder="Confirm your password"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPasswords(!showPasswords)}
            >
              {showPasswords ? (
                <EyeOff className="h-4 w-4 text-gray-400" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-md bg-destructive/10 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-destructive">
                Registration failed
              </h3>
              <div className="mt-2 text-sm text-destructive">
                {error}
              </div>
            </div>
          </div>
        </div>
      )}

      <Button type="submit" className="w-full cursor-pointer" disabled={isPending}>
        {isPending ? <><Loader className="w-4 h-4 mr-2 animate-spin" />Creating account...</> : 'Create account'}
      </Button>
    </form>
  );
} 