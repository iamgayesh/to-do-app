import type { Task } from "../types/task";

const BASE = "/api/tasks";

export const taskService = {
  async getTasks(): Promise<Task[]> {
    const res = await fetch(BASE);
    if (!res.ok) throw new Error("Failed to fetch tasks");
    return res.json();
  },

  async createTask(title: string, description: string): Promise<Task> {
    const res = await fetch(BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });
    if (!res.ok) throw new Error("Failed to create task");
    return res.json();
  },

  async completeTask(id: number): Promise<Task> {
    const res = await fetch(`${BASE}/${id}/complete`, {
      method: "PATCH",
    });
    if (!res.ok) throw new Error("Failed to complete task");
    return res.json();
  },
};
