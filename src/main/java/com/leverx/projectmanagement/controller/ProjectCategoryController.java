package com.leverx.projectmanagement.controller;

import com.leverx.projectmanagement.model.ProjectCategory;
import com.leverx.projectmanagement.service.ProjectCategoryService;
import java.util.List;
import java.util.Optional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/projectCategories")
public class ProjectCategoryController {

  private final ProjectCategoryService projectCategoryService;

  public ProjectCategoryController(ProjectCategoryService projectCategoryService) {
    this.projectCategoryService = projectCategoryService;
  }

  @GetMapping
  public ResponseEntity<List<ProjectCategory>> getAllProjectCategories() {
    return ResponseEntity.ok(projectCategoryService.getAllProjectCategories());
  }

  @GetMapping("/{id}")
  public ResponseEntity<ProjectCategory> getProjectCategoryById(@PathVariable Long id) {
    Optional<ProjectCategory> projectCategory = projectCategoryService.getProjectCategoryById(id);
    return projectCategory.map(ResponseEntity::ok)
        .orElseGet(() -> ResponseEntity.notFound().build());
  }

  @PostMapping
  public ResponseEntity<ProjectCategory> createProjectCategory(
      @RequestBody ProjectCategory project) {
    ProjectCategory savedProject = projectCategoryService.save(project);
    return ResponseEntity.status(HttpStatus.CREATED).body(savedProject);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteProjectCategory(@PathVariable Long id) {
    projectCategoryService.deleteProjectCategory(id);
    return ResponseEntity.noContent().build();
  }
}
