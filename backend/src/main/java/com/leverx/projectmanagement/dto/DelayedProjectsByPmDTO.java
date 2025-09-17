package com.leverx.projectmanagement.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DelayedProjectsByPmDTO {
  private String pmName;
  private List<DelayedProjectDTO> projects;
}
