package com.interviewace.service;

import com.interviewace.dto.AIRequest;
import com.interviewace.dto.AIResponse;
import org.springframework.stereotype.Service;

public interface AIService {
    AIResponse generate(AIRequest aiRequest);
}
