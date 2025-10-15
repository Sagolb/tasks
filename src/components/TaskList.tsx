"use client";

import React from "react";
import { Task } from "@/types/task";

interface Props {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export default function TaskList({ tasks, onEdit, onDelete }: Props) {
  if (!tasks.length)
    return <p className="text-center text-gray-500">No tasks found.</p>;

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex items-center justify-between border p-3 rounded-md"
        >
          <div>
            <h3 className="font-semibold">{task.title}</h3>
            <p className="text-sm text-gray-500">Due: {task.dueDate}</p>
            <p
              className={`text-xs mt-1 ${
                task.status === "Done" ? "text-green-600" : "text-yellow-600"
              }`}
            >
              {task.status}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(task)}
              className="px-3 py-1 bg-blue-500 text-white rounded"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
