package com.todo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.todo.entity.Task;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    /**
     * Spring Data derives the SQL from the method name:
     * SELECT * FROM task
     * WHERE completed = false
     * ORDER BY created_at DESC
     * LIMIT 5
     */
    List<Task> findTop5ByCompletedFalseOrderByCreatedAtDesc();
}