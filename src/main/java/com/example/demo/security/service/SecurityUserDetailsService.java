package com.example.demo.security.service;

import com.example.demo.domain.model.User;
import com.example.demo.security.dto.SecurityUserDetails;
import com.example.demo.service.UserService;
import jakarta.transaction.Transactional;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class SecurityUserDetailsService implements UserDetailsService {

    private final UserService userService;
//    private final PasswordDec passwordEncoder;


    public SecurityUserDetailsService(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
//        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userService.findUserByUsername(username)
                .orElse(userService
                        .findUserByEmail(username)
                        .orElseThrow(() -> new UsernameNotFoundException("user " + username + "not found")
                        )
                );
//        user.setPassword(passwordEncoderuser.getPassword());
        return new SecurityUserDetails(user);
    }
}
