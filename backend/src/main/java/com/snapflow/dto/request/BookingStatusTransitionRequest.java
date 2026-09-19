package com.snapflow.dto.request;

import com.snapflow.enums.BookingStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class BookingStatusTransitionRequest {
    @NotNull(message = "New status is required")
    private BookingStatus newStatus;

    private String remarks;
}
