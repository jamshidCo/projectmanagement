package com.leverx.projectmanagement.repository;

import com.leverx.projectmanagement.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {

}
