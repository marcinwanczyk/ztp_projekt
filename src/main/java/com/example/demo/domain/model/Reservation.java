package com.example.demo.domain.model;

import java.time.LocalDate;

import jakarta.annotation.Generated;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table (name = "reservations")
public class Reservation {

    @Id
    
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private User user;
    // private Field field;

    private int reservation_no;
    private LocalDate date;
    private LocalDate startTime;    
    private LocalDate endTime;   
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public int getReservationNo() {
        return reservation_no;
    }

    public void setReservationNo(int reservation_no) {
        this.reservation_no = reservation_no;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalDate getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDate startTime) {
        this.startTime = startTime;
    }

    public LocalDate getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalDate endTime) {
        this.endTime = endTime;
    }

}
