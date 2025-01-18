package com.example.demo.controller;

import com.example.demo.domain.dto.NewUserDto;
import com.example.demo.domain.model.User;
import com.example.demo.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {

    private final PasswordEncoder passwordEncoder;
    private final UserService userService;

    public UserController(PasswordEncoder passwordEncoder, UserService userService) {
        this.passwordEncoder = passwordEncoder;
        this.userService = userService;
    }

    @PostMapping("")
    public User saveNewUser(
            @RequestBody() NewUserDto newUserDto
    ){
        this.validateNewUserEmail(newUserDto.getEmail());
        this.validateNewUserEmail(newUserDto.getUsername());
        User newUser = User.builder()
                .email(newUserDto.getEmail())
                .password(passwordEncoder.encode(newUserDto.getPassword()))
                .username(newUserDto.getUsername())
                .build();
        return this.userService.saveNewUser(newUser);
    }

    private void validateNewUserEmail(String email){
        Optional<User> existingUser = this.userService.findUserByEmail(email);

        if(existingUser.isPresent())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "EMAIL_ALREADY_EXIST");
    }

    private void validateNewUserUsername(String username){
        Optional<User> existingUser = this.userService.findUserByUsername(username);

        if(existingUser.isPresent())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "USERNAME_ALREADY_EXIST");
    }

}
