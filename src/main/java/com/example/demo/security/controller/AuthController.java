package com.example.demo.security.controller;


import com.example.demo.domain.model.User;
import com.example.demo.security.dto.AuthDto;
import com.example.demo.security.dto.SecurityUserDetails;
import com.example.demo.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("auth")
@CrossOrigin
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/whoami")
    public AuthDto whoAmI(Authentication authentication, HttpSession session){
        System.out.println("whoAmI");
        Object principal = authentication.getPrincipal();
        session.setMaxInactiveInterval(60*60*48); //48h
        if(principal instanceof SecurityUserDetails){
            Long userId = ((SecurityUserDetails) principal).getId();
            User user = userService.getUserById(userId)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "User not found for security principal with id " + userId));
            return AuthDto.fromUser(user);
        }else{
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "authentication.principal() is not instanceof User, is " + principal.getClass().getName() + " instead"
            );
        }
    }

    @PostMapping("/logout")
    public void logout(HttpSession httpSession){
        httpSession.invalidate();
    }
}
