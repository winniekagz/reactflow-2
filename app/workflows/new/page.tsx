"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { workflowSchema, type WorkflowData } from "@/lib/validations";
import { Loader2, ArrowLeft } from "lucide-react";

export default function NewWorkflow() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WorkflowData>({
    resolver: zodResolver(workflowSchema),
  });

  const onSubmit = async (data: WorkflowData) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/workflows", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const workflow = await response.json();
        router.push(`/workflows/${workflow.id}/edit`);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to create workflow");
      }
          } catch {
        setError("An error occurred. Please try again.");
      } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link
            href="/workflows"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Workflows
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Create New Workflow</h1>
          <p className="text-gray-600 mt-2">
            Set up the basic information for your new workflow
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Workflow Details</CardTitle>
            <CardDescription>
              Provide a name and description for your workflow
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Workflow Name</Label>
                <Input
                  id="name"
                  {...register("name")}
                  className={errors.name ? "border-red-500" : ""}
                  placeholder="Enter workflow name"
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  {...register("description")}
                  className={errors.description ? "border-red-500" : ""}
                  placeholder="Describe what this workflow does"
                  rows={4}
                />
                {errors.description && (
                  <p className="text-sm text-red-500">{errors.description.message}</p>
                )}
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="flex justify-end space-x-4">
                <Link href="/workflows">
                  <Button variant="outlined" type="button">
                    Cancel
                  </Button>
                </Link>
                <Button type="submit" variant="contained" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Workflow"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
