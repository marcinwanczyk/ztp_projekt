package com.example.demo.domain.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class NewReservationDto {
    Long fieldId;
    LocalDate reservationDate;
    Integer reservationTime;
}
