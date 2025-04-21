import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Logo3D from "@/components/logo3D";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Marketing Navigation */}
      <nav className="w-full p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="w-32">
            <Image
              src="/Pave_Logo.svg"
              alt="Pave Logo"
              width={120}
              height={40}
              priority
            />
          </div>
          <div className="space-x-6">
            <Link href="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex justify-center items-center">
        <Logo3D />
      </div>
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Your Personalized Academic Virtual Environment
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
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
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">
            Why Choose PAVE?
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold mb-4">
                  AI-Powered Learning
                </h3>
                <p className="text-gray-600">
                  Instantly generate quizzes from your study materials and
                  receive personalized learning recommendations
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold mb-4">
                  Engagement Rewards
                </h3>
                <p className="text-gray-600">
                  Earn PAVE Coins for participation and excellence in your
                  academic journey
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Smart Attendance</h3>
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
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
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
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
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
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>AI Quiz Generation</li>
                <li>Attendance Tracking</li>
                <li>Performance Analytics</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Student Guide</li>
                <li>Help Center</li>
                <li>FAQs</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Contact Us</li>
                <li>Documentation</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© 2024 PAVE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
