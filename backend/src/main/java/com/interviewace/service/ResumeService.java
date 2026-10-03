package com.interviewace.service;

import com.interviewace.dto.ResumeResponse;
import org.springframework.web.multipart.MultipartFile;

public interface ResumeService {

    ResumeResponse analyzeResume(MultipartFile file);
}
