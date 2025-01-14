package com.example.demo.controller;

import com.example.demo.domain.dto.UserDto;
import com.example.demo.domain.model.User;
import com.example.demo.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("whoAmI")
    public UserDto whoAmI(Authentication authentication, HttpSession session){
        Object principal = authentication.getPrincipal();
        session.setMaxInactiveInterval(60*60*48); ///48h
        if (principal instanceof User){
            Long userId = ((User) principal).getId();
            User user = userService.findUserById(userId).orElseThrow(() -> new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "User not found for security principal with id " + userId));
            return UserDto.mapper(user);
        }
        else {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "authentication.principal() is not instanceof User, is " + principal.getClass().getName() + " instead");
        }
    }
}
