package com.example.demo.component;

import java.util.*;

import org.springframework.stereotype.Component;

import com.example.demo.domain.model.Field;
import com.example.demo.repository.FieldRepository;

import jakarta.annotation.PostConstruct;

@Component
public class FieldInitializer {

    private final FieldRepository fieldRepository;

    public FieldInitializer(FieldRepository fieldRepository) {
        this.fieldRepository = fieldRepository;
    }

    @PostConstruct
    public void init() {

        if (fieldRepository.count() == 0) {

            Map<String, Integer[]> fieldMap = new HashMap<>();
            fieldMap.put("Basketball", new Integer[] { 1, 2, 3 });
            fieldMap.put("Football", new Integer[] { 1, 2, 3 });
            fieldMap.put("Volleyball", new Integer[] { 1, 2, 3 });

            for (Map.Entry<String, Integer[]> entry : fieldMap.entrySet()) {
                String type = entry.getKey();
                Integer[] fieldNumbers = entry.getValue();
                for (Integer fieldNumber : fieldNumbers) {
                    fieldRepository.save(new Field(type, fieldNumber));
                }
            }
        }
    }
}
