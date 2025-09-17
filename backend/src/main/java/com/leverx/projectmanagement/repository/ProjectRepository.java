package com.leverx.projectmanagement.repository;

import com.leverx.projectmanagement.model.Project;
import com.leverx.projectmanagement.model.ProjectStatus;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {

  List<Project> findByStatus(ProjectStatus status);
}
