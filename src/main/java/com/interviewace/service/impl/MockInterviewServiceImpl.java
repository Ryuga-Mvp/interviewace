package com.interviewace.service.impl;

import com.interviewace.dto.*;
import com.interviewace.entity.InterviewAnswer;
import com.interviewace.entity.InterviewSessions;
import com.interviewace.entity.Questions;
import com.interviewace.entity.Users;
import com.interviewace.repository.InterviewAnswerRepository;
import com.interviewace.repository.InterviewSessionRepository;
import com.interviewace.repository.QuestionRepository;
import com.interviewace.repository.UserRepository;
import com.interviewace.service.MockInterviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MockInterviewServiceImpl implements MockInterviewService {

    private final InterviewSessionRepository interviewSessionRepository;
    private final InterviewAnswerRepository interviewAnswerRepository;
    private final UserRepository userRepository;
    private final QuestionRepository questionRepository;

    @Override
    public StartInterviewResponse startInterview(StartInterviewRequest startInterviewRequest) {
        Users user = getCurrentUser();

        InterviewSessions session = InterviewSessions.builder()
                .user(user)
                .role(startInterviewRequest.getRole())
                .startedAt(LocalDateTime.now())
                .completed(false)
                .totalScore(0)
                .build();

        session = interviewSessionRepository.save(session);

        List<Questions> questions = questionRepository.findAll();

        questions = questions.stream()
                .limit(startInterviewRequest.getNumberOfQuestions())
                .toList();

        List<UserQuestionResponse> questionResponses =
                questions.stream()
                        .map(question -> UserQuestionResponse.builder()
                                .id(question.getId())
                                .title(question.getTitle())
                                .topic(question.getTopic())
                                .description(question.getDescription())
                                .difficulty(question.getDifficulty())
                                .build())
                        .toList();

        return StartInterviewResponse.builder()
                .sessionId(session.getId())
                .questions(questionResponses)
                .build();
    }

    @Override
    public AnswerResponse submitAnswer(AnswerRequest answerRequest) {
        InterviewSessions session = interviewSessionRepository
                .findById(answerRequest.getSessionId())
                .orElseThrow(() -> new RuntimeException("Session not found"));

        Questions questions =
                questionRepository.findById(answerRequest.getQuestionId())
                        .orElseThrow(() -> new RuntimeException("Question not found"));

        boolean correct = questions.getAnswer()
                .trim()
                .equalsIgnoreCase(answerRequest.getAnswer());

        int score = correct ? 10 : 0;

        String feedback;

        if(correct){
            feedback = "Correct Answer!";
        }
        else{
            feedback = "Incorrect. Review this topic and try again.";
        }

        InterviewAnswer answer = InterviewAnswer.builder()
                .interviewSession(session)
                .question(questions)
                .answer(answerRequest.getAnswer())
                .score(score)
                .feedback(feedback)
                .build();

        interviewAnswerRepository.save(answer);

        return AnswerResponse.builder()
                .correct(correct)
                .score(score)
                .feedback(feedback)
                .build();
    }

    @Override
    public InterviewResultResponse getResult(Long sessionId) {

        InterviewSessions session = interviewSessionRepository
                .findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Session not found"));

        List<InterviewAnswer> answers =
                interviewAnswerRepository.findByInterviewSession(session);

        int totalQuestions = answers.size();

        int totalScore = answers.stream()
                .mapToInt(InterviewAnswer::getScore)
                .sum();

        long correctAnswers = answers.stream()
                .filter(answer -> answer.getScore() == 10)
                .count();

        double accuracy = totalQuestions == 0 ? 0 : (correctAnswers * 100.0) / totalQuestions;

        String feedback;

        if (accuracy >= 80) {
            feedback = "Excellent performance!";
        }
        else if (accuracy >= 60) {
            feedback = "Good job. Keep practicing.";
        }
        else {
            feedback = "Needs improvement.";
        }

        return InterviewResultResponse.builder()
                .totalQuestions(totalQuestions)
                .correctAnswers((int) correctAnswers)
                .totalScore(totalScore)
                .accuracy(accuracy)
                .feedback(feedback)
                .build();
    }

    private Users getCurrentUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        return userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
    }
}
