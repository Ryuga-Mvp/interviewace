package com.interviewace.dto;

import lombok.Data;

@Data
public class StartInterviewRequest {

    private String role;

    private Integer numberOfQuestions;
}
