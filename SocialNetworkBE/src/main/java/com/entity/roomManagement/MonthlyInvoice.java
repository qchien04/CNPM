package com.entity.roomManagement;


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
@Table(name = "monthlyinvoice")
public class MonthlyInvoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "paid", nullable = false)
    private Boolean paid;

    @Column(name = "person_quantity", nullable = false)
    private Integer person_quantity;

    @Column(name = "new_electric_number", nullable = false)
    private Integer new_electric_number;

    @Column(name = "last_electric_number", nullable = false)
    private Integer last_electric_number;

    @Column(name = "new_water_number", nullable = false)
    private Integer new_water_number;

    @Column(name = "last_water_number", nullable = false)
    private Integer last_water_number;

    @Column(name = "create_time", nullable = true)
    private LocalDateTime create_time;

    @Column(name = "payment_month", nullable = true)
    private String payment_month;

    @Column(name = "surcharge", nullable = true)
    private Integer surcharge;

    @Column(name = "note", nullable = true)
    private String note;

    @ManyToOne
    @JoinColumn(name = "RoomRentalDetails_id", nullable = false)
    private RoomRentalDetail roomRentalDetail;

    @Override
    public String toString() {
        return "MonthlyInvoice{" +
                "id=" + id +
                ", paid=" + paid +
                ", person_quantity=" + person_quantity +
                ", new_electric_number=" + new_electric_number +
                ", last_electric_number=" + last_electric_number +
                ", new_water_number=" + new_water_number +
                ", last_water_number=" + last_water_number +
                ", create_time=" + create_time +
                ", payment_month='" + payment_month + '\'' +
                ", surcharge=" + surcharge +
                ", note='" + note + '\'' +
                ", roomRentalDetails=" + roomRentalDetail.getId() +
                '}';
    }
}
