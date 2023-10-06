package com.example.authserver.controller;

import com.example.authserver.service.UserService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.authserver.model.UserCreateRequest;

import java.util.Collections;
import java.util.Map;

@RestController
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping(value = "/register")
    public Map<String, String> register(@Valid @RequestBody UserCreateRequest userCreateRequest) {
        userService.register(userCreateRequest.getUsername(), userCreateRequest.getPassword());

        // Return simple string as valid JSON
        return Collections.singletonMap("message", "Successfully registered");
    }
}
