package com.leverx.projectmanagement.service;

import com.leverx.projectmanagement.dto.DelayedProjectDTO;
import com.leverx.projectmanagement.dto.DelayedProjectsByPmDTO;
import com.leverx.projectmanagement.dto.ProjectCategoryGroupDTO;
import com.leverx.projectmanagement.dto.ProjectDTO;
import com.leverx.projectmanagement.handler.ResourceNotFoundException;
import com.leverx.projectmanagement.model.Project;
import com.leverx.projectmanagement.model.ProjectCategory;
import com.leverx.projectmanagement.model.ProjectStatus;
import com.leverx.projectmanagement.repository.ProjectCategoryRepository;
import com.leverx.projectmanagement.repository.ProjectRepository;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
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

  public Project update(ProjectDTO newProject, Long id) {
    Project project = projectRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + id));

    ProjectCategory projectCategory = projectCategoryRepository.findById(newProject.getCategoryId())
        .orElseThrow(() -> new ResourceNotFoundException(
            "ProjectCategory not found with id: " + newProject.getCategoryId()));

    project.setProjectName(newProject.getProjectName());
    project.setCategory(projectCategory);
    project.setRevenue(newProject.getRevenue());
    project.setStartDate(newProject.getStartDate());
    project.setEndDate(newProject.getEndDate());
    project.setWorkingDays(newProject.getWorkingDays());
    project.setPmName(newProject.getPmName());
    project.setPlannedRate(newProject.getPlannedRate());
    project.setActualRate(newProject.getActualRate());
    project.setStatus(newProject.getStatus());

    return projectRepository.save(project);

  }

  public void deleteProject(Long id) {
    projectRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + id));
    projectRepository.deleteById(id);
  }

  public BigDecimal getTotalRevenueForYear(int year) {
    LocalDate startOfYear = LocalDate.of(year, 1, 1);
    LocalDate endOfYear = LocalDate.of(year, 12, 31);
    Optional<BigDecimal> totalRevenue = projectRepository.getTotalRevenueBetween(startOfYear,
        endOfYear);
    return totalRevenue.orElse(BigDecimal.ZERO);
  }

  public List<ProjectCategoryGroupDTO> getProjectsGroupedByCategory() {
    List<Project> projects = projectRepository.findAll();

    return projects.stream()
        .collect(Collectors.groupingBy(
            p -> p.getCategory().getId(),
            Collectors.toList()
        ))
        .values()
        .stream()
        .map(projectList -> {
          ProjectCategory category = projectList.getFirst().getCategory();
          return new ProjectCategoryGroupDTO(
              category.getId(),
              category.getName(),
              projectList
          );
        })
        .collect(Collectors.toList());
  }

  public List<DelayedProjectsByPmDTO> getDelayedProjectsGroupedByPm() {
    List<Project> delayedProjects = projectRepository.findByStatus(ProjectStatus.DELAYED);

    Map<String, List<DelayedProjectDTO>> grouped = delayedProjects.stream()
        .collect(Collectors.groupingBy(
            Project::getPmName,
            Collectors.mapping(p -> new DelayedProjectDTO(
                p.getProjectName(),
                p.getPlannedRate(),
                p.getActualRate(),
                calculateDeviation(p)
            ), Collectors.toList())
        ));

    return grouped.entrySet().stream()
        .map(entry -> new DelayedProjectsByPmDTO(entry.getKey(), entry.getValue()))
        .collect(Collectors.toList());
  }

  private Double calculateDeviation(Project p) {
    if (p.getActualRate() == null || p.getPlannedRate() == null) {
      return null;
    }
    return p.getActualRate() - p.getPlannedRate();
  }
}
