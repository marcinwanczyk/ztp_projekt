package com.example.demo.domain.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "reservations")
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;
    @ManyToOne
    private Field field;

    private int reservation_no;
    private LocalDate date;
    private LocalDate startTime;
    private LocalDate endTime;


    public Reservation() {
    }

    public Reservation(User user, Field field, int reservation_no, LocalDate date, LocalDate startTime, LocalDate endTime) {
        this.user = user;
        this.field = field;
        this.reservation_no = reservation_no;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
    }
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Field getField() {
        return field;
    }

    public void setField(Field field) {
        this.field = field;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
