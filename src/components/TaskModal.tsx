"use client";

import React, { useState, useEffect } from "react";
import { Task } from "@/types/task";
import { set } from "mongoose";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Task) => void;
  editingTask?: Task | null;
}

export default function TaskModal({
  isOpen,
  onClose,
  onSave,
  editingTask,
}: Props) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState<"Pending" | "Done">("Pending");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDueDate(editingTask.dueDate);
      setStatus(editingTask.status);
    } else {
      setTitle("");
      setDueDate("");
      setStatus("Pending");
    }
  }, [editingTask]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!title.trim() || !dueDate) return alert("Please fill all fields");
    const newTask: Task = {
      id: editingTask?.id || crypto.randomUUID(),
      title,
      dueDate,
      status,
    };
    onSave(newTask);
    setTitle("");
    setDueDate("");
    setStatus("Pending");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
          {editingTask ? "Edit Task" : "Add Task"}
        </h2>

        <div className="space-y-3">
          <div className="text-sm text-gray-600">
            <label>Title:</label>
            <input
              type="text"
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded p-2"
            />
          </div>

          <div className="text-sm text-gray-600">
            <label>Due Date:</label>
            <input
              type="date"
              placeholder="Due Date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full border rounded p-2"
            />
          </div>
          <div className="text-sm text-gray-600">
            <label>Status:</label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as "Pending" | "Done")}
              className="w-full border rounded p-2"
            >
              <option value="Pending">Pending</option>
              <option value="Done">Done</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-5">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
