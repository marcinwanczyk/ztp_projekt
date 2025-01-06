package com.example.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.service.ReservationService;

@RestController
@RequestMapping("/")
public class ReservationController {
    
    private ReservationService reservationService;

    @GetMapping
    public String getxyz(){
        return "siema, jakie boisko wariacie?";
    }
}
