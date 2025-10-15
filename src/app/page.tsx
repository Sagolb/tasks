"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Task } from "@/types/task";
import { getTasks, saveTasks } from "@/utils/storage";
import { useDebounce } from "@/hooks/useDebounce";
import TaskList from "@/components/TaskList";
import TaskModal from "@/components/TaskModal";
import FilterBar from "@/components/Filter";

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    setTasks(getTasks());
  }, []);

  const handleSave = (task: Task) => {
    let updatedTasks: Task[];
    if (editingTask) {
      updatedTasks = tasks.map((t) => (t.id === task.id ? task : t));
    } else {
      updatedTasks = [...tasks, task];
    }
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const handleDelete = (id: string) => {
    const updatedTasks = tasks.filter((t) => t.id !== id);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const filteredTasks = useMemo(() => {
    let list = tasks;

    if (filter !== "All") {
      list = list.filter((t) => t.status === filter);
    }

    if (debouncedSearch) {
      list = list.filter((t) =>
        t.title.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }

    if (sortBy === "name") {
      list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    } else {
      list = [...list].sort(
        (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      );
    }

    return list;
  }, [tasks, filter, debouncedSearch, sortBy]);

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Task Tracker</h1>

      <FilterBar
        filter={filter}
        onFilterChange={setFilter}
        search={search}
        onSearchChange={setSearch}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      <button
        onClick={() => {
          setEditingTask(null);
          setModalOpen(true);
        }}
        className="bg-green-600 text-white px-4 py-2 rounded mb-4"
      >
        + Add Task
      </button>

      <TaskList
        tasks={filteredTasks}
        onEdit={(t) => {
          setEditingTask(t);
          setModalOpen(true);
        }}
        onDelete={handleDelete}
      />

      <TaskModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        editingTask={editingTask}
      />
    </main>
  );
}
