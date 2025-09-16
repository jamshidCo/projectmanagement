package com.leverx.projectmanagement.service;

import com.leverx.projectmanagement.dto.ProjectDTO;
import com.leverx.projectmanagement.model.Project;
import com.leverx.projectmanagement.model.ProjectCategory;
import com.leverx.projectmanagement.repository.ProjectCategoryRepository;
import com.leverx.projectmanagement.repository.ProjectRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {

  private final ProjectRepository projectRepository;
  private final ProjectCategoryRepository projectCategoryRepository;

  public ProjectService(ProjectRepository projectRepository,
      ProjectCategoryRepository projectCategoryRepository) {
    this.projectRepository = projectRepository;
    this.projectCategoryRepository = projectCategoryRepository;
  }

  public List<Project> getAllProjects() {
    return projectRepository.findAll();
  }

  public Optional<Project> getProjectById(Long id) {
    return projectRepository.findById(id);
  }

  public Project save(ProjectDTO projectDto) {
    Optional<ProjectCategory> optionalProjectCategory = projectCategoryRepository.findById(
        projectDto.getCategoryId());
    Project project = new Project();
    if (optionalProjectCategory.isPresent()) {
      project.setProjectName(projectDto.getProjectName());
      project.setRevenue(projectDto.getRevenue());
      project.setStartDate(projectDto.getStartDate());
      project.setEndDate(projectDto.getEndDate());
      project.setWorkingDays(projectDto.getWorkingDays());
      project.setPmName(projectDto.getPmName());
      project.setPlannedRate(projectDto.getPlannedRate());
      project.setActualRate(projectDto.getActualRate());
      project.setStatus(projectDto.getStatus());
      project.setCategory(optionalProjectCategory.get());
    }
    return projectRepository.save(project);
  }

//  public Project update(Project newProject, String id) {
//    Optional<Project> optionalProject = projectRepository.findById(id);
//    if (optionalProject.isPresent()) {
//      Project project = optionalProject.get();
//
//      project.setProjectName(newProject.getProjectName());
//      project.setCategory(newProject.getCategory());
//      project.setRevenue(newProject.getRevenue());
//      project.setStartDate(newProject.getStartDate());
//      project.setEndDate(newProject.getEndDate());
//      project.setWorkingDays(newProject.getWorkingDays());
//      project.setPmName(newProject.getPmName());
//      project.setPlannedRate(newProject.getPlannedRate());
//      project.setActualRate(newProject.getActualRate());
//      project.setStatus(newProject.getStatus());
//
//      return projectRepository.save(project);
//    } else {
//      return null;
//    }
//  }

  public void deleteProject(Long id) {
    projectRepository.deleteById(id);
  }
}
