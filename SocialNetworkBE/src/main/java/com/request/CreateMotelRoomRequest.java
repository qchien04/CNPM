package com.request;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateMotelRoomRequest {
    private String name;

    private String type_room;

    private Integer price_per_month;

    private String deposit;

    private String availability_status	;

    private Float electricity_rate;

    private String address;

    private Integer water_rate;

    private Integer area;

    private Boolean inhabited;

    private Integer max_guests;

    private Integer bed_quantity;

    private String description;

    private Set<Integer> amenities = new HashSet<>();

    private String image_url;

    private Integer floor;


}

