package com.snapflow.dto.request;

import com.snapflow.enums.Role;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UserUpdateRequest {
    @NotBlank(message = "Full name is required")
    private String fullName;

    private String phone;

    private Role role;

    private Boolean active;
}
