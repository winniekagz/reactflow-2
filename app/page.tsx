import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Workflow, Zap, BarChart3 } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
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
              <Button variant="contained" size="lg" className="text-lg px-8 py-3" endIcon={    <ArrowRight className="ml-2 h-5 w-5" />}>
                Get Started
            
              </Button>
            </Link>
            <Link href="/auth/signin">
              <Button variant="outlined" size="lg" className="text-lg px-8 py-3">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Powerful Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Workflow className="h-12 w-12 mx-auto text-primary-600 mb-4" />
                <CardTitle>Visual Builder</CardTitle>
                <CardDescription>
                  Drag and drop nodes to create complex workflows with an
                  intuitive interface
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Zap className="h-12 w-12 mx-auto text-success-600 mb-4" />
                <CardTitle>Smart Automation</CardTitle>
                <CardDescription>
                  Connect nodes with intelligent routing and conditional logic
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <BarChart3 className="h-12 w-12 mx-auto text-secondary-600 mb-4" />
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
                color: "bg-success-100 text-success-800 border-success-200",
              },
              {
                name: "Condition",
                description: "Evaluate conditions and route accordingly",
                color: "bg-info-100 text-info-800 border-info-200",
              },
              {
                name: "Delay",
                description: "Add time delays to your workflow",
                color: "bg-warning-100 text-warning-800 border-warning-200",
              },
              {
                name: "Webhook",
                description: "Make HTTP requests to external services",
                color: "bg-secondary-100 text-secondary-800 border-secondary-200",
              },
              {
                name: "Logger",
                description: "Log information for debugging",
                color: "bg-neutral-100 text-neutral-800 border-neutral-200",
              },
              {
                name: "End",
                description: "Mark the end of a workflow",
                color: "bg-error-100 text-error-800 border-error-200",
              },
            ].map((node) => (
              <Card key={node.name} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${node.color}`}
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

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">


          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Build Your First Workflow?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of users who are already automating their processes
          </p>
          <Link href="/auth/signup">
            <Button variant="contained" size="lg" className="text-lg px-8 py-3" endIcon={ <ArrowRight className="ml-2 h-5 w-5" />}>
              Start Building Now
             
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
