package com.interviewace.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.hibernate.annotations.AnyDiscriminatorImplicitValues;

import javax.lang.model.element.Name;

@Entity
@Table(name = "Question")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Questions {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String title;

    @Column(length = 2000)
    private String description;

    @NotBlank
    private String topic;

    @NotBlank
    private  String difficulty;

    @Column(length = 5000)
    private String answer;

}
