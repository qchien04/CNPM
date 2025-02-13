package com.controller.roomManagement;


import com.entity.roomManagement.MotelRoom;
import com.mapper.MotelRoomMapper;
import com.request.CreateMotelRoomRequest;
import com.response.ApiResponse;
import com.response.MotelRoomResponse;
import com.response.PageResponse;
import com.service.RoomManagement.AmenityService;
import com.service.RoomManagement.MotelRoomService;
import com.service.auth.UserService;
import com.service.imple.MotelRoomRedisService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/motelRoom")
public class MotelRoomController {
    private MotelRoomService motelRoomService;
    private UserService userService;
    private AmenityService amenityService;
    private MotelRoomMapper motelRoomMapper;
    private MotelRoomRedisService motelRoomRedisService;

    @PostMapping("/create")
    public ResponseEntity<ApiResponse> createMotelRoomHandle(@RequestBody CreateMotelRoomRequest createMotelRoomRequest) {

        MotelRoom motelRoom = new MotelRoom();

        motelRoom.setCreated_at(LocalDateTime.now());
        motelRoom.setUpdated_at(LocalDateTime.now());

        motelRoom.setName(createMotelRoomRequest.getName());
        motelRoom.setType_room(createMotelRoomRequest.getType_room());
        motelRoom.setPrice_per_month(createMotelRoomRequest.getPrice_per_month());
        motelRoom.setDeposit(createMotelRoomRequest.getDeposit());
        motelRoom.setAvailability_status(createMotelRoomRequest.getAvailability_status());
        motelRoom.setElectricity_rate(createMotelRoomRequest.getElectricity_rate());
        motelRoom.setAddress(createMotelRoomRequest.getAddress());
        motelRoom.setWater_rate(createMotelRoomRequest.getWater_rate());
        motelRoom.setArea(createMotelRoomRequest.getArea());
        motelRoom.setInhabited(createMotelRoomRequest.getInhabited());
        motelRoom.setMax_guests(createMotelRoomRequest.getMax_guests());
        motelRoom.setBed_quantity(createMotelRoomRequest.getBed_quantity());
        motelRoom.setDescription(createMotelRoomRequest.getDescription());
        motelRoom.setImage_url(createMotelRoomRequest.getImage_url());
        motelRoom.setFloor(createMotelRoomRequest.getFloor());

        motelRoom.setOwner(userService.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName()));

        // Ánh xạ tiện nghi (Amenities) từ request
        if (createMotelRoomRequest.getAmenities() != null) {
            for(int i:createMotelRoomRequest.getAmenities()){
                System.out.println(i);
                motelRoom.getAmenities().add(amenityService.findAmenityById(i));
            }

        }

        System.out.println(motelRoom);
        motelRoomService.createMotelRoom(motelRoom);

