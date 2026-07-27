package com.interviewace.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "interview_answers")
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InterviewAnswer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private InterviewSessions interviewSession;

    @ManyToOne
    private Questions question;

    @Column(columnDefinition = "TEXT")
    private String answer;

    private Integer score;

    @Column(columnDefinition = "TEXT")
    private String feedback;
}
