package com.interviewace.controller;

import com.interviewace.dto.SubmissionRequest;
import com.interviewace.dto.SubmissionResponse;
import com.interviewace.service.SubmissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/submissions")
@RequiredArgsConstructor
public class SubmissionController {

    private final SubmissionService service;

    @PostMapping
    private SubmissionResponse submitAnswer(@RequestBody SubmissionRequest request){
        return service.submitAnswer(request);
    }

    @GetMapping("/me")
    private List<SubmissionResponse> getMySubmissions(){
        return service.getMySubmissions();
    }
}
