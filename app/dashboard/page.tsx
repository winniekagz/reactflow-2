"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Workflow, Plus, BarChart3, Clock, Users } from "lucide-react";
import Link from "next/link";

interface DashboardStats {
  totalWorkflows: number;
  totalNodes: number;
  recentWorkflows: Array<{
    id: string;
    name: string;
    description: string;
    createdAt: string;
    nodeCount: number;
  }>;
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats>({
    totalWorkflows: 0,
    totalNodes: 0,
    recentWorkflows: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
      return;
    }

    if (status === "authenticated") {
      fetchDashboardData();
    }
  }, [status, router]);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch("/api/dashboard");
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome back, {session.user?.name || session.user?.email}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Workflows
              </CardTitle>
              <Workflow className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalWorkflows}</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Nodes</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalNodes}</div>
              <p className="text-xs text-muted-foreground">
                Across all workflows
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Users
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">
               { "You're the only user"}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Workflows</CardTitle>
                <Link href="/workflows">
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    New Workflow
                  </Button>
                </Link>
              </div>
              <CardDescription>Your latest workflow creations</CardDescription>
            </CardHeader>
            <CardContent>
              {stats.recentWorkflows.length === 0 ? (
                <div className="text-center py-8">
                  <Workflow className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No workflows yet</p>
                  <Link href="/workflows/new">
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Your First Workflow
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {stats.recentWorkflows.map((workflow) => (
                    <div
                      key={workflow.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">
                          {workflow.name}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {workflow.description}
                        </p>
                        <div className="flex items-center mt-2 space-x-4">
                          <Badge variant="secondary">
                            {workflow.nodeCount} nodes
                          </Badge>
                          <span className="text-xs text-gray-500 flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {new Date(workflow.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <Link href={`/workflows/${workflow.id}`}>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Get started with common tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 flex flex-col gap-4">
              <Link href="/workflows/new">
                <Button className="w-full justify-start">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Workflow
                </Button>
              </Link>
              <Link href="/workflows">
                <Button variant="outline" className="w-full justify-start">
                  <Workflow className="h-4 w-4 mr-2" />
                  View All Workflows
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
