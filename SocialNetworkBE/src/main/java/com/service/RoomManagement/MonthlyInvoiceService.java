package com.service.RoomManagement;

import com.entity.auth.User;
import com.entity.roomManagement.MonthlyInvoice;

import java.util.List;

public interface MonthlyInvoiceService {
    MonthlyInvoice createMonthlyInvoice(MonthlyInvoice monthlyInvoice);

    MonthlyInvoice findById(Integer id);

    List<MonthlyInvoice> findAllMonthlyInvoice();

    List<MonthlyInvoice> findMonthlyInvoiceByOwner(User user);

    List<MonthlyInvoice> findMonthlyInvoiceByTenant(User user);

    List<MonthlyInvoice> findByRoomRentalDetail_Id(Integer id);

    void deleteMonthlyInvoiceById(Integer id);
}
