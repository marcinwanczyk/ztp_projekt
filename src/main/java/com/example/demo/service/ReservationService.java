package com.example.demo.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

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

    public Reservation createReservation(Long userId, Long fieldId, int reservation_no, LocalDate reservationTime) {
        Optional<Field> field = fieldRepository.findById(fieldId);
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent() && field.isPresent()) {
            Reservation reservation = new Reservation(user.get(), field.get(), reservation_no, reservationTime);
            return reservationRepository.save(reservation);
        } else {
            return null;
        }
    }

    public List<Reservation> getReservations() {
        return reservationRepository.findAll();
    }

}
