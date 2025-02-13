package com.service.RoomManagement;


import com.entity.roomManagement.Amenity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AmenityService {
    public Amenity createAmenity(Amenity amenity);

    public Amenity updateAmenity(Amenity amenity);

    public Amenity deleteAmenity(Amenity amenity);

    public Amenity findAmenityByName(String name);

    public Amenity findAmenityById(Integer id);

    public List<Amenity> findAllAmenity();
}
