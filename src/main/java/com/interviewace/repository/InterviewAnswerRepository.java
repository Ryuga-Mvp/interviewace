package com.interviewace.repository;

import com.interviewace.entity.InterviewAnswer;
import com.interviewace.entity.InterviewSessions;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InterviewAnswerRepository extends JpaRepository<InterviewAnswer, Long> {

    List<InterviewAnswer> findByInterviewSession(InterviewSessions session);

}
