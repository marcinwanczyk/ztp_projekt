package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.domain.model.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

}
