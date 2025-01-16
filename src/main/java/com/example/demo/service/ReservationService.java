package com.example.demo.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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

    public Reservation createReservation(Long userId, Long fieldId, LocalDate reservationDate, Integer reservationTime) {
        Optional<Field> field = fieldRepository.findById(fieldId);
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent() && field.isPresent()) {
            Reservation reservation = Reservation.builder()
                    .date(reservationDate)
                    .field(field.get())
                    .user(user.get())
                    .time(reservationTime)
                    .build();
            return reservationRepository.save(reservation);
        } else {
            return null;
        }
    }

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    public List<Reservation> getReservationsForUser(Long userId) {
        return reservationRepository.findReservationsByUserId(userId);
    }

    public Map<LocalDate, List<Integer>> getReservationsByFieldId(Long fieldId) {
        List<Reservation> reservations = reservationRepository.findReservationsByFieldId(fieldId);
        reservations = reservations
                .stream().filter(reservation -> reservation.getDate().isAfter(java.time.LocalDate.now())
                        || reservation.getDate().isEqual(java.time.LocalDate.now() ))
                .toList();

        Map<LocalDate, List<Integer>> reservationsMap = new HashMap<>();
        reservations.forEach(reservation ->
                reservationsMap.computeIfAbsent(reservation.getDate(), k -> new ArrayList<>()).add(reservation.getTime())
        );
        return reservationsMap;
    }

}
