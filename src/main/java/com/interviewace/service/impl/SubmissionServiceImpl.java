package com.interviewace.service.impl;

import com.interviewace.dto.DashboardResponse;
import com.interviewace.dto.SubmissionRequest;
import com.interviewace.dto.SubmissionResponse;
import com.interviewace.entity.Questions;
import com.interviewace.entity.Submission;
import com.interviewace.entity.Users;
import com.interviewace.repository.QuestionRepository;
import com.interviewace.repository.SubmissionRepository;
import com.interviewace.repository.UserRepository;
import com.interviewace.service.SubmissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SubmissionServiceImpl implements SubmissionService {

    private final SubmissionRepository submissionRepository;

    private final UserRepository userRepository;

    private final QuestionRepository questionRepository;

    @Override
    public SubmissionResponse submitAnswer(SubmissionRequest request) {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        Users user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Questions question = questionRepository.findById(request.getQuestionId())
                .orElseThrow(() -> new RuntimeException("Question not found"));

        boolean correct = request.getUserAnswer()
                .trim()
                .equalsIgnoreCase(question.getAnswer().trim());

        Submission submission = Submission.builder()
                .user(user)
                .question(question)
                .userAnswer(request.getUserAnswer())
                .correct(correct)
                .score(correct ? 1 : 0)
                .submittedAt(LocalDateTime.now())
                .build();

        Submission saved = submissionRepository.save(submission);

        return mapToResponse(submission);
    }

    private SubmissionResponse mapToResponse(Submission submission){

        SubmissionResponse response = SubmissionResponse.builder()
                .id(submission.getId())
                .qusetionId(submission.getQuestion().getId())
                .userAnswer(submission.getUserAnswer())
                .correct(submission.getCorrect())
                .score(submission.getScore())
                .submittedAt(submission.getSubmittedAt())
                .build();

        return response;
    }

    @Override
    public List<SubmissionResponse> getMySubmissions() {

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        Users user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Submission> submissions = submissionRepository.findByUser(user);

        return submissions.stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public DashboardResponse getDashboard() {
        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        Users user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Long totalSubmission = submissionRepository.countByUser(user);

        Long correctAnswer = submissionRepository.countByUserAndCorrectTrue(user);

        Double avg = submissionRepository.findAverageScoreByUser(user);

        if(avg == null)avg = 0.0;

        Double accuracy = 0.0;

        if(totalSubmission > 0){
            accuracy = ((double)correctAnswer/totalSubmission) * 100;
        }

        return DashboardResponse.builder()
                .totalSubmissions(totalSubmission)
                .correctAnswers(correctAnswer)
                .accuracy(accuracy)
                .average(avg)
                .build();
    }
}
