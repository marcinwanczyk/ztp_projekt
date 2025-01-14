package com.example.demo.service;

import com.example.demo.domain.model.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.dto.SecurityUserDetails;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
@Transactional
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<User> getUserById(Long id){
        return this.userRepository.findById(id);
    }

    public User saveNewUser(User newUser){
        return this.userRepository.save(newUser);
    }

    public Optional<User> findUserByEmail(String email){
        return this.userRepository.getUserByUsername(email);
    }

    public Optional<User> findUserByUsername(String email){
        return this.userRepository.getUserByUsername(email);
    }

    public User getLoggedInUser() {
        Object principal = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        if(principal instanceof SecurityUserDetails){
            Long userId = ((SecurityUserDetails) principal).getId();

            return this.getUserById(userId)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "User not found for security principal with id " + userId));
        }else
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "authentication.principal() is not instanceof User, is " + principal.getClass().getName() + " instead");
    }

}
