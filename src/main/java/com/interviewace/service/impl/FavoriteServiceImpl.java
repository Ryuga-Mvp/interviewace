package com.interviewace.service.impl;

import com.interviewace.dto.FavoriteResponse;
import com.interviewace.entity.Favorite;
import com.interviewace.entity.Questions;
import com.interviewace.entity.Users;
import com.interviewace.repository.FavoriteRepository;
import com.interviewace.repository.QuestionRepository;
import com.interviewace.repository.UserRepository;
import com.interviewace.service.FavoriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FavoriteServiceImpl implements FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final QuestionRepository questionRepository;
    private final UserRepository userRepository;

    @Override
    public void addFavorite(Long questionId) {
        Users user = getCurrentUser();

        Questions question = questionRepository.findById(questionId).orElseThrow();

        boolean alreadyExist = favoriteRepository
                .findByUserAndQuestion(user, question).isPresent();

        if(alreadyExist)return;

        Favorite favorite = Favorite.builder()
                .user(user)
                .question(question)
                .createdAt(LocalDateTime.now())
                .build();

        favoriteRepository.save(favorite);
    }

    @Override
    public void removeFavorite(Long questionId) {
        Users user = getCurrentUser();

        Questions question = questionRepository.findById(questionId).orElseThrow();

        favoriteRepository.deleteByUserAndQuestion(user, question);
    }

    @Override
    public List<FavoriteResponse> getMyFavorites() {
        Users user = getCurrentUser();

        return favoriteRepository.findByUser(user)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    private Users getCurrentUser(){

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        return userRepository.findByEmail(email).orElseThrow();
    }

    private FavoriteResponse mapToResponse(Favorite favorite){
        return FavoriteResponse.builder()
                .favorite_id(favorite.getId())
                .question_id(favorite.getQuestion().getId())
                .title(favorite.getQuestion().getTitle())
                .topic(favorite.getQuestion().getTopic())
                .difficulty(favorite.getQuestion().getDifficulty())
                .build();
    }
}
