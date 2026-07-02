package com.interviewace.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DashboardResponse {

    private Long totalSubmissions;

    private Long correctAnswers;

    private double accuracy;

    private double average;
}
