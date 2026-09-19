package com.snapflow.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Data
public class ChangeRequestCreateDto {
    private Long proposedPackageId;
    private LocalDate proposedDate;
    private LocalTime proposedStartTime;
    private String proposedVenue;
    private List<Long> proposedAddOnIds;

    @NotBlank(message = "Description of change request is required")
    private String description;
}
