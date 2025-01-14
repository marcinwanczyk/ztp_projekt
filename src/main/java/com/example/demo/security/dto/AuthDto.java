package com.example.demo.security.dto;

import com.example.demo.domain.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data @Builder
@AllArgsConstructor
public class AuthDto {

    private Long userId;
    private String email;
    private String username;

    public static AuthDto fromUser(User user){
        return AuthDto.builder()
                .userId(user.getId())
                .email(user.getEmail())
                .username(user.getUsername())
                .build();
    }
}
