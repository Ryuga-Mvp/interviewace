package com.interviewace.controller;

import com.interviewace.dto.ResumeResponse;
import com.interviewace.service.ResumeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/resume")
@RequiredArgsConstructor
public class ResumeController {

    private final ResumeService resumeService;

    @PostMapping("/upload")
    public ResumeResponse uploadResume(@RequestParam MultipartFile file){
        return resumeService.analyzeResume(file);
    }
}
