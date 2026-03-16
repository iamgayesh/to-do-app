package com.todo.service.impl;

import com.todo.dto.CreateTaskRequest;
import com.todo.dto.TaskResponse;
import com.todo.entity.Task;
import com.todo.repository.TaskRepository;
import com.todo.service.TaskService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;

    // Constructor injection (not @Autowired field injection)
    public TaskServiceImpl(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    public List<TaskResponse> getRecentIncompleteTasks() {
        return taskRepository
                .findTop5ByCompletedFalseOrderByCreatedAtDesc()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public TaskResponse createTask(CreateTaskRequest request) {
        Task task = new Task();
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        return toResponse(taskRepository.save(task));
    }

    @Override
    public TaskResponse completeTask(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Task not found"));
        task.setCompleted(true);
        return toResponse(taskRepository.save(task));
    }

    private TaskResponse toResponse(Task task) {
        TaskResponse res = new TaskResponse();
        res.setId(task.getId());
        res.setTitle(task.getTitle());
        res.setDescription(task.getDescription());
        res.setCompleted(task.isCompleted());
        res.setCreatedAt(task.getCreatedAt());
        return res;
    }
}
