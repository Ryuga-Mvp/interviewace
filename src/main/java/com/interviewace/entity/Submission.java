package com.interviewace.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "submissions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Submission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users user;

    @ManyToOne
    @JoinColumn(name = "question_id")
    private Questions question;

    @Column(columnDefinition = "TEXT")
    private String userAnswer;

    private Boolean correct;

    private Integer score;

    private LocalDateTime submittedAt;
}
