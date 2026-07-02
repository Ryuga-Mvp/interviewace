package com.interviewace.dto;

import lombok.Data;

@Data
public class SubmissionRequest {

    private Long questionId;

    private String userAnswer;
}
