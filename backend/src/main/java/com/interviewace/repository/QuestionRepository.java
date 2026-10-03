package com.interviewace.repository;

import com.interviewace.entity.Questions;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Questions, Long> {

    List<Questions> findByTopic(String topic);

    List<Questions> findByDifficulty(String difficulty);

}
