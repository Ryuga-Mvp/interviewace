package com.interviewace.dto;

import lombok.Data;

@Data
public class QuestionRequest {

    private String title;

    private String description;

    private String topic;

    private String difficulty;

    private String answer;
}
