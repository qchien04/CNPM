package com.repository;

import com.entity.roomManagement.Amenity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface AmenityRepo extends JpaRepository<Amenity,Integer>{
    Optional<Amenity> findById(Integer id);
    Optional<Amenity> findByName(String name);
}
