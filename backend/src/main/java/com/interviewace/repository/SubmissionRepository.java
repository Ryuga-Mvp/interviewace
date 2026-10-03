package com.interviewace.repository;

import com.interviewace.entity.Questions;
import com.interviewace.entity.Submission;
import com.interviewace.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SubmissionRepository extends JpaRepository<Submission, Long> {

    List<Submission> findByUser(Users user);

    List<Submission> findByQuestion(Questions question);

    Long countByUser(Users user);

    Long countByUserAndCorrectTrue(Users user);

    @Query("""
            SELECT AVG(s.score) FROM Submission s WHERE s.user = :user
            """)
    Double findAverageScoreByUser(Users user);

}
