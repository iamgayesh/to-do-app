import type { Task } from "../types/task";

interface Props {
  task: Task;
  onComplete: (id: number) => void;
}

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

export function TaskCard({ task, onComplete }: Props) {
  return (
    <div
      className={`group rounded-xl p-4 border transition-all duration-200 ${
        task.completed
          ? "bg-gray-50 border-gray-100"
          : "bg-white border-gray-200 hover:border-indigo-200 hover:shadow-md"
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Status circle */}
        <div
          className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
            task.completed
              ? "bg-green-500 border-green-500"
              : "border-gray-300 group-hover:border-indigo-400"
          }`}
        >
          {task.completed && (
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3
            className={`font-semibold text-sm leading-snug ${
              task.completed ? "text-gray-400 line-through" : "text-gray-800"
            }`}
          >
            {task.title}
          </h3>
          {task.description && (
            <p
              className={`text-xs mt-1 leading-relaxed ${
                task.completed ? "text-gray-400 line-through" : "text-gray-500"
              }`}
            >
              {task.description}
            </p>
          )}
          {task.createdAt && (
            <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formatDate(task.createdAt)}
            </p>
          )}
        </div>

        {/* Action button */}
        {task.completed ? (
          <span className="shrink-0 inline-flex items-center gap-1 text-xs bg-green-50 border border-green-200 text-green-600 font-medium rounded-lg px-3 py-1.5">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            Done
          </span>
        ) : (
          <button
            onClick={() => onComplete(task.id)}
            className="shrink-0 text-xs bg-indigo-50 border border-indigo-200 text-indigo-600 font-semibold rounded-lg px-3 py-1.5 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all cursor-pointer"
          >
            Done
          </button>
        )}
      </div>
    </div>
  );
}