        return new ResponseEntity<ApiResponse>(new ApiResponse("Success",true), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MotelRoomResponse> getAllMotelRoom(@PathVariable Integer id) {

        MotelRoom a=motelRoomService.findMotelRoomById(id);
        MotelRoomResponse motelRoom = motelRoomMapper.toFullInforMotelRoomDTO(a);
        return new ResponseEntity<MotelRoomResponse>(motelRoom, HttpStatus.OK);
    }

    @GetMapping("/allMotelRoom")
    public ResponseEntity<List<MotelRoomResponse>> getAllMotelRoom() {

        List<MotelRoom> arr=motelRoomService.AllMotelRoom();
        List<MotelRoomResponse> ans=new ArrayList<>();
        for(MotelRoom i:arr){
            MotelRoomResponse motelRoom = motelRoomMapper.toFullInforMotelRoomDTO(i);
            ans.add(motelRoom);
        }
        return new ResponseEntity<List<MotelRoomResponse>>(ans, HttpStatus.OK);
    }

    @GetMapping("/allMotelRoomV2")
    public ResponseEntity<PageResponse<MotelRoomResponse>>  getAllMotelRoomV2(
            @RequestParam(value = "page", required = false,defaultValue = "1") int page,
            @RequestParam(value = "size", required = false,defaultValue = "5") int size

    ) {

        PageResponse<MotelRoomResponse> ans=motelRoomRedisService.getPageMotelRoom(page,size);

        if(ans==null){
            System.out.println("Not in cache");
            ans=motelRoomService.getClientPageMotelRoom(page,size);
            System.out.println("Ready to save");
            motelRoomRedisService.savePageMotelRoom(ans,page,size);
            System.out.println("save done");
        }
        else{
            System.out.println("Catch cache");
        }

        return new ResponseEntity<PageResponse<MotelRoomResponse>>(ans, HttpStatus.OK);
    }

    @GetMapping("/myMotelRoom")
    public ResponseEntity<List<MotelRoomResponse>> getMyMotelRoom() {
        String email=SecurityContextHolder.getContext().getAuthentication().getName();
        List<MotelRoom> arr=motelRoomService.MyMotelRoom(email);
        List<MotelRoomResponse> ans=new ArrayList<>();
        for(MotelRoom i:arr){
            MotelRoomResponse motelRoom = motelRoomMapper.toFullInforMotelRoomDTO(i);
            ans.add(motelRoom);
        }
        return new ResponseEntity<List<MotelRoomResponse>>(ans, HttpStatus.OK);
    }

    @GetMapping("/tenantMotelRoom")
    public ResponseEntity<List<MotelRoomResponse>> getTenantMotelRoomHandle() {
        String email=SecurityContextHolder.getContext().getAuthentication().getName();
        List<MotelRoom> arr=motelRoomService.AllTenantMotelRoom(email);
        List<MotelRoomResponse> ans=new ArrayList<>();
        for(MotelRoom i:arr){
            MotelRoomResponse motelRoom = motelRoomMapper.toFullInforMotelRoomDTO(i);
            ans.add(motelRoom);
        }
        return new ResponseEntity<List<MotelRoomResponse>>(ans, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<List<MotelRoomResponse>> SearchMotelRoom(@RequestParam(value = "key", required = false) String key) {


        List<MotelRoom> arr=motelRoomService.AllMotelRoomWithKey(key);
        List<MotelRoomResponse> ans=new ArrayList<>();
        for(MotelRoom i:arr){
            MotelRoomResponse motelRoom = motelRoomMapper.toFullInforMotelRoomDTO(i);
            ans.add(motelRoom);
        }
        return new ResponseEntity<List<MotelRoomResponse>>(ans, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{motelRoomId}")
    public ResponseEntity<ApiResponse> deleteMotelRoomHandler(@PathVariable Integer motelRoomId){


        motelRoomService.deleteMotelRoomById(motelRoomId);

        ApiResponse res = new ApiResponse("Deleted Successfully...", true);

        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @PutMapping("/update/{motelRoomId}")
    public ResponseEntity<ApiResponse> UpdateMotelRoomHandler(@PathVariable Integer motelRoomId,
                                                                @RequestBody CreateMotelRoomRequest createMotelRoomRequest){


        MotelRoom motelRoom = new MotelRoom();

        motelRoom.setCreated_at(LocalDateTime.now());
        motelRoom.setUpdated_at(LocalDateTime.now());

        motelRoom.setName(createMotelRoomRequest.getName());
        motelRoom.setType_room(createMotelRoomRequest.getType_room());
        motelRoom.setPrice_per_month(createMotelRoomRequest.getPrice_per_month());
        motelRoom.setDeposit(createMotelRoomRequest.getDeposit());
        motelRoom.setAvailability_status(createMotelRoomRequest.getAvailability_status());
        motelRoom.setElectricity_rate(createMotelRoomRequest.getElectricity_rate());
        motelRoom.setAddress(createMotelRoomRequest.getAddress());
        motelRoom.setWater_rate(createMotelRoomRequest.getWater_rate());
        motelRoom.setArea(createMotelRoomRequest.getArea());
        motelRoom.setInhabited(createMotelRoomRequest.getInhabited());
        motelRoom.setMax_guests(createMotelRoomRequest.getMax_guests());
        motelRoom.setBed_quantity(createMotelRoomRequest.getBed_quantity());
        motelRoom.setDescription(createMotelRoomRequest.getDescription());
        motelRoom.setImage_url(createMotelRoomRequest.getImage_url());
        motelRoom.setFloor(createMotelRoomRequest.getFloor());

        motelRoom.setOwner(userService.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName()));

        // Ánh xạ tiện nghi (Amenities) từ request
        if (createMotelRoomRequest.getAmenities() != null) {
            for(int i:createMotelRoomRequest.getAmenities()){
                System.out.println(i);
                motelRoom.getAmenities().add(amenityService.findAmenityById(i));
            }

        }

        motelRoom.setId(motelRoomId);

        motelRoomService.createMotelRoom(motelRoom);

        return new ResponseEntity<ApiResponse>(new ApiResponse("Success",true), HttpStatus.CREATED);

    }


}
