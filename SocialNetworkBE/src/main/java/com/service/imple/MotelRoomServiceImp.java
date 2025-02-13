package com.service.imple;


import com.entity.roomManagement.MotelRoom;
import com.mapper.MotelRoomMapper;
import com.repository.MotelRoomRepo;
import com.response.MotelRoomResponse;
import com.response.PageResponse;
import com.service.RoomManagement.MotelRoomService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;


@Service
@AllArgsConstructor
public class MotelRoomServiceImp implements MotelRoomService {
    private MotelRoomRepo motelRoomRepo;
    private MotelRoomMapper motelRoomMapper;


    @Override
    public PageResponse<MotelRoomResponse> getClientPageMotelRoom(int page, int size) {
        Sort sort = Sort.by(Sort.Direction.DESC, "id");
        Pageable pageable = PageRequest.of(page - 1, size, sort);

        System.out.println("Start find =============================");
        Page<MotelRoom> pageMotelRoom = motelRoomRepo.findAll(pageable);
        System.out.println("Finalll ok ---------------------------");
        List<MotelRoomResponse> responses = pageMotelRoom.getContent()
                .stream()
                .map(motelroom -> {
                    MotelRoomResponse response = motelRoomMapper.toFullInforMotelRoomDTO(motelroom);
                    return response;
                })
                .toList();
        return PageResponse.<MotelRoomResponse>builder()
                .currentPage(page)
                .pageSize(pageable.getPageSize())
                .totalElements(pageMotelRoom.getTotalElements())
                .totalPages(pageMotelRoom.getTotalPages())
                .data(responses)
                .build();
    }

    @Override
    @Transactional
    public MotelRoom createMotelRoom(MotelRoom motelRoom) {
        return motelRoomRepo.save(motelRoom);
    }

    @Override
    public List<MotelRoom> AllMotelRoom() {
        return motelRoomRepo.findAll();
    }

    @Override
    public List<MotelRoom> MyMotelRoom(String email) {
        return motelRoomRepo.MyMotelRoom(email);
    }

    @Override
    public List<MotelRoom> AllTenantMotelRoom(String email) {
        return motelRoomRepo.TenantMotelRoom(email);
    }

    @Override
    public List<MotelRoom> AllMotelRoomWithKey(String key) {
        return motelRoomRepo.findWithKey(key);
    }

    @Override
    public void updateMotelRoom(MotelRoom motelRoom) {
        motelRoomRepo.save(motelRoom);
    }

    @Override
    public void deleteMotelRoomById(Integer motelRoomId) {
        motelRoomRepo.delete(findMotelRoomById(motelRoomId));
    }


    @Override
    public MotelRoom findMotelRoomByName(String name) {
        //not support yet
        return null;
    }

    @Override
    public MotelRoom findMotelRoomById(Integer id) {
        Optional<MotelRoom> motelRoomOptional=motelRoomRepo.findById(id);
        return motelRoomOptional.isPresent()?motelRoomOptional.get():null;
    }
}
