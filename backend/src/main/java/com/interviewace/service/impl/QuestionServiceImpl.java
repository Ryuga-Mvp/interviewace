package com.interviewace.service.impl;

import com.interviewace.dto.QuestionRequest;
import com.interviewace.dto.QuestionResponse;
import com.interviewace.entity.Questions;
import com.interviewace.exception.ResourceNotFoundException;
import com.interviewace.repository.QuestionRepository;
import com.interviewace.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionServiceImpl implements QuestionService {

    private final QuestionRepository questionRepository;

    @Override
    public QuestionResponse createQuestion(QuestionRequest request) {
        Questions question = Questions.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .topic(request.getTopic())
                .difficulty(request.getDifficulty())
                .answer(request.getAnswer())
                .build();

        Questions saved = questionRepository.save(question);

        return mapToResponse(saved);
    }

    @Override
    public List<QuestionResponse> getQuestionByTopic(String topic) {
        return questionRepository.findByTopic(topic)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<QuestionResponse> getQuestionByDifficulty(String difficulty) {
        return questionRepository.findByDifficulty(difficulty)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<QuestionResponse> getAllQuestions() {
        return questionRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public QuestionResponse getQuestionById(Long id) {
        Questions question =  questionRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(
                "Question not found"
        ));

        return mapToResponse(question);
    }

    @Override
    public QuestionResponse updateQuestion(Long id, QuestionRequest request) {
        Questions question = questionRepository.findById(id).orElseThrow();

        question.setTitle(request.getTitle());
        question.setDescription(request.getDescription());
        question.setTopic(request.getTopic());
        question.setDifficulty(request.getDifficulty());
        question.setAnswer(request.getAnswer());

        Questions updated = questionRepository.save(question);

        return mapToResponse(question);
    }

    @Override
    public void deleteQuestion(Long id) {
        questionRepository.deleteById(id);
    }

    private QuestionResponse mapToResponse(Questions question){
        QuestionResponse response = QuestionResponse.builder()
                .id(question.getId())
                .title(question.getTitle())
                .description(question.getDescription())
                .topic(question.getTopic())
                .difficulty(question.getDifficulty())
                .answer(question.getAnswer())
                .build();

        return response;
    }

}
