"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface Project {
  _id: string;
  name: string;
  createdAt: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const router = useRouter();

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await api("/api/projects");
      setProjects(data);
    } catch (err: any) {
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const createProject = async () => {
    if (!name.trim()) {
      toast.error("Project name is required");
      return;
    }

    try {
      setCreating(true);
      await api("/api/projects", {
        method: "POST",
        body: JSON.stringify({ name }),
      });
      setName("");
      await fetchProjects();
      toast.success("Project created successfully!");
    } catch (err: any) {
      toast.error(err.message || "Failed to create project");
    } finally {
      setCreating(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Projects</h1>

        <div className="flex gap-3 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Enter project name..."
              value={name}
              onChange={(e:any) => setName(e.target.value)}
            />
          </div>
          <Button onClick={createProject} loading={creating}>
            Create Project
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
            <p className="mt-2 text-gray-500">Loading projects...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No projects yet. Create your first project!</p>
          </div>
        ) : (
          <div className="grid gap-3">
            {projects.map((project) => (
              <div
                key={project._id}
                className="group bg-gray-50 hover:bg-gray-100 rounded-lg p-4 cursor-pointer transition-all duration-200 transform hover:scale-[1.02]"
                onClick={() => router.push(`/projects/${project._id}`)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-gray-900">{project.name}</h3>
                    <p className="text-sm text-gray-500">
                      Created {new Date(project.createdAt).toLocaleDateString()}
                    </p>
                  </div>
              {"->"}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}