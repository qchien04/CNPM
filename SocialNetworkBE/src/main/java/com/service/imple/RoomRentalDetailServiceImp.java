package com.service.imple;

import com.entity.auth.User;
import com.entity.roomManagement.RoomRentalDetail;
import com.repository.RoomRentalDetailRepo;
import com.service.RoomManagement.RoomRentalDetailService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class RoomRentalDetailServiceImp implements RoomRentalDetailService {
    private RoomRentalDetailRepo roomRentalDetailRepo;

    @Override
    @Transactional
    public RoomRentalDetail createRoomRentalDetail(RoomRentalDetail roomRentalDetail) {
        System.out.println("ok");
        return roomRentalDetailRepo.save(roomRentalDetail);
    }

    @Override
    public RoomRentalDetail findById(Integer id) {
        Optional<RoomRentalDetail> details= roomRentalDetailRepo.findById(id);
        return details.isPresent()?details.get():null;

    }

    @Override
    public List<RoomRentalDetail> findByTenant_Id(Integer id) {
        return roomRentalDetailRepo.findByTenant_Id(id);
    }

    @Override
    public List<RoomRentalDetail> findAllRoomRentalDetail() {
        return roomRentalDetailRepo.findAll();
    }

    @Override
    public List<RoomRentalDetail> findMyRoomRentalDetails(String email) {
        return List.of();
    }

    @Override
    public List<RoomRentalDetail> findByMotelRoom_Id(Integer id) {
        return roomRentalDetailRepo.findByMotelRoom_Id(id);
    }

    @Override
    public List<RoomRentalDetail> findByOwnerOfMotelRoom(User user) {
        return roomRentalDetailRepo.findByOwnerOfMotelRoom(user);
    }

    @Override
    public List<RoomRentalDetail> findByTenantOfMotelRoom(User user) {
        return roomRentalDetailRepo.findByTenantOfMotelRoom(user);
    }

    @Override
    @Transactional
    public void deleteRoomRentalDetailById(Integer id) {
        roomRentalDetailRepo.deleteById(id);
    }
}
