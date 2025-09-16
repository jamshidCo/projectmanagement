package com.leverx.projectmanagement.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import lombok.Data;

@Data
public class ProjectDTO {
  private String projectName;
  private String category;
  private BigDecimal revenue;
  private LocalDate startDate;
  private LocalDate endDate;
  private Integer workingDays;
  private String pmName;
  private Double plannedRate;
  private Double actualRate;
  private String status;
}
