package com.leverx.projectmanagement.model;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.math.BigDecimal;
import java.time.LocalDate;
import lombok.Data;

@Data
@Entity
public class Project {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String projectName;

  private BigDecimal revenue;

  private LocalDate startDate;

  private LocalDate endDate;

  private Integer workingDays;

  private String pmName;

  private Double plannedRate;

  private Double actualRate;

  @Enumerated(EnumType.STRING)
  private ProjectStatus status;

  @ManyToOne
  @JoinColumn(name = "category_id")
  private ProjectCategory category;
}
