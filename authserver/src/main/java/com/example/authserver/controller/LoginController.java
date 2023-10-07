package com.example.authserver.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class LoginController {
    @Value("${CLIENT_URI:http://127.0.0.1:3000}")
    private String clientUri;

    @GetMapping("/login")
    public ModelAndView getLogin(Model model) {
        ModelAndView mav = new ModelAndView("login");
        mav.addObject("clientRegisterUri", clientUri + "/register");
        return mav;
    }
}
