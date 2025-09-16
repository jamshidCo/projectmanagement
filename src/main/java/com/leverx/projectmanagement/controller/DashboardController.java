package com.leverx.projectmanagement.controller;

import com.leverx.projectmanagement.dto.DelayedProjectsByPmDTO;
import com.leverx.projectmanagement.dto.ProjectCategoryGroupDTO;
import com.leverx.projectmanagement.model.Project;
import com.leverx.projectmanagement.service.ProjectService;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

  private final ProjectService projectService;

  public DashboardController(ProjectService projectService) {
    this.projectService = projectService;
  }

  @GetMapping("/sales_revenue")
  public ResponseEntity<List<Project>> getSalesRevenue() {
    return ResponseEntity.ok(projectService.getAllProjects());
  }

  @GetMapping("/business_type")
  public ResponseEntity<List<ProjectCategoryGroupDTO>> getBusinessType() {
    return ResponseEntity.ok(projectService.getProjectsGroupedByCategory());
  }

  @GetMapping("/kpi/{year}")
  public ResponseEntity<Map<String, BigDecimal>> getKPI(@PathVariable int year) {
    return ResponseEntity.ok(Map.of("totalAmount", projectService.getTotalRevenueForYear(year)));
  }

  @GetMapping("/delayed_project")
  public ResponseEntity<List<DelayedProjectsByPmDTO>> getDelayedProject() {
    return ResponseEntity.ok(projectService.getDelayedProjectsGroupedByPm());
  }
}
