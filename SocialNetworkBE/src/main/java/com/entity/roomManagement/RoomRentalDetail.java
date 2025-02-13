package com.entity.roomManagement;


import com.entity.auth.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "motelroomrentaldetail")
public class RoomRentalDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "expire", nullable = false)
    private Boolean expire;

    @Column(name = "person_quantity", nullable = false)
    private Integer person_quantity;

    @Column(name = "create_time", nullable = true)
    private LocalDateTime create_time;

    @Column(name = "rental_start_time", nullable = true)
    private LocalDateTime rental_start_time;

    @Column(name = "note", nullable = true)
    private String note;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "tenant_id", nullable = false)
    private User tenant;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "motelroom_id", nullable = false)
    private MotelRoom motelRoom;

    @Override
    public String toString() {
        return "RoomRentalDetails{" +
                "id=" + id +
                ", expire=" + expire +
                ", person_quantity=" + person_quantity +
                ", create_time=" + create_time +
                ", rental_start_time=" + rental_start_time +
                ", tenant=" + tenant.getUserProfile().getName() +
                ", motelRoom=" + motelRoom.getName() +
                '}';
    }
}
