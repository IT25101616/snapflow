package com.snapflow.dto.request;

import com.snapflow.enums.EquipmentStatus;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class EquipmentRequest {
    @NotBlank(message = "Equipment name is required")
    private String name;

    @NotBlank(message = "Category is required")
    private String category;

    @NotBlank(message = "Serial number is required")
    private String serialNumber;

    private EquipmentStatus status = EquipmentStatus.AVAILABLE;

    private String notes;
}
