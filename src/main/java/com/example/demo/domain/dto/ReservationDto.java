package com.example.demo.domain.dto;

import com.example.demo.domain.model.Field;
import com.example.demo.domain.model.Reservation;
import com.example.demo.domain.model.User;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class ReservationDto {

    private Long id;

    private User user;

    private Long fieldId;
    private String fieldType;
    private Integer fieldNo;
    private LocalDate date;
    private Integer time;

    public static ReservationDto fromReservation(Reservation reservation){
        return ReservationDto.builder()
                .user(reservation.getUser())
                .fieldId(reservation.getField().getId())
                .fieldType(reservation.getField().getType())
                .fieldNo(reservation.getField().getField_no())
                .date(reservation.getDate())
                .time(reservation.getTime())
                .build();
    }
}
