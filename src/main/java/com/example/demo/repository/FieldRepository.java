package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.domain.model.Field;

public interface FieldRepository extends JpaRepository<Field, Long> {
    
}
