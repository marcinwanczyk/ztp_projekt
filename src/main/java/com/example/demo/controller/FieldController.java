package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.domain.model.Field;
// import com.example.demo.domain.model.Field;
import com.example.demo.service.FieldService;

@RestController
@RequestMapping("/fields")
public class FieldController{

    private FieldService fieldService;

    public FieldController(FieldService fieldService){
        this.fieldService = fieldService;
    }

    @GetMapping
    public List<Field> getFields(){
        return fieldService.getFields();
    }
    
}
