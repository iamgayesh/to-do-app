package com.todo.service;

import com.todo.dto.CreateTaskRequest;
import com.todo.dto.TaskResponse;
import com.todo.entity.Task;
import com.todo.repository.TaskRepository;
import com.todo.service.impl.TaskServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TaskServiceTest {

    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private TaskServiceImpl taskService;

    @Test
    void getRecentIncompleteTasks_returnsUpToFiveTasks() {
        List<Task> tasks = IntStream.range(0, 5)
                .mapToObj(i -> buildTask((long) i, "Task " + i, false))
                .collect(Collectors.toList());

        when(taskRepository.findTop5ByCompletedFalseOrderByCreatedAtDesc())
                .thenReturn(tasks);

        List<TaskResponse> result = taskService.getRecentIncompleteTasks();

        assertThat(result).hasSize(5);
        assertThat(result.get(0).getTitle()).isEqualTo("Task 0");
    }

    @Test
    void getRecentIncompleteTasks_returnsEmptyListWhenNone() {
        when(taskRepository.findTop5ByCompletedFalseOrderByCreatedAtDesc())
                .thenReturn(List.of());

        List<TaskResponse> result = taskService.getRecentIncompleteTasks();

        assertThat(result).isEmpty();
    }

    @Test
    void createTask_savesAndReturnsTask() {
        CreateTaskRequest req = new CreateTaskRequest();
        req.setTitle("Buy books");
        req.setDescription("For school");

        Task saved = buildTask(1L, "Buy books", false);
        saved.setDescription("For school");
        when(taskRepository.save(any())).thenReturn(saved);

        TaskResponse result = taskService.createTask(req);

        assertThat(result.getTitle()).isEqualTo("Buy books");
        assertThat(result.getDescription()).isEqualTo("For school");
        assertThat(result.isCompleted()).isFalse();
        verify(taskRepository, times(1)).save(any());
    }

    @Test
    void completeTask_setsCompletedTrue() {
        Task task = buildTask(1L, "Test", false);
        when(taskRepository.findById(1L)).thenReturn(Optional.of(task));
        when(taskRepository.save(any())).thenReturn(task);

        taskService.completeTask(1L);

        assertThat(task.isCompleted()).isTrue();
        verify(taskRepository, times(1)).save(task);
    }

    @Test
    void completeTask_throwsNotFoundWhenTaskMissing() {
        when(taskRepository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> taskService.completeTask(99L))
                .isInstanceOf(ResponseStatusException.class);
    }

    // helper
    private Task buildTask(Long id, String title, boolean completed) {
        Task t = new Task();
        t.setId(id);
        t.setTitle(title);
        t.setDescription("desc");
        t.setCompleted(completed);
        t.setCreatedAt(LocalDateTime.now());
        return t;
    }
}