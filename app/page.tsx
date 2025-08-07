import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Workflow, Zap, Shield, BarChart3 } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Visual Workflow Builder
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Create powerful workflows with our intuitive drag-and-drop
            interface. Build, connect, and automate your processes with ease.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" className="text-lg px-8 py-3">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/auth/signin">
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Powerful Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Workflow className="h-12 w-12 mx-auto text-blue-600 mb-4" />
                <CardTitle>Visual Builder</CardTitle>
                <CardDescription>
                  Drag and drop nodes to create complex workflows with an
                  intuitive interface
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Zap className="h-12 w-12 mx-auto text-green-600 mb-4" />
                <CardTitle>Smart Automation</CardTitle>
                <CardDescription>
                  Connect nodes with intelligent routing and conditional logic
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <BarChart3 className="h-12 w-12 mx-auto text-purple-600 mb-4" />
                <CardTitle>Analytics</CardTitle>
                <CardDescription>
                  Track workflow performance and get insights into your
                  processes
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Node Types Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Node Types
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Start",
                description: "Entry point of the workflow",
                color: "bg-green-100 text-green-800",
              },
              {
                name: "Condition",
                description: "Evaluate conditions and route accordingly",
                color: "bg-blue-100 text-blue-800",
              },
              {
                name: "Delay",
                description: "Add time delays to your workflow",
                color: "bg-yellow-100 text-yellow-800",
              },
              {
                name: "Webhook",
                description: "Make HTTP requests to external services",
                color: "bg-purple-100 text-purple-800",
              },
              {
                name: "Logger",
                description: "Log information for debugging",
                color: "bg-gray-100 text-gray-800",
              },
              {
                name: "End",
                description: "Mark the end of a workflow",
                color: "bg-red-100 text-red-800",
              },
            ].map((node) => (
              <Card key={node.name}>
                <CardHeader>
                  <div
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${node.color}`}
                  >
                    {node.name}
                  </div>
                  <CardDescription className="mt-2">
                    {node.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Build Your First Workflow?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of users who are already automating their processes
          </p>
          <Link href="/auth/signup">
            <Button size="lg" className="text-lg px-8 py-3">
              Start Building Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
