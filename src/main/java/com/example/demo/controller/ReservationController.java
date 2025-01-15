package com.example.demo.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.domain.model.Reservation;
import com.example.demo.service.ReservationService;

@RestController
@RequestMapping("/reservations")
public class ReservationController {

    private ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @PostMapping
    public Reservation createReservation(@RequestParam Long userId,
            @RequestParam Long fieldId,
            @RequestParam int reservationNo,
            @RequestParam String reservationDate) {
        LocalDate date = LocalDate.parse(reservationDate);
        return reservationService.createReservation(userId, fieldId, reservationNo, date);
    }

    @GetMapping
    @ResponseBody
    public List<Reservation> getReservations() {
        List<Reservation> reservations = reservationService.getReservations();
        return reservations.stream()
                .filter(reservation -> reservation.getDate().isAfter(LocalDate.now()))
                .collect(Collectors.toList());
    }

}
