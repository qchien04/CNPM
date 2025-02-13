package com.controller.roomManagement;



import com.entity.auth.User;
import com.entity.roomManagement.MotelRoom;
import com.entity.roomManagement.RoomRentalDetail;
import com.mapper.RoomRentalDetailMapper;
import com.request.CreateRoomRentalDetailsRequest;
import com.request.UpdateRoomRentalDetailRequest;
import com.response.ApiResponse;
import com.response.RoomRentalDetailResponse;
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
@RequestMapping("/roomRentalDetail")
public class RoomRentalDetailController {

    private RoomRentalDetailService roomRentalDetailService;
    private MotelRoomService motelRoomService;
    private UserService userService;
    private RoomRentalDetailMapper roomRentalDetailMapper;

    @PostMapping("/create")
    public ResponseEntity<ApiResponse> createAmenity(@RequestBody CreateRoomRentalDetailsRequest createRoomRentalDetailsRequest) {

        RoomRentalDetail details=new RoomRentalDetail();
        MotelRoom motelRoom=motelRoomService.findMotelRoomById(createRoomRentalDetailsRequest.getMotelRoomId());
        motelRoom.setInhabited(true);
        motelRoomService.updateMotelRoom(motelRoom);

        details.setCreate_time(createRoomRentalDetailsRequest.getCreate_time());
        details.setExpire(false);
        details.setMotelRoom(motelRoom);
        details.setRental_start_time(createRoomRentalDetailsRequest.getRental_start_time());
        details.setTenant(userService.findByEmail(createRoomRentalDetailsRequest.getTenant_email()));
        details.setPerson_quantity(createRoomRentalDetailsRequest.getPerson_quantity());
        details.setNote(createRoomRentalDetailsRequest.getNote());

        System.out.println(details);

        roomRentalDetailService.createRoomRentalDetail(details);


        return new ResponseEntity<ApiResponse>(new ApiResponse("Success",true), HttpStatus.CREATED);
    }



    @GetMapping("/allRoomRentalDetail")
    public ResponseEntity<List<RoomRentalDetailResponse>> getAllRoomRentalDetails() {


        List<RoomRentalDetail> arr= roomRentalDetailService.findAllRoomRentalDetail();

        List<RoomRentalDetailResponse> res=new ArrayList<>();

        for(RoomRentalDetail i:arr){
            RoomRentalDetailResponse topush=roomRentalDetailMapper.toRoomRentalDetailDTO(i);
            res.add(topush);
        }

        return new ResponseEntity<List<RoomRentalDetailResponse>>(res, HttpStatus.OK);
    }

    @GetMapping("/myRoomRentalDetails")
    public ResponseEntity<List<RoomRentalDetailResponse>> getMyRoomRentalDetails() {

        String email= SecurityContextHolder.getContext().getAuthentication().getName();
        User user=userService.findByEmail(email);

        List<RoomRentalDetail> arr= roomRentalDetailService.findByOwnerOfMotelRoom(user);

        List<RoomRentalDetailResponse> res=new ArrayList<>();

        for(RoomRentalDetail i:arr){
            RoomRentalDetailResponse topush=roomRentalDetailMapper.toRoomRentalDetailDTO(i);
            res.add(topush);
        }

        return new ResponseEntity<List<RoomRentalDetailResponse>>(res, HttpStatus.OK);
    }

    @GetMapping("/tenantRoomRentalDetails")
    public ResponseEntity<List<RoomRentalDetailResponse>> getTenantRoomRentalDetails() {

        String email= SecurityContextHolder.getContext().getAuthentication().getName();
        User user=userService.findByEmail(email);

        List<RoomRentalDetail> arr= roomRentalDetailService.findByTenantOfMotelRoom(user);

        List<RoomRentalDetailResponse> res=new ArrayList<>();

        for(RoomRentalDetail i:arr){
            RoomRentalDetailResponse topush=roomRentalDetailMapper.toRoomRentalDetailDTO(i);
            res.add(topush);
        }

        return new ResponseEntity<List<RoomRentalDetailResponse>>(res, HttpStatus.OK);
    }



    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ApiResponse> deleteRoomRentalDetail(@PathVariable Integer id) {
        try{
            roomRentalDetailService.deleteRoomRentalDetailById(id);
        }
        catch (Exception e){
            ApiResponse res = new ApiResponse("Deleted Failed...", false);
            return new ResponseEntity<ApiResponse>(res, HttpStatus.OK);
        }

        ApiResponse res = new ApiResponse("Deleted Successfully...", true);

        return new ResponseEntity<ApiResponse>(res, HttpStatus.OK);

    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ApiResponse> updateRoomRentalDetail(@PathVariable Integer id, @RequestBody UpdateRoomRentalDetailRequest updateRoomRentalDetailRequest) {
        RoomRentalDetail details=new RoomRentalDetail();
        MotelRoom motelRoom=motelRoomService.findMotelRoomById(updateRoomRentalDetailRequest.getMotelRoom_id());
        motelRoom.setInhabited(true);
        motelRoomService.updateMotelRoom(motelRoom);

        details.setCreate_time(updateRoomRentalDetailRequest.getCreate_time());
        details.setExpire(updateRoomRentalDetailRequest.getExpire());
        details.setMotelRoom(motelRoom);
        details.setRental_start_time(updateRoomRentalDetailRequest.getRental_start_time());
        details.setTenant(userService.findByEmail(updateRoomRentalDetailRequest.getTenant_email()));
        details.setPerson_quantity(updateRoomRentalDetailRequest.getPerson_quantity());
        details.setNote(updateRoomRentalDetailRequest.getNote());

        details.setId(id);
        System.out.println(details);

        roomRentalDetailService.createRoomRentalDetail(details);
        ApiResponse res = new ApiResponse("Update Successfully...", true);
        return new ResponseEntity<ApiResponse>(res, HttpStatus.OK);

    }


}
