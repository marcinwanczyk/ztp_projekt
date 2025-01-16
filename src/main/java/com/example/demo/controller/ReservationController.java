package com.example.demo.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import com.example.demo.domain.dto.NewReservationDto;
import com.example.demo.security.dto.SecurityUserDetails;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.example.demo.domain.model.Reservation;
import com.example.demo.service.ReservationService;

@RestController
@RequestMapping("/reservations")
public class ReservationController {

    private ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @PostMapping("")
    public Reservation createReservation(
                @RequestBody NewReservationDto newReservationDto,
                Authentication authentication) {
        Object principal = authentication.getPrincipal();
        Long userId = null;
        if(principal instanceof SecurityUserDetails){
            userId = ((SecurityUserDetails) principal).getId();
        }
        return reservationService.createReservation(userId, newReservationDto.getFieldId(), newReservationDto.getReservationDate(), newReservationDto.getReservationTime());
    }

    @GetMapping("user")
    public List<Reservation> getReservationsForUser(
            Authentication authentication
    ) {
        Object principal = authentication.getPrincipal();
        Long userId = null;
        if(principal instanceof SecurityUserDetails){
            userId = ((SecurityUserDetails) principal).getId();
        }
        List<Reservation> reservations = reservationService.getReservationsForUser(userId);
        LocalDate today = LocalDate.now();
        return reservations.stream()
            .filter(reservation -> reservation.getDate().isAfter(today.minusDays(1)))
            .collect(Collectors.toList());
    }

}
