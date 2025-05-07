package com.shoppingmall.controller;

import com.shoppingmall.dto.LoginRequest;
import com.shoppingmall.dto.LoginResponse;
import com.shoppingmall.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        LoginResponse response = authService.login(loginRequest);
        logger.debug("Login successful: {}", response);
        return ResponseEntity.ok(response);
    }
}
