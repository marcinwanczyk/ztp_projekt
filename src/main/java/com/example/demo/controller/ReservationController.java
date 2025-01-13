package com.example.demo.controller;

import java.util.List;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.domain.model.Reservation;
import com.example.demo.service.ReservationService;

@RestController
@RequestMapping("/reservations")
public class ReservationController {
    
    private ReservationService reservationService;

    public ReservationController(ReservationService reservationService){
        this.reservationService = reservationService;
    }

    @GetMapping
    public String getReservations(Model model){
        List<Reservation> reservations = reservationService.getReservations();
        model.addAttribute("reservations", reservations);
        return "reservations";
    }


    @GetMapping
    public Reservation getTestReservatioString(){
        return reservationService.testReservation();
    }
}
