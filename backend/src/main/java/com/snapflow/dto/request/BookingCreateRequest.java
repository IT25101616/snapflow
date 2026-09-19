package com.snapflow.dto.request;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Data
public class BookingCreateRequest {
    private Long customerId; // Optional: set by CRO if booking on behalf of customer

    @NotNull(message = "Package is required")
    private Long packageId;

    private Long preferredPhotographerId;

    @NotNull(message = "Event date is required")
    @FutureOrPresent(message = "Event date cannot be in the past")
    private LocalDate eventDate;

    @NotNull(message = "Event start time is required")
    private LocalTime startTime;

    @NotBlank(message = "Venue is required")
    private String venue;

    @NotBlank(message = "Event type is required")
    private String eventType;

    private String specialRequests;

    private List<Long> addOnIds;
}
