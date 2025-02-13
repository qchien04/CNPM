package com.controller.roomManagement;


import com.entity.auth.User;
import com.entity.roomManagement.MonthlyInvoice;
import com.mapper.MonthlyInvoiceMapper;
import com.request.CreatMonthlyInvoiceRequest;
import com.response.ApiResponse;
import com.response.MonthlyInvoiceResponse;
import com.service.RoomManagement.MonthlyInvoiceService;
import com.service.RoomManagement.MotelRoomService;
import com.service.RoomManagement.RoomRentalDetailService;
import com.service.auth.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/monthlyInvoice")
public class MonthlyInvoiceController {
    private RoomRentalDetailService roomRentalDetailService;
    private MotelRoomService motelRoomService;
    private UserService userService;
    private MonthlyInvoiceService monthlyInvoiceService;
    private MonthlyInvoiceMapper monthlyInvoiceMapper;

    @PostMapping("/create")
    public ResponseEntity<ApiResponse> createAmenity(@RequestBody CreatMonthlyInvoiceRequest creatMonthlyInvoiceRequest) {

        MonthlyInvoice invoice=new MonthlyInvoice();

        invoice.setCreate_time(creatMonthlyInvoiceRequest.getCreate_time());
        invoice.setNote(creatMonthlyInvoiceRequest.getNote());
        invoice.setPaid(creatMonthlyInvoiceRequest.getPaid());
        invoice.setSurcharge(creatMonthlyInvoiceRequest.getSurcharge());
        invoice.setLast_electric_number(creatMonthlyInvoiceRequest.getLast_electric_number());
        invoice.setLast_water_number(creatMonthlyInvoiceRequest.getLast_water_number());
        invoice.setNew_electric_number(creatMonthlyInvoiceRequest.getNew_electric_number());
        invoice.setNew_water_number(creatMonthlyInvoiceRequest.getNew_water_number());
        invoice.setPayment_month(creatMonthlyInvoiceRequest.getPayment_month());
        invoice.setPerson_quantity(creatMonthlyInvoiceRequest.getPerson_quantity());
        invoice.setRoomRentalDetail(roomRentalDetailService.findById(creatMonthlyInvoiceRequest.getRoomRentalDetail_id()));

        System.out.println(invoice);

        monthlyInvoiceService.createMonthlyInvoice(invoice);


        return new ResponseEntity<ApiResponse>(new ApiResponse("Success",true), HttpStatus.CREATED);
    }

    @GetMapping("/allMonthlyInvoice")
    public ResponseEntity<List<MonthlyInvoiceResponse>> getAllAmenity() {


        List<MonthlyInvoice> arr=monthlyInvoiceService.findAllMonthlyInvoice();

        List<MonthlyInvoiceResponse> res=new ArrayList<>();

        for(MonthlyInvoice i:arr){
            MonthlyInvoiceResponse monthlyInvoiceResponse=monthlyInvoiceMapper.toMonthlyInvoiceDTO(i);

            res.add(monthlyInvoiceResponse);
        }

        return new ResponseEntity<List<MonthlyInvoiceResponse>>(res, HttpStatus.OK);
    }


    @GetMapping("/myMonthlyInvoice")
    public ResponseEntity<List<MonthlyInvoiceResponse>> getMyMonthlyInvoice() {

        String email= SecurityContextHolder.getContext().getAuthentication().getName();
        User user=userService.findByEmail(email);
        List<MonthlyInvoice> arr=monthlyInvoiceService.findMonthlyInvoiceByOwner(user);

        List<MonthlyInvoiceResponse> res=new ArrayList<>();

        for(MonthlyInvoice i:arr){
            MonthlyInvoiceResponse invoicedResponse=monthlyInvoiceMapper.toMonthlyInvoiceDTO(i);
            res.add(invoicedResponse);
        }

        return new ResponseEntity<List<MonthlyInvoiceResponse>>(res, HttpStatus.OK);
    }

    @GetMapping("/tenantMonthlyInvoice")
    public ResponseEntity<List<MonthlyInvoiceResponse>> getTenantMonthlyInvoice() {

        String email= SecurityContextHolder.getContext().getAuthentication().getName();
        User user=userService.findByEmail(email);
        List<MonthlyInvoice> arr=monthlyInvoiceService.findMonthlyInvoiceByTenant(user);

        List<MonthlyInvoiceResponse> res=new ArrayList<>();

        for(MonthlyInvoice i:arr){
            MonthlyInvoiceResponse monthlyInvoiceResponse=monthlyInvoiceMapper.toMonthlyInvoiceDTO(i);

            res.add(monthlyInvoiceResponse);
        }

        return new ResponseEntity<List<MonthlyInvoiceResponse>>(res, HttpStatus.OK);
    }

}
