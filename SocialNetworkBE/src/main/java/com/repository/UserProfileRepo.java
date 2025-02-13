package com.repository;

import com.entity.auth.User;
import com.entity.auth.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserProfileRepo extends JpaRepository<UserProfile,Integer> {
    Optional<UserProfile> findByName(String name);
    Optional<UserProfile> findById(int id);
    Optional<UserProfile> findByUserId(Integer userId);

    @Query("select u from UserProfile u where u.name like %:query%")
    List<UserProfile> searchUserProfile(@Param("query") String query);
}
