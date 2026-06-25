package com.interviewace.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class QuestionResponse {

    private long id;

    private String title;

    private String description;

    private String topic;

    private String difficulty;

    private String answer;

}
