package com.example.demo.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import com.example.demo.domain.model.FieldWithReservations;
import org.springframework.stereotype.Service;

import com.example.demo.domain.model.Field;
import com.example.demo.repository.FieldRepository;

@Service
public class FieldService {

    private final FieldRepository fieldRepository;
    private final ReservationService reservationService;

    public FieldService(FieldRepository fieldRepository, ReservationService reservationService) {
        this.fieldRepository = fieldRepository;
        this.reservationService = reservationService;
    }

    public List<Field> getFields() {
        return fieldRepository.findAll();
    }

    public FieldWithReservations getFieldById(Long id) {
        Field field = fieldRepository.findById(id).orElse(null);
        Map<LocalDate, List<Integer>> reservations = reservationService.getReservationsByFieldId(id);
        return FieldWithReservations.builder()
                .field(field)
                .reservations(reservations)
                .build();
    }
}
