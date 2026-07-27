package com.interviewace.repository;

import com.interviewace.entity.InterviewSessions;
import com.interviewace.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface InterviewSessionRepository extends JpaRepository<InterviewSessions, Long> {

    Optional<InterviewSessions> findById(Long id);

    List<InterviewSessions> findByUser(Users user);

    Optional<InterviewSessions> findTopByUserOrderByStartedAtDesc(Users user);
}
