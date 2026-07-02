package com.interviewace.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FavoriteResponse {

    private Long favorite_id;

    private Long question_id;

    private String title;

    private String topic;

    private String difficulty;
}
