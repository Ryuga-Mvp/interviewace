package com.interviewace.controller;

import com.interviewace.dto.DashboardResponse;
import com.interviewace.service.SubmissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/progress")
@RequiredArgsConstructor
public class ProgressController {

    private final SubmissionService service;

    @GetMapping("/dashboard")
    private DashboardResponse getDashboard(){
        return service.getDashboard();
    }
}
