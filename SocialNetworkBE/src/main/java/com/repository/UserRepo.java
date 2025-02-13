package com.repository;

import com.entity.auth.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface UserRepo extends JpaRepository<User,Integer> {
    Optional<User> findByUsername(String username);
    Optional<User> findById(int id);
    User findByEmail(String email);

    @Query("select u from User u where u.username like %:query% or u.email like %:query%")
    List<User> searchUser(@Param("query") String query);


}
