package com.interviewace.controller;

import com.interviewace.dto.QuestionRequest;
import com.interviewace.dto.QuestionResponse;
import com.interviewace.service.QuestionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
@RequiredArgsConstructor
public class QuestionController {

    private final QuestionService questionService;

    @PostMapping
    public QuestionResponse createQuestion(@Valid @RequestBody QuestionRequest request){
        return questionService.createQuestion(request);
    }

    @GetMapping
    public List<QuestionResponse> getAll(@RequestParam(required = false) String topic
            , @RequestParam(required = false) String difficulty){

        if(topic != null){
            return questionService.getQuestionByTopic(topic);
        }
        if(difficulty != null){
            return questionService.getQuestionByDifficulty(difficulty);
        }
        return questionService.getAllQuestions();
    }

    @GetMapping("/{id}")
    public QuestionResponse getQuestionById(@PathVariable Long id){
        return questionService.getQuestionById(id);
    }

    @PutMapping("/{id}")
    public QuestionResponse updateQuestion(@PathVariable Long id, @RequestBody QuestionRequest request){
        return questionService.updateQuestion(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteQuestion(@PathVariable Long id){
        questionService.deleteQuestion(id);
    }

}
