package com.example.demo.controller;

import java.util.List;

import com.example.demo.domain.model.FieldWithReservations;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.domain.model.Field;
import com.example.demo.service.FieldService;

@RestController
@RequestMapping("/fields")
public class FieldsController {

    private FieldService fieldService;

    public FieldsController(FieldService fieldService){
        this.fieldService = fieldService;
        }

    @GetMapping("")
    public List<Field> home(){
    return fieldService.getFields();
    }

    @GetMapping("/{id}")
    public FieldWithReservations fieldDetails(@PathVariable Long id){
        return fieldService.getFieldById(id);
    }

}
