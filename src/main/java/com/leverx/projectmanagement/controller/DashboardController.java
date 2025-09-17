package com.leverx.projectmanagement.controller;

import com.leverx.projectmanagement.dto.DelayedProjectsByPmDTO;
import com.leverx.projectmanagement.dto.ProjectCategoryGroupDTO;
import com.leverx.projectmanagement.service.ProjectService;
import java.math.BigDecimal;
import java.time.YearMonth;
import java.time.format.TextStyle;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;
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
  public Map<String, BigDecimal> getSalesRevenue() {
    Map<YearMonth, BigDecimal> monthlyRevenue = projectService.getMonthlyRevenueDistribution();

    return monthlyRevenue.entrySet().stream()
        .collect(Collectors.toMap(
            entry -> entry.getKey().getMonth().getDisplayName(TextStyle.FULL, Locale.ENGLISH),
            Map.Entry::getValue,
            (v1, v2) -> v1,
            LinkedHashMap::new
        ));
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
