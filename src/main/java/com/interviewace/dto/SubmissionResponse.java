package com.interviewace.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Builder
@Data
public class SubmissionResponse {

    private Long id;

    private Long qusetionId;

    private String userAnswer;

    private Boolean correct;

    private Integer score;

    private LocalDateTime submittedAt;
}
