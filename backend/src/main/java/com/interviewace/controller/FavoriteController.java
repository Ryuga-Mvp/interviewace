package com.interviewace.controller;

import com.interviewace.dto.FavoriteResponse;
import com.interviewace.service.FavoriteService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/favorites")
@RequiredArgsConstructor
public class FavoriteController {

    private final FavoriteService service;

    @PostMapping("/{questionId}")
    public void addfavorite(@PathVariable Long questionId){
        service.addFavorite(questionId);
    }

    @DeleteMapping("/{questionId}")
    @Transactional
    public void removeFavorite(@PathVariable Long questionId){
        service.removeFavorite(questionId);
    }

    @GetMapping
    public List<FavoriteResponse> getMyFavorites(){
        return service.getMyFavorites();
    }
}
