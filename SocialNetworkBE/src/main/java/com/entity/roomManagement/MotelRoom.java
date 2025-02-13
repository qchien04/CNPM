package com.entity.roomManagement;


import com.entity.auth.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "motelroom")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MotelRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "name", nullable = false, unique = true, length = 100)
    private String name;

    @Column(name = "type_room", nullable = true)// "Phòng đơn", "Phòng đôi", "Ký túc xá"
    private String type_room;

    @Column(name = "price_per_month", nullable = true)
    private Integer price_per_month;

    @Column(name = "deposit", nullable = true)// dat coc
    private String deposit;

    @Column(name = "availability_status", nullable = true)
    private String availability_status	;

    @Column(name = "inhabited", nullable = true)
    private Boolean inhabited	;

    @Column(name = "electricity_rate", nullable = true)
    private Float electricity_rate;

    @Column(name = "address", nullable = true)
    private String address;

    @Column(name = "water_rate", nullable = true)
    private Integer water_rate;

    @Column(name = "area", nullable = true)
    private Integer area;

    @Column(name = "max_guests", nullable = true)
    private Integer max_guests;

    @Column(name = "bed_quantity", nullable = true)
    private Integer bed_quantity;

    @Column(name = "description", nullable = true)
    private String description;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "room_amenity", // Tên bảng trung gian
            joinColumns = @JoinColumn(name = "room_id"), // Khóa ngoại tới bảng room
            inverseJoinColumns = @JoinColumn(name = "amenity_id") // Khóa ngoại tới bảng amenity
    )
    private Set<Amenity> amenities = new HashSet<>();

    @Column(name = "image_url", nullable = true,length = 1000)
    private String image_url;

    @Column(name = "floor", nullable = true)
    private Integer floor;

    @Column(name = "created_at", nullable = true)
    private LocalDateTime created_at;

    @Column(name = "updated_at", nullable = true)
    private LocalDateTime updated_at;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;

    @Override
    public String toString() {
        return "MotelRoom{" +
                "id=" + id +
                ", name='" + name + '\n' +
                ", type_room='" + type_room + '\n' +
                ", price_per_month=" + price_per_month +'\n'+
                ", deposit='" + deposit + '\n' +
                ", availability_status='" + availability_status + '\n' +
                ", electricity_rate=" + electricity_rate +'\n'+
                ", address='" + address + '\n' +
                ", water_rate=" + water_rate +'\n'+
                ", area=" + area +'\n'+
                ", max_guests=" + max_guests +'\n'+
                ", bed_quantity=" + bed_quantity +'\n'+
                ", description='" + description + '\n' +
                ", amenities=" + amenities +'\n'+
                ", image_url='" + image_url + '\n'+
                ", floor=" + floor +'\n'+
                ", created_at=" + created_at +'\n'+
                ", updated_at=" + updated_at +'\n'+
                "----------------------------------------------------------------"+
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MotelRoom motelRoom = (MotelRoom) o;
        return id.equals(motelRoom.id);
    }

    @Override
    public int hashCode() {
        return Integer.hashCode(id);
    }

}
