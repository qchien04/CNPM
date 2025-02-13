package com.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreatMonthlyInvoiceRequest {
    private Boolean paid;

    private Integer person_quantity;

    private Integer new_electric_number;

    private Integer last_electric_number;

    private Integer new_water_number;

    private Integer last_water_number;

    private LocalDateTime create_time;

    private String payment_month;

    private Integer surcharge;

    private String note;

    private Integer roomRentalDetail_id;
}
