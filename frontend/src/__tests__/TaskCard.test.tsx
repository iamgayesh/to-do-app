import { render, screen, fireEvent } from "@testing-library/react";
import { TaskCard } from "../components/TaskCard";
import type { Task } from "../types/task";

const mockTask: Task = {
  id: 1,
  title: "Buy books",
  description: "For next school year",
  completed: false,
  createdAt: "2024-01-01T00:00:00",
};

describe("TaskCard", () => {
  test("renders title and description", () => {
    render(<TaskCard task={mockTask} onComplete={vi.fn()} />);
    expect(screen.getByText("Buy books")).toBeInTheDocument();
    expect(screen.getByText("For next school year")).toBeInTheDocument();
  });

  test("renders a Done button", () => {
    render(<TaskCard task={mockTask} onComplete={vi.fn()} />);
    expect(screen.getByRole("button", { name: /done/i })).toBeInTheDocument();
  });

  test("calls onComplete with task id when Done clicked", () => {
    const onComplete = vi.fn();
    render(<TaskCard task={mockTask} onComplete={onComplete} />);
    fireEvent.click(screen.getByRole("button", { name: /done/i }));
    expect(onComplete).toHaveBeenCalledWith(1);
  });
});
