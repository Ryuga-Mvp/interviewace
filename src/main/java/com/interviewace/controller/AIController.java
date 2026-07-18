package com.interviewace.controller;

import com.interviewace.dto.AIRequest;
import com.interviewace.dto.AIResponse;
import com.interviewace.service.AIService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/ai")
@RequiredArgsConstructor
public class AIController {

    private final AIService aiService;

    @PostMapping("/generate")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public AIResponse generate(@RequestBody AIRequest aiRequest){
        return aiService.generate(aiRequest);
    }

}
