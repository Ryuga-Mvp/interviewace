package com.interviewace.service.impl;

import com.interviewace.dto.AIRequest;
import com.interviewace.dto.AIResponse;
import com.interviewace.service.AIService;
import org.springframework.stereotype.Service;

@Service
public class AIServiceImpl implements AIService {

    @Override
    public AIResponse generate(AIRequest aiRequest) {
        return AIResponse.builder()
                .question("Demo question for testing")
                .answer("null")
                .difficulty(aiRequest.getDifficulty())
                .build();
    }
}
