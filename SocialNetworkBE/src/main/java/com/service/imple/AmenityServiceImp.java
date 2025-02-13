package com.service.imple;

import com.entity.roomManagement.Amenity;
import com.repository.AmenityRepo;
import com.service.RoomManagement.AmenityService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;


@Service
@AllArgsConstructor
public class AmenityServiceImp implements AmenityService {


    private AmenityRepo amenityRepo;

    @Override
    @Transactional
    public Amenity createAmenity(Amenity amenity) {

        return amenityRepo.save(amenity);
    }

    @Override
    public Amenity updateAmenity(Amenity amenity) {
        //not support yet
        return null;
    }

    @Override
    public Amenity deleteAmenity(Amenity amenity) {
        //not support yet
        return null;
    }

    @Override
    public Amenity findAmenityByName(String name) {
        //not support yet
        return null;
    }

    @Override
    public Amenity findAmenityById(Integer id) {
        Optional<Amenity> amenityOptional=amenityRepo.findById(id);
        if(amenityOptional.isPresent()){
            return amenityOptional.get();
        }
        return null;
    }

    @Override
    public List<Amenity> findAllAmenity() {
        return amenityRepo.findAll();
    }
}
