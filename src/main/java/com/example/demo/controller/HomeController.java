package com.example.demo.controller;

import java.util.List;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.domain.model.Field;
import com.example.demo.service.FieldService;

@RestController
@RequestMapping("/")
public class HomeController{

    private FieldService fieldService;

    public HomeController(FieldService fieldService){
        this.fieldService = fieldService;
        }

        @GetMapping("/")
        public List<Field> home(){
        return fieldService.getFields();
        }
    
    @GetMapping("/fields/{id}")
    public Field fieldDetails(@PathVariable Long id){
        return fieldService.getFieldById(id);
    }

}
