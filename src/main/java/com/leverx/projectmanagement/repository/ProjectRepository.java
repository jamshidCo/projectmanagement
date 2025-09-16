package com.leverx.projectmanagement.repository;

import com.leverx.projectmanagement.model.Project;
import com.leverx.projectmanagement.model.ProjectStatus;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProjectRepository extends JpaRepository<Project, Long> {

  @Query("SELECT SUM(p.revenue) FROM Project p " +
      "WHERE p.startDate <= :endOfYear AND p.endDate >= :startOfYear")
  Optional<BigDecimal> getTotalRevenueBetween(
      @Param("startOfYear") LocalDate startOfYear,
      @Param("endOfYear") LocalDate endOfYear
  );

  List<Project> findByStatus(ProjectStatus status);
}
