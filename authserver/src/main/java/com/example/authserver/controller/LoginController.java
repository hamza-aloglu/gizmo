package com.example.authserver.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
public class LoginController {
    @GetMapping("/login")
    String getLogin() {
        return "login";
    }
}
