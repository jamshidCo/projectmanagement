package com.leverx.projectmanagement.dto;

import com.leverx.projectmanagement.model.Project;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProjectCategoryGroupDTO {
  private Long categoryId;
  private String categoryName;
  private List<Project> projects;
}
