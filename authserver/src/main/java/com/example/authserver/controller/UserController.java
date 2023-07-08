package com.example.authserver.controller;

import com.example.authserver.service.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.authserver.model.UserCreateRequest;

@RestController
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public String register(@RequestBody UserCreateRequest userCreateRequest) {
        userService.register(userCreateRequest);
        return "successfully registered";
    }
}
