package com.interviewace.dto;

import lombok.*;

import java.util.List;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ResumeResponse {

    private int score;

    private List<String> missingSkills;

    private List<String> suggestions;

}
