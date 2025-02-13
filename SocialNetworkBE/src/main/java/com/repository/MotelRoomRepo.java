package com.repository;

import com.entity.roomManagement.MotelRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface MotelRoomRepo extends JpaRepository<MotelRoom,Integer> {
    Optional<MotelRoom> findById(Integer id);
    Optional<MotelRoom> findByName(String name);

    @Query("SELECT m FROM MotelRoom m WHERE " +
            "m.name LIKE %:key% OR " +
            "m.type_room LIKE %:key% OR " +
            "m.address LIKE %:key% OR " +
            "m.description LIKE %:key%")
    List<MotelRoom> findWithKey(@Param("key") String key);

    @Query("SELECT m FROM MotelRoom m WHERE " +
            "m.owner.email=:email ")
    List<MotelRoom> MyMotelRoom(@Param("email") String email);

    @Query("SELECT m.motelRoom FROM RoomRentalDetail m WHERE " +
            "m.tenant.email=:email ")
    List<MotelRoom> TenantMotelRoom(@Param("email") String email);

}