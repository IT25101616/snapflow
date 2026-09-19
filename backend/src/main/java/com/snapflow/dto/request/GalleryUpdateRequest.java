package com.snapflow.dto.request;

import com.snapflow.enums.GalleryStatus;
import lombok.Data;

import java.time.LocalDate;

@Data
public class GalleryUpdateRequest {
    private String title;
    private GalleryStatus status;
    private Long coverPhotoId;
    private Boolean proofSelectionEnabled;
    private LocalDate proofDeadline;
}
