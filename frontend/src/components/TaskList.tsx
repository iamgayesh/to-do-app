import type { Task } from "../types/task";
import { TaskCard } from "./TaskCard";

interface Props {
  tasks: Task[];
  onComplete: (id: number) => void;
  loading?: boolean;
}

export function TaskList({ tasks, onComplete, loading }: Props) {
  const visibleTasks = tasks
    .filter((task) => !task.completed)
    .sort((a, b) => {
      const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;

      if (aTime !== bTime) {
        return bTime - aTime;
      }

      return b.id - a.id;
    })
    .slice(0, 5);

  /* Loading skeleton */
  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <div className="flex flex-col gap-3 animate-pulse">
          <div className="h-6 w-32 bg-gray-100 rounded-lg" />
          <div className="h-10 bg-gray-100 rounded-xl" />
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-gray-100 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-5 pt-5 pb-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="font-semibold text-gray-800 text-base">Pending Tasks</h2>
            <p className="text-xs text-gray-400 mt-1">Showing the 5 most recent to-do items</p>
          </div>
          <span className="text-xs text-amber-700 bg-amber-100 font-semibold px-3 py-1 rounded-full">
            {visibleTasks.length} visible
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-3 max-h-[640px] overflow-y-auto">
        {visibleTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-14 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-gray-500 text-sm font-medium">No pending tasks</p>
            <p className="text-gray-400 text-xs mt-1">Completed tasks are hidden from the list</p>
          </div>
        ) : (
          visibleTasks.map((task) => (
            <TaskCard key={task.id} task={task} onComplete={onComplete} />
          ))
        )}
      </div>
    </div>
  );
}
