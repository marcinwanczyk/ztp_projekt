// package com.example.demo.service;

// import com.example.demo.domain.model.User;
// import lombok.extern.slf4j.Slf4j;
// import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.stereotype.Service;

// @Service
// @Slf4j
// public class UserContextService {

//     public User getLoggedUser() {
//         User loggedUser = null;
//         try {
//             loggedUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//         } catch (Exception e) {
//             log.warn("No user in context");
//         }
//         return loggedUser;
//     }
// }
