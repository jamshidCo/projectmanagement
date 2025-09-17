package com.leverx.projectmanagement.repository;

import com.leverx.projectmanagement.model.Project;
import com.leverx.projectmanagement.model.ProjectStatus;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {
  @Query("SELECT p.status, COUNT(p) FROM Project p GROUP BY p.status")
  List<Object[]> countProjectsByStatus();

  List<Project> findByStatus(ProjectStatus status);
}
