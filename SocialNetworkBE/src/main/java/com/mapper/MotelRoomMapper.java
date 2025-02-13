package com.mapper;

import com.entity.roomManagement.Amenity;
import com.entity.roomManagement.MotelRoom;
import com.response.MotelRoomResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface MotelRoomMapper {

    // Chuyển đổi từ MotelRoom (Entity) sang MotelRoomResponse (DTO)
    @Mapping(source = "owner.email", target = "owner") // Lấy email của owner
    @Mapping(source = "amenities", target = "amenities", qualifiedByName = "mapAmenitiesToIds")
    MotelRoomResponse toFullInforMotelRoomDTO(MotelRoom motelRoom);


    // Hàm hỗ trợ chuyển đổi amenities từ Set<Amenity> -> Set<Integer>
    @Named("mapAmenitiesToIds")
    default Set<Integer> mapAmenitiesToIds(Set<Amenity> amenities) {
        return amenities == null ? null : amenities.stream().map(Amenity::getId).collect(Collectors.toSet());
    }
}
