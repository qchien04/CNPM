package com.service.RoomManagement;


import com.entity.roomManagement.MotelRoom;
import com.response.MotelRoomResponse;
import com.response.PageResponse;

import java.util.List;

public interface MotelRoomService {

    public PageResponse<MotelRoomResponse> getClientPageMotelRoom(int page,int size);

    public MotelRoom createMotelRoom(MotelRoom motelRoom);

    public List<MotelRoom> AllMotelRoom();

    public List<MotelRoom> MyMotelRoom(String email);

    public List<MotelRoom> AllTenantMotelRoom(String email);

    public List<MotelRoom> AllMotelRoomWithKey(String key);

    public void updateMotelRoom(MotelRoom motelRoom);

    public void deleteMotelRoomById(Integer motelRoomId);

    public MotelRoom findMotelRoomByName(String name);

    public MotelRoom findMotelRoomById(Integer id);
}
