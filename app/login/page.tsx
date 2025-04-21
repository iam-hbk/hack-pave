import { getUser } from "@/lib/dal";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/login-form";
import Image from "next/image";

type Params = Promise<{ callbackUrl?: string }>;
export default async function LoginPage({
  searchParams,
}: {
  searchParams: Params;
}) {
  // Check if already authenticated
  const user = await getUser();
  if (user) {
    redirect("/dashboard");
  }

  const { callbackUrl = "/dashboard" } = (await searchParams) || {};

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center justify-center">
          <Image src="/PAVE_Logo.svg" alt="Logo" width={100} height={100} />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <LoginForm callbackUrl={callbackUrl} />
      </div>
    </div>
  );
}
