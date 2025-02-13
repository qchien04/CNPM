package com.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MotelRoomResponse {
    private Integer id;

    private String name;

    private String type_room;

    private Integer price_per_month;

    private String deposit;

    private String availability_status	;

    private Boolean inhabited	;

    private Float electricity_rate;

    private String address;

    private Integer water_rate;

    private Integer area;

    private Integer max_guests;

    private Integer bed_quantity;

    private String description;

    private Set<Integer> amenities = new HashSet<>();

    private String image_url;

    private Integer floor;

    private LocalDateTime created_at;

    private LocalDateTime updated_at;

    private String owner;

}
