package com.leverx.projectmanagement.service;

import com.leverx.projectmanagement.model.Project;
import com.leverx.projectmanagement.repository.ProjectRepository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {

  private final ProjectRepository projectRepository;

  public ProjectService(ProjectRepository projectRepository) {
    this.projectRepository = projectRepository;
  }

  public List<Project> getAllProjects() {
    return projectRepository.findAll();
  }

  public Optional<Project> getProjectById(Long id) {
    return projectRepository.findById(id);
  }

  public Project save(Project project) {
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
