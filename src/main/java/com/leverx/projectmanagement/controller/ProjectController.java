package com.leverx.projectmanagement.controller;

import com.leverx.projectmanagement.dto.ProjectDTO;
import com.leverx.projectmanagement.model.Project;
import com.leverx.projectmanagement.service.ProjectService;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

  private final ProjectService projectService;

  public ProjectController(ProjectService projectService) {
    this.projectService = projectService;
  }

  @GetMapping
  public ResponseEntity<List<Project>> getAllProjects() {
    return ResponseEntity.ok(projectService.getAllProjects());
  }

  @GetMapping("/{id}")
  public ResponseEntity<Project> getProjectById(@PathVariable Long id) {
    Optional<Project> project = projectService.getProjectById(id);
    return project.map(ResponseEntity::ok)
        .orElseGet(() -> ResponseEntity.notFound().build());
  }

  @PostMapping
  public ResponseEntity<Project> createProject(@RequestBody Project project) {
    Project savedProject = projectService.save(project);
    return ResponseEntity.status(HttpStatus.CREATED).body(savedProject);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
    if (!projectService.getProjectById(id).isPresent()) {
      return ResponseEntity.notFound().build();
    }
    projectService.deleteProject(id);
    return ResponseEntity.noContent().build();
  }

//  @PutMapping("/{id}")
//  public ResponseEntity<Project> updateProject(@PathVariable("id") String id, @RequestBody Project project) {
//    Project updatedProject = projectService.update(project, id);
//    return ResponseEntity.ok(updatedProject);
//  }
}
