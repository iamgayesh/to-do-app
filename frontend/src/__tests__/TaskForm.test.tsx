import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { TaskForm } from "../components/TaskForm";

describe("TaskForm", () => {
  test("renders inputs and Add Task button", () => {
    render(<TaskForm onCreate={vi.fn()} onTaskCreated={vi.fn()} />);
    expect(
      screen.getByPlaceholderText("e.g. Buy groceries"),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Add more details about this task…"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add task/i }),
    ).toBeInTheDocument();
  });

  test("calls onCreate and onTaskCreated on valid submit", async () => {
    const onCreate = vi.fn().mockResolvedValue(undefined);
    const onTaskCreated = vi.fn();
    render(<TaskForm onCreate={onCreate} onTaskCreated={onTaskCreated} />);

    fireEvent.change(screen.getByPlaceholderText("e.g. Buy groceries"), {
      target: { value: "Test task" },
    });
    fireEvent.change(
      screen.getByPlaceholderText("Add more details about this task…"),
      {
        target: { value: "A description" },
      },
    );
    fireEvent.click(screen.getByRole("button", { name: /add task/i }));

    await waitFor(() => {
      expect(onCreate).toHaveBeenCalledWith("Test task", "A description");
      expect(onTaskCreated).toHaveBeenCalled();
    });
  });

  test("clears inputs after successful submit", async () => {
    const onCreate = vi.fn().mockResolvedValue(undefined);
    render(<TaskForm onCreate={onCreate} onTaskCreated={vi.fn()} />);
    const titleInput = screen.getByPlaceholderText("e.g. Buy groceries");
    fireEvent.change(titleInput, { target: { value: "My task" } });
    fireEvent.change(
      screen.getByPlaceholderText("Add more details about this task…"),
      {
        target: { value: "My desc" },
      },
    );
    fireEvent.click(screen.getByRole("button", { name: /add task/i }));
    await waitFor(() => {
      expect((titleInput as HTMLInputElement).value).toBe("");
    });
  });

  test("does not submit when fields are empty", () => {
    const onCreate = vi.fn();
    render(<TaskForm onCreate={onCreate} onTaskCreated={vi.fn()} />);
    fireEvent.click(screen.getByRole("button", { name: /add task/i }));
    expect(onCreate).not.toHaveBeenCalled();
  });
});
