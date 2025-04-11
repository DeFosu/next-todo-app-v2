"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { createClient } from "@/utils/supabase/client";
import React, { useLayoutEffect, useState } from "react";

type Task = {
  id: string;
  title: string;
  description: string;
  due_date: string;
  is_completed: boolean;
};

const Home = () => {
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useLayoutEffect(() => {
    const fetchTasks = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase.from("tasks").select("*");

        if (error) {
          console.error("Supabase error:", error);
          setError(error.message);
          return;
        }

        console.log("Fetched data:", data);
        setTasks(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to fetch tasks");
      }
    };
    fetchTasks();
  }, []);

  return (
    <section>
      <div className="container mx-auto py-4 px-2">
        <h1 className="text-2xl font-bold">Home</h1>
        <h2 className="text-lg font-bold">Tasks {tasks?.length ?? 0}</h2>
        {error && <p className="text-red-500">{error}</p>}
        <ul className="space-y-2 mt-4">
          {tasks?.map((task) => (
            <li
              key={task.id}
              className="p-2 border rounded-md border-neutral-300 flex items-top gap-2"
            >
              <Checkbox checked={task.is_completed} className="mt-1.5" />
              <div className="flex-1">
                <h3 className="text-lg font-bold">{task.title}</h3>
                <p className="text-sm text-neutral-500">{task.description}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-500 mt-1.5">
                  {task.due_date}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Home;
