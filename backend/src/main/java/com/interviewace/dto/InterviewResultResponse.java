package com.interviewace.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InterviewResultResponse {

    private Integer totalQuestions;

    private Integer correctAnswers;

    private Integer totalScore;

    private Double accuracy;

    private String feedback;

}
