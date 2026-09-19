package com.snapflow.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class AvailabilityCheckRequest {
    @NotNull(message = "Date is required")
    private LocalDate eventDate;

    @NotNull(message = "Start time is required")
    private LocalTime startTime;

    private Integer durationHours = 4;

    private Long preferredPhotographerId;
}
