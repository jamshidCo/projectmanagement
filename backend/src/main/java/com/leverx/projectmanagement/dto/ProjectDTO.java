package com.leverx.projectmanagement.dto;

import com.leverx.projectmanagement.model.ProjectStatus;
import java.math.BigDecimal;
import java.time.LocalDate;
import lombok.Data;

@Data
public class ProjectDTO {
  private String projectName;
  private Long categoryId;
  private BigDecimal revenue;
  private LocalDate startDate;
  private LocalDate endDate;
  private Integer workingDays;
  private String pmName;
  private Double plannedRate;
  private Double actualRate;
  private ProjectStatus status;
}
