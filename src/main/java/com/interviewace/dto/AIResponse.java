package com.interviewace.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AIResponse {

    private String question;

    private String answer;

    private String difficulty;
}
