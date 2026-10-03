package com.interviewace.controller;

import com.interviewace.dto.*;
import com.interviewace.service.MockInterviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/mock")
@RequiredArgsConstructor
public class MockInterviewController {

    private final MockInterviewService mockInterviewService;

    @PostMapping("/start")
    public StartInterviewResponse startInterview(@RequestBody StartInterviewRequest startInterviewRequest){
        return mockInterviewService.startInterview(startInterviewRequest);
    }

    @PostMapping("/answer")
    public AnswerResponse submitAnswer(@RequestBody AnswerRequest answerRequest){
        return mockInterviewService.submitAnswer(answerRequest);
    }

    @GetMapping("result/{sessionId}")
    public InterviewResultResponse getResult(@PathVariable Long sessionId){
        return mockInterviewService.getResult(sessionId);
    }
}
