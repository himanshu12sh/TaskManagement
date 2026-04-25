"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useParams, useRouter } from "next/navigation";
import Button from "@/components/Button";
import Input from "@/components/Input";
import toast from "react-hot-toast";

interface Task {
  _id: string;
  title: string;
  status: "Todo" | "In Progress" | "Done";
}

export default function Tasks() {
  const { id } = useParams();
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await api(`/api/tasks/${id}`);
      setTasks(data);
    } catch (err: any) {
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const createTask = async () => {
    if (!title.trim()) {
      toast.error("Task title is required");
      return;
    }

    try {
      setCreating(true);
      const newTask = await api("/api/tasks", {
        method: "POST",
        body: JSON.stringify({ title, projectId: id }),
      });
      
      // Add the new task to state without refetching
      setTasks(prevTasks => [newTask, ...prevTasks]);
      setTitle("");
      toast.success("Task created successfully!");
    } catch (err: any) {
      toast.error(err.message || "Failed to create task");
    } finally {
      setCreating(false);
    }
  };

  const updateStatus = async (taskId: string, newStatus: string) => {
    // Update UI immediately without any loading state
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task._id === taskId 
          ? { ...task, status: newStatus as Task["status"] }
          : task
      )
    );
    
    try {
      await api(`/api/tasks/${taskId}`, {
        method: "PUT",
        body: JSON.stringify({ status: newStatus }),
      });
      toast.success("Task status updated");
    } catch (err: any) {
      // Revert on error
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task._id === taskId 
            ? { ...task, status: task.status } // Keep the error handling simple
            : task
        )
      );
      toast.error("Failed to update task status");
      // Refetch to ensure consistency
      fetchTasks();
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Todo":
        return "bg-gray-100 text-gray-700";
      case "In Progress":
        return "bg-yellow-100 text-yellow-700";
      case "Done":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => router.push("/projects")}
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            ← Back to Projects
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
        </div>

        <div className="flex gap-3 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Enter task title..."
              value={title}
              onChange={(e: any) => setTitle(e.target.value)}
              onKeyPress={(e: any) => e.key === "Enter" && createTask()}
            />
          </div>
          <Button onClick={createTask} loading={creating}>
            Add Task
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
            <p className="mt-2 text-gray-500">Loading tasks...</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No tasks yet. Add your first task!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="bg-gray-50 rounded-lg p-4 flex justify-between items-center gap-4"
              >
                <span className="flex-1 text-gray-900">{task.title}</span>
                <select
                  value={task.status}
                  onChange={(e) => updateStatus(task._id, e.target.value)}
                  className={`px-3 py-1 rounded-lg border-0 cursor-pointer font-medium ${getStatusColor(
                    task.status
                  )} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option>Todo</option>
                  <option>In Progress</option>
                  <option>Done</option>
                </select>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}