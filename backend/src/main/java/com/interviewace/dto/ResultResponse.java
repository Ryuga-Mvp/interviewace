package com.interviewace.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ResultResponse {

    private Integer totalScore;

    private Double pecentage;

    private List<InterviewAnswerResponse> answers;
}
