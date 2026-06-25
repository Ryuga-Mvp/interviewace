package com.interviewace.service;

import com.interviewace.dto.QuestionRequest;
import com.interviewace.dto.QuestionResponse;

import java.util.List;


public interface QuestionService {

    public QuestionResponse createQuestion(QuestionRequest request);

    List<QuestionResponse> getQuestionByTopic(String topic);

    List<QuestionResponse> getQuestionByDifficulty(String difficulty);

    List<QuestionResponse> getAllQuestions();

    QuestionResponse getQuestionById(Long id);

    QuestionResponse updateQuestion(Long id, QuestionRequest request);

    void deleteQuestion(Long id);
}
