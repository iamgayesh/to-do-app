package com.todo.service;

import com.todo.dto.CreateTaskRequest;
import com.todo.dto.TaskResponse;

import java.util.List;

public interface TaskService {
    List<TaskResponse> getRecentIncompleteTasks();
    TaskResponse createTask(CreateTaskRequest request);
    TaskResponse completeTask(Long id);
}
