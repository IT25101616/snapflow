package com.snapflow.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class GalleryCreateRequest {
    @NotNull(message = "Booking ID is required")
    private Long bookingId;

    @NotBlank(message = "Gallery title is required")
    private String title;

    private boolean proofSelectionEnabled;

    private LocalDate proofDeadline;
}
