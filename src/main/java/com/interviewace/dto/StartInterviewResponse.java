package com.interviewace.dto;

import com.interviewace.entity.Questions;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class StartInterviewResponse {

    private Long sessionId;

    private List<UserQuestionResponse> questions;
}
