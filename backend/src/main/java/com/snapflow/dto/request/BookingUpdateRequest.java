package com.snapflow.dto.request;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Data
public class BookingUpdateRequest {
    private Long packageId;
    private Long preferredPhotographerId;
    private LocalDate eventDate;
    private LocalTime startTime;
    private String venue;
    private String eventType;
    private String specialRequests;
    private String internalNotes;
    private List<Long> addOnIds;
}
