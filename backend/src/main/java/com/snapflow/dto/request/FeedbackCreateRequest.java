package com.snapflow.dto.request;

import com.snapflow.enums.FeedbackType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class FeedbackCreateRequest {
    private String name;
    private String email;

    @NotNull(message = "Feedback type is required")
    private FeedbackType type;

    @NotBlank(message = "Subject is required")
    private String subject;

    @NotBlank(message = "Message is required")
    private String message;
}
