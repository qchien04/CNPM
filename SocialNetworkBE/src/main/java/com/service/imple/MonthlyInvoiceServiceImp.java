package com.service.imple;


import com.entity.auth.User;
import com.entity.roomManagement.MonthlyInvoice;
import com.repository.MonthlyInvoiceRepo;
import com.service.RoomManagement.MonthlyInvoiceService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class MonthlyInvoiceServiceImp implements MonthlyInvoiceService {
    private MonthlyInvoiceRepo monthlyInvoiceRepo;


    @Override
    public MonthlyInvoice createMonthlyInvoice(MonthlyInvoice monthlyInvoice) {
        return monthlyInvoiceRepo.save(monthlyInvoice);
    }

    @Override
    public MonthlyInvoice findById(Integer id) {
        Optional<MonthlyInvoice> monthlyInvoice=monthlyInvoiceRepo.findById(id);
        return monthlyInvoice.isPresent()?monthlyInvoice.get():null;
    }

    @Override
    public List<MonthlyInvoice> findAllMonthlyInvoice() {
        return monthlyInvoiceRepo.findAll();
    }

    @Override
    public List<MonthlyInvoice> findMonthlyInvoiceByOwner(User user) {
        return monthlyInvoiceRepo.findByOwner(user);
    }

    @Override
    public List<MonthlyInvoice> findMonthlyInvoiceByTenant(User user) {
        return monthlyInvoiceRepo.findByTenant(user);
    }

    @Override
    public List<MonthlyInvoice> findByRoomRentalDetail_Id(Integer id) {
        return monthlyInvoiceRepo.findByRoomRentalDetail_Id(id);
    }

    @Override
    @Transactional
    public void deleteMonthlyInvoiceById(Integer id) {
        monthlyInvoiceRepo.deleteById(id);
    }
}
