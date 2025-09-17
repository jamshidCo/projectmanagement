package com.leverx.projectmanagement.repository;

import com.leverx.projectmanagement.model.ProjectCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectCategoryRepository extends JpaRepository<ProjectCategory, Long> {
}
