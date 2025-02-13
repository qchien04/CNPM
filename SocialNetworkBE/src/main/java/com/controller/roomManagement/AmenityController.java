package com.controller.roomManagement;


import com.entity.roomManagement.Amenity;
import com.request.CreateAmenityRequest;
import com.response.AmenityResponse;
import com.response.ApiResponse;
import com.service.RoomManagement.AmenityService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/amenity")
public class AmenityController {

    private AmenityService amenityService;

    @PostMapping("/create")
    public ResponseEntity<ApiResponse> createAmenity(@RequestBody CreateAmenityRequest createAmenityRequest) {

        Amenity amenity=new Amenity();
        amenity.setName(createAmenityRequest.getName());
        amenity.setCost(createAmenityRequest.getCost());
        amenity.setPer_capita(createAmenityRequest.isPer_capita());
        System.out.println(amenity);

        amenityService.createAmenity(amenity);


        return new ResponseEntity<ApiResponse>(new ApiResponse("Success",true), HttpStatus.CREATED);
    }

    @GetMapping("/allAmenity")
    public ResponseEntity<List<AmenityResponse>> getAllAmenity() {


        List<Amenity> arr=amenityService.findAllAmenity();

        List<AmenityResponse> ans=new ArrayList<>();
        for(Amenity i:arr){
            ans.add(new AmenityResponse(i.getId(),i.getName(),i.getCost(),i.isPer_capita()));
        }

        return new ResponseEntity<List<AmenityResponse>>(ans, HttpStatus.OK);
    }


}
