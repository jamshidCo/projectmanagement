package com.leverx.projectmanagement.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;
import lombok.Data;

@Data
@Entity
public class Project {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "project_name")
  private String projectName;

  @Column(name = "category")
  private String category;

  @Column(name = "revenue")
  private BigDecimal revenue;

  @Column(name = "start_date")
  private LocalDate startDate;

  @Column(name = "endDate")
  private LocalDate endDate;

  @Column(name = "working_days")
  private Integer workingDays;

  @Column(name = "pm_name")
  private String pmName;

  @Column(name = "planned_rate")
  private Double plannedRate;

  @Column(name = "actual_rate")
  private Double actualRate;

  @Column(name = "status")
  private String status;
}
