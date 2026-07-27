package com.interviewace.service;

import com.interviewace.dto.*;

public interface MockInterviewService {
    StartInterviewResponse startInterview(StartInterviewRequest startInterviewRequest);

    AnswerResponse submitAnswer(AnswerRequest answerRequest);

    InterviewResultResponse getResult(Long sessionId);
}
