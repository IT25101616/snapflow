package com.snapflow.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AssignmentCreateRequest {
    @NotNull(message = "Booking ID is required")
    private Long bookingId;

    @NotNull(message = "Photographer ID is required")
    private Long photographerId;

    private String notes;
}
