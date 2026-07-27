package com.interviewace.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "interview_sessions")
@Builder
@Getter
@Setter
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
