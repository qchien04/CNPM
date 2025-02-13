package com.response;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AmenityResponse {
    private Integer id;
    private String name;
    private Integer cost;
    private boolean per_capita;
}
