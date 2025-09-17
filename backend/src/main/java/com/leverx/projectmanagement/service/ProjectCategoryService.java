package com.leverx.projectmanagement.service;

import com.leverx.projectmanagement.handler.ResourceNotFoundException;
import com.leverx.projectmanagement.model.ProjectCategory;
import com.leverx.projectmanagement.repository.ProjectCategoryRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class ProjectCategoryService {

  private final ProjectCategoryRepository projectCategoryRepository;

  public ProjectCategoryService(ProjectCategoryRepository projectCategoryRepository) {
    this.projectCategoryRepository = projectCategoryRepository;
  }

  public List<ProjectCategory> getAllProjectCategories() {
    return projectCategoryRepository.findAll();
  }

  public Optional<ProjectCategory> getProjectCategoryById(Long id) {
    return projectCategoryRepository.findById(id);
  }

  public ProjectCategory save(ProjectCategory project) {
    return projectCategoryRepository.save(project);
  }

  public void deleteProjectCategory(Long id) {
    projectCategoryRepository.findById(id).orElseThrow(
        () -> new ResourceNotFoundException("ProjectCategory not found with id: " + id));

    projectCategoryRepository.deleteById(id);
  }
}
