package com.snapflow.service;

import com.snapflow.dto.request.ReviewCreateRequest;
import com.snapflow.dto.response.ReviewResponse;
import com.snapflow.entity.Booking;
import com.snapflow.entity.PhotographerAssignment;
import com.snapflow.entity.Review;
import com.snapflow.entity.User;
import com.snapflow.enums.BookingStatus;
import com.snapflow.enums.Role;
import com.snapflow.exception.BadRequestException;
import com.snapflow.exception.ForbiddenException;
import com.snapflow.exception.ResourceNotFoundException;
import com.snapflow.repository.BookingRepository;
import com.snapflow.repository.ReviewRepository;
import com.snapflow.util.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final BookingRepository bookingRepository;
    private final SecurityUtils securityUtils;
    private final AuditService auditService;

    @Transactional
    public ReviewResponse submitReview(ReviewCreateRequest request) {
        Booking booking = bookingRepository.findById(request.getBookingId())
                .orElseThrow(() -> new ResourceNotFoundException("Booking", "id", request.getBookingId()));

        User customer = securityUtils.getCurrentUser();
        if (customer.getRole() == Role.CUSTOMER && !booking.getCustomer().getId().equals(customer.getId())) {
            throw new ForbiddenException("You can only review your own booking");
        }

        if (booking.getStatus() != BookingStatus.COMPLETED) {
            throw new BadRequestException("Reviews can only be submitted after the event is COMPLETED");
        }

        if (reviewRepository.existsByBookingId(booking.getId())) {
            throw new BadRequestException("A review has already been submitted for this booking");
        }

        User photographer = null;
        if (!booking.getAssignments().isEmpty()) {
            photographer = booking.getAssignments().get(0).getPhotographer();
        }

        Review review = Review.builder()
                .booking(booking)
                .customer(customer)
                .rating(request.getRating())
                .comment(request.getComment() != null ? request.getComment().trim() : null)
                .photographer(photographer)
                .build();

        Review saved = reviewRepository.save(review);
        auditService.log("REVIEW_SUBMITTED", "Review submitted for " + booking.getBookingRef() + " (Rating: " + request.getRating() + ")");
        return mapToResponse(saved);
    }

    @Transactional(readOnly = true)
    public Page<ReviewResponse> getAllReviews(Pageable pageable) {
        return reviewRepository.findAll(pageable).map(this::mapToResponse);
    }

    @Transactional(readOnly = true)
    public List<ReviewResponse> getMyReviews() {
        Long customerId = securityUtils.getCurrentUserId();
        return reviewRepository.findByCustomerId(customerId).stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<ReviewResponse> getPhotographerReviews(Long photographerId) {
        return reviewRepository.findByPhotographerId(photographerId).stream()
                .map(this::mapToResponse)
                .toList();
    }

    public ReviewResponse mapToResponse(Review r) {
        return ReviewResponse.builder()
                .id(r.getId())
                .bookingId(r.getBooking().getId())
                .bookingRef(r.getBooking().getBookingRef())
                .customerId(r.getCustomer().getId())
                .customerName(r.getCustomer().getFullName())
                .rating(r.getRating())
                .comment(r.getComment())
                .photographerId(r.getPhotographer() != null ? r.getPhotographer().getId() : null)
                .photographerName(r.getPhotographer() != null ? r.getPhotographer().getFullName() : null)
                .createdAt(r.getCreatedAt())
                .build();
    }
}
