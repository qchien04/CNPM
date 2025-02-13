package com.repository;


import com.entity.OTPCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface OTPCodeRepo extends JpaRepository<OTPCode,Integer> {
    @Query("SELECT o FROM OTPCode o WHERE o.mail = ?1 AND o.data = ?2")
    Optional<OTPCode> findByMailAndData(String mail, String data);
}
