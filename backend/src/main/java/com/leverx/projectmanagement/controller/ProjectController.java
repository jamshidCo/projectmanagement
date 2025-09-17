package com.leverx.projectmanagement.controller;

import com.leverx.projectmanagement.dto.ProjectDTO;
import com.leverx.projectmanagement.model.Project;
import com.leverx.projectmanagement.service.ProjectService;
import java.util.Map;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

  private final ProjectService projectService;

  public ProjectController(ProjectService projectService) {
    this.projectService = projectService;
  }

  @GetMapping
  public ResponseEntity<Page<Project>> getAllProjects(
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size,
      @RequestParam(defaultValue = "id") String sortBy
  ) {
    Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
    return ResponseEntity.ok(projectService.getAllProjects(pageable));
  }

  @GetMapping("/{id}")
  public ResponseEntity<Project> getProjectById(@PathVariable Long id) {
    Optional<Project> project = projectService.getProjectById(id);
    return project.map(ResponseEntity::ok)
        .orElseGet(() -> ResponseEntity.notFound().build());
  }

  @PostMapping
  public ResponseEntity<Project> createProject(@RequestBody ProjectDTO project) {
    Project savedProject = projectService.save(project);
    return ResponseEntity.status(HttpStatus.CREATED).body(savedProject);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
    projectService.deleteProject(id);
    return ResponseEntity.noContent().build();
  }

  @PutMapping("/{id}")
  public ResponseEntity<Project> updateProject(@PathVariable("id") Long id,
      @RequestBody ProjectDTO project) {
    Project updatedProject = projectService.update(project, id);
    return ResponseEntity.ok(updatedProject);
  }

  @GetMapping("/status_count")
  public ResponseEntity<Map<String, Long>> getProjectCountByStatus() {
    Map<String, Long> counts = projectService.getProjectCountByStatus();
    return ResponseEntity.ok(counts);
  }
}
