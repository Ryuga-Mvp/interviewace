package com.interviewace.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class InterviewAnswerResponse {

    private Long questionId;

    private String questionTitle;

    private String correctAnswer;

    private String userAnswer;

    private Integer score;

    private String feedback;
}
