package com.example.demo.domain.model;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Data
@Builder
public class FieldWithReservations {
    private Field field;
    private Map<LocalDate, List<Integer>> reservations;
}
