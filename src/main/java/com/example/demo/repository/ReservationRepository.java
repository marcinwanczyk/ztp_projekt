package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.domain.model.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    public List<Reservation> findAll();

    public List<Reservation> findReservationsByFieldId(Long fieldId);
    public List<Reservation> findReservationsByUserId(Long userId);
}
