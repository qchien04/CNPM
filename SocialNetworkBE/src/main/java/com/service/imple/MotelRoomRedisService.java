package com.service.imple;

import com.response.MotelRoomResponse;
import com.response.PageResponse;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MotelRoomRedisService {
    @Autowired
    private RedisService redisService;

    @Autowired
    private ObjectMapper objectMapper;
    private String getKeyFrom(int pageNumber,int pageSize){
//        int pageNumber=pageRequest.getPageNumber();
//        int pageSize=pageRequest.getPageSize();
//        Sort sort=pageRequest.getSort();
//        String sortDirection=sort.getOrderFor("id").getDirection()== Sort.Direction.ASC?"asc":"desc";

        String key=String.format("allMotelRoom:%d:%d:%s", pageNumber,pageSize,"asc");
        return key;
    }

    public PageResponse<MotelRoomResponse> getPageMotelRoom(int page, int pageSize){
        String key=getKeyFrom(page,pageSize);
        Object redisData = redisService.get(key);
        System.out.println(redisService.get(key).toString());
        if (redisData != null) {
            try {
                // Chuyển đổi dữ liệu từ Redis (chuỗi JSON) sang đối tượng PageResponse
                String jsonData = objectMapper.writeValueAsString(redisData);
                return objectMapper.readValue(jsonData, new TypeReference<PageResponse<MotelRoomResponse>>() {});
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return null;

    }


    public void savePageMotelRoom(PageResponse<MotelRoomResponse> pageResponse,int page, int pageSize){
        String key=getKeyFrom(page,pageSize);

        redisService.set(key,pageResponse);

    }




}

