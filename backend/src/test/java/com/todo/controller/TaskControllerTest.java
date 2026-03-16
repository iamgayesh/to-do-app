package com.todo.controller;

import com.todo.dto.CreateTaskRequest;
import com.todo.dto.TaskResponse;
import com.todo.repository.TaskRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import java.util.stream.IntStream;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Testcontainers
class TaskControllerTest {

    // @ServiceConnection replaces @DynamicPropertySource
    // Spring Boot 3.1+ starts the container BEFORE reading properties
    @Container
    @ServiceConnection
    static PostgreSQLContainer<?> postgres =
            new PostgreSQLContainer<>("postgres:15");

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private TaskRepository taskRepository;

    @BeforeEach
    void setUp() {
        taskRepository.deleteAll(); // clean state before each test
    }

    @Test
    void createTask_returns201AndBody() {
        CreateTaskRequest req = new CreateTaskRequest();
        req.setTitle("Test task");
        req.setDescription("Description");

        ResponseEntity<TaskResponse> res =
                restTemplate.postForEntity("/api/tasks", req, TaskResponse.class);

        assertThat(res.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(res.getBody()).isNotNull();
        assertThat(res.getBody().getTitle()).isEqualTo("Test task");
        assertThat(res.getBody().getDescription()).isEqualTo("Description");
        assertThat(res.getBody().isCompleted()).isFalse();
    }

    @Test
    void getTasks_returnsAtMostFive() {
        // create 7 tasks
        IntStream.range(0, 7).forEach(i -> {
            CreateTaskRequest r = new CreateTaskRequest();
            r.setTitle("Task " + i);
            r.setDescription("Desc " + i);
            restTemplate.postForEntity("/api/tasks", r, TaskResponse.class);
        });

        ResponseEntity<TaskResponse[]> res =
                restTemplate.getForEntity("/api/tasks", TaskResponse[].class);

        assertThat(res.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(res.getBody()).isNotNull();
        assertThat(res.getBody()).hasSizeLessThanOrEqualTo(5);
    }

    @Test
    void getTasks_returnsOnlyIncompleteTasks() {
        // create a task then complete it
        CreateTaskRequest req = new CreateTaskRequest();
        req.setTitle("Complete me");
        req.setDescription("Desc");
        TaskResponse created = restTemplate
                .postForEntity("/api/tasks", req, TaskResponse.class)
                .getBody();

        restTemplate.patchForObject(
                "/api/tasks/" + created.getId() + "/complete",
                null, TaskResponse.class);

        // completed task should not appear in list
        TaskResponse[] tasks = restTemplate
                .getForEntity("/api/tasks", TaskResponse[].class)
                .getBody();

        assertThat(tasks).isEmpty();
    }

    @Test
    void createTask_returns400WhenTitleBlank() {
        CreateTaskRequest req = new CreateTaskRequest();
        req.setTitle("");           // blank title — should fail validation
        req.setDescription("Desc");

        ResponseEntity<String> res =
                restTemplate.postForEntity("/api/tasks", req, String.class);

        assertThat(res.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    void completeTask_returns404WhenNotFound() {
        ResponseEntity<String> res = restTemplate.exchange(
                "/api/tasks/99999/complete",
                org.springframework.http.HttpMethod.PATCH,
                null,
                String.class
        );

        assertThat(res.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
    }
}