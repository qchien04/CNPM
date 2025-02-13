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
public class CreateRoomRentalDetailsRequest {

    private Boolean expire;

    private Integer person_quantity;

    private LocalDateTime create_time;

    private LocalDateTime rental_start_time;

    private String tenant_email;

    private Integer motelRoomId;

    private String note;

}
