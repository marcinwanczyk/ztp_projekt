package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.domain.model.Field;
import com.example.demo.domain.model.Reservation;
import com.example.demo.domain.model.User;
import com.example.demo.repository.FieldRepository;
import com.example.demo.repository.ReservationRepository;
import com.example.demo.repository.UserRepository;

@Service
public class ReservationService {

    private ReservationRepository reservationRepository;
    private FieldRepository fieldRepository;
    private UserRepository userRepository;

    public ReservationService(
            ReservationRepository reservationRepository,
            FieldRepository fieldRepository,
            UserRepository userRepository) {
        this.reservationRepository = reservationRepository;
        this.fieldRepository = fieldRepository;
        this.userRepository = userRepository;
    }
    // testowe dodanie rezerwacji
    public Reservation testReservation(){
        User user = new User();
        user.setUsername("konstanty");
        user.setEmail("123malpa@gmail.com");
        user.setPassword( "potrzymajmipiwo");
        userRepository.save(user);
        
        Field field = fieldRepository.findById(1L).orElse(null);

        Reservation reservation = new Reservation();
        reservation.setUser(user);
        reservation.setField(field);
        reservation.setDate(java.time.LocalDate.now());
        reservation.setStartTime(java.time.LocalDate.now());
        reservation.setEndTime(java.time.LocalDate.now());

        return reservationRepository.save(reservation);
    }

    public List<Reservation> getReservations() {
        return reservationRepository.findAll();
    }

}
