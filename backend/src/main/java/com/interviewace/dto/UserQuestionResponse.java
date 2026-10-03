package com.interviewace.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserQuestionResponse {

    private long id;

    private String title;

    private String description;

    private String topic;

    private String difficulty;

}

