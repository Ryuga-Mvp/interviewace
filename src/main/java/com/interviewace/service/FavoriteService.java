package com.interviewace.service;

import com.interviewace.dto.FavoriteResponse;

import java.util.List;

public interface FavoriteService {
    void addFavorite(Long questionId);

    void removeFavorite(Long questionId);

    List<FavoriteResponse> getMyFavorites();
}
