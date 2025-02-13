package com.repository;

import com.entity.auth.User;
import com.entity.roomManagement.MonthlyInvoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface MonthlyInvoiceRepo extends JpaRepository<MonthlyInvoice,Integer> {
    Optional<MonthlyInvoice> findById(Integer id);
    List<MonthlyInvoice> findByRoomRentalDetail_Id(Integer id);

    @Query("SELECT m FROM MonthlyInvoice m WHERE m.roomRentalDetail.motelRoom.owner = :user")
    List<MonthlyInvoice> findByOwner(User user);

    @Query("SELECT m FROM MonthlyInvoice m WHERE m.roomRentalDetail.tenant = :user")
    List<MonthlyInvoice> findByTenant(User user);
}
