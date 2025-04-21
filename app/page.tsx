import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Logo3D from "@/components/logo3D";
import { LandingPageNav } from "@/components/landing-page-nav";
import { getUser } from "@/lib/dal";

export default async function Home() {
  const user = await getUser();

  return (
    <div className="animated-gradient-bg min-h-screen">
      <LandingPageNav user={user} />
      {/* Hero Section */}
      <section className="container mx-auto flex h-screen w-full flex-col items-center justify-center gap-8 text-center md:flex-row-reverse">
        <div className="flex items-center justify-center">
          <Logo3D />
        </div>
        <div className="flex flex-col items-center">
          <h1 className="mb-6 max-w-xl text-2xl font-bold text-gray-300 md:text-4xl">
            <span className="text-[#FFD700]">P</span>ersonalized{" "}
            <span className="text-[#FF5757]">A</span>cademic{" "}
            <span className="text-[#7B3FF0]">V</span>irtual{" "}
            <span className="text-[#4A90E2]">E</span>nvironment
          </h1>
          <p className="mx-auto mb-12 max-w-2xl text-xl text-gray-200">
            Transform your learning experience with PAVE - where AI-powered
            personalization meets academic excellence. Engage, learn, and
            succeed on your terms.
          </p>
          <div className="space-x-4">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90"
            >
              <Link href="/dashboard">Start Learning</Link>
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-16 text-center text-3xl font-bold">
            Why Choose PAVE?
          </h2>
          <div className="grid gap-12 md:grid-cols-3">
            <div className="text-center">
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-xl font-semibold">
                  AI-Powered Learning
                </h3>
                <p className="text-gray-600">
                  Instantly generate quizzes from your study materials and
                  receive personalized learning recommendations
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-xl font-semibold">
                  Engagement Rewards
                </h3>
                <p className="text-gray-600">
                  Earn PAVE Coins for participation and excellence in your
                  academic journey
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-xl font-semibold">Smart Attendance</h3>
                <p className="text-gray-600">
                  Seamless QR-code based attendance tracking with real-time
                  analytics
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-8 text-3xl font-bold text-white">
            Ready to revolutionize your learning experience?
          </h2>
          <Button
            size="lg"
            variant="secondary"
            className="bg-white text-purple-600 hover:bg-gray-100"
          >
            Join PAVE Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 text-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <Image
                src="/Pave_Logo.svg"
                alt="Pave Logo"
                width={100}
                height={30}
                className="mb-4"
                priority
              />
              <p className="text-gray-400">
                Your personalized path to academic success
              </p>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>AI Quiz Generation</li>
                <li>Attendance Tracking</li>
                <li>Performance Analytics</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Student Guide</li>
                <li>Help Center</li>
                <li>FAQs</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Contact Us</li>
                <li>Documentation</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>© 2024 PAVE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
