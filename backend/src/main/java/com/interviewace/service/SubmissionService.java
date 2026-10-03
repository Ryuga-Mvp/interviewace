package com.interviewace.service;

import com.interviewace.dto.DashboardResponse;
import com.interviewace.dto.SubmissionRequest;
import com.interviewace.dto.SubmissionResponse;

import java.util.List;

public interface SubmissionService {

    SubmissionResponse submitAnswer(SubmissionRequest request);

    List<SubmissionResponse> getMySubmissions();

    DashboardResponse getDashboard();
}
