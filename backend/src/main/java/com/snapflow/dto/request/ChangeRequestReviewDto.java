package com.snapflow.dto.request;

import com.snapflow.enums.ChangeRequestStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ChangeRequestReviewDto {
    @NotNull(message = "Status (APPROVED or REJECTED) is required")
    private ChangeRequestStatus status;

    private String reviewNotes;
}
