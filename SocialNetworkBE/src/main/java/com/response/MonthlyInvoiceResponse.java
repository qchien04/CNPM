package com.response;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MonthlyInvoiceResponse {
    private Integer id;

    private Boolean paid;

    private Integer person_quantity;

    private Integer new_electric_number;

    private Integer last_electric_number;

    private Integer new_water_number;

    private Integer last_water_number;

    private String payment_month;

    private Integer surcharge;

    private String note;

    private String motelRoom_name;

    private Integer motelRoom_id;

    private Integer roomRentalDetail_id;

    private String tenant_name;

}
