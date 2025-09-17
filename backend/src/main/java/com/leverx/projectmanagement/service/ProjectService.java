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
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.YearMonth;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.TreeMap;
import java.util.stream.Collectors;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

  public Page<Project> getAllProjects(Pageable pageable) {
    return projectRepository.findAll(pageable);
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

    return projectRepository.findAll().stream()
        .filter(project -> !project.getStartDate().isAfter(endOfYear)
            && !project.getEndDate().isBefore(startOfYear))
        .map(Project::getRevenue)
        .reduce(BigDecimal.ZERO, BigDecimal::add)
        .setScale(2, RoundingMode.HALF_UP);
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

  public Map<YearMonth, BigDecimal> getMonthlyRevenueDistribution() {
    List<Project> projects = projectRepository.findAll();

    Map<YearMonth, BigDecimal> revenueByMonth = new TreeMap<>();

    for (Project project : projects) {
      LocalDate startDate = project.getStartDate();
      LocalDate endDate = project.getEndDate();
      BigDecimal totalRevenue = project.getRevenue();

      if (startDate == null || endDate == null || totalRevenue == null) {
        continue;
      }

      long totalDays = ChronoUnit.DAYS.between(startDate, endDate) + 1;
      YearMonth startMonth = YearMonth.from(startDate);
      YearMonth endMonth = YearMonth.from(endDate);

      YearMonth currentMonth = startMonth;

      while (!currentMonth.isAfter(endMonth)) {
        LocalDate monthStart = currentMonth.atDay(1);
        LocalDate monthEnd = currentMonth.atEndOfMonth();

        LocalDate effectiveStart = startDate.isAfter(monthStart) ? startDate : monthStart;
        LocalDate effectiveEnd = endDate.isBefore(monthEnd) ? endDate : monthEnd;

        long daysInMonth = ChronoUnit.DAYS.between(effectiveStart, effectiveEnd) + 1;

        BigDecimal proportion = BigDecimal.valueOf(daysInMonth)
            .divide(BigDecimal.valueOf(totalDays), 6, RoundingMode.HALF_UP);

        BigDecimal monthlyRevenue = totalRevenue.multiply(proportion).setScale(2, RoundingMode.HALF_UP);

        revenueByMonth.merge(currentMonth, monthlyRevenue, BigDecimal::add);

        currentMonth = currentMonth.plusMonths(1);
      }
    }

    return revenueByMonth;
  }

  private Double calculateDeviation(Project p) {
    if (p.getActualRate() == null || p.getPlannedRate() == null) {
      return null;
    }
    return p.getActualRate() - p.getPlannedRate();
  }
}
