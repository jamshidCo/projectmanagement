package com.leverx.projectmanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DelayedProjectDTO {
  private String projectName;
  private Double plannedRate;
  private Double actualRate;
  private Double deviationPercentage;
}
