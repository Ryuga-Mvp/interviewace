package com.interviewace.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "interview_sessions")
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InterviewSessions {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Users user;

    private String role;

    private LocalDateTime startedAt;

    private LocalDateTime completedAt;

    private Integer totalScore;

    private Boolean completed;
}
