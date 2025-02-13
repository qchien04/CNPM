package com.response;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RoomRentalDetailResponse {
    private Integer id;

    private Boolean expire;

    private Integer person_quantity;

    private LocalDateTime create_time;

    private LocalDateTime rental_start_time;

    private String tenant_email;

    private Integer motelRoom_id;

    private String motelRoom_name;

    private String note;

}
