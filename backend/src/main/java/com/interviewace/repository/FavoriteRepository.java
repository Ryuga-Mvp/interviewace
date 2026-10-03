package com.interviewace.repository;

import com.interviewace.dto.FavoriteResponse;
import com.interviewace.entity.Favorite;
import com.interviewace.entity.Questions;
import com.interviewace.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

    Optional<Favorite> findByUserAndQuestion(Users user, Questions question);

    void deleteByUserAndQuestion(Users user, Questions question);

    List<Favorite> findByUser(Users user);
}
