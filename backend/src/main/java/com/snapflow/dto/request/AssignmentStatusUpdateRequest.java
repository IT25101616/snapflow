package com.snapflow.dto.request;

import com.snapflow.enums.AssignmentStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AssignmentStatusUpdateRequest {
    @NotNull(message = "New status is required")
    private AssignmentStatus newStatus;

    private String remarks;
}
