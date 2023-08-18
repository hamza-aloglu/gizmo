package com.example.resourceserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@EnableMethodSecurity
@EnableScheduling
public class ResourceserverApplication {

    public static void main(String[] args) {
        SpringApplication.run(ResourceserverApplication.class, args);
    }

}

@Service
class HomeService {

//    @AuthenticationPrincipal Jwt jwt
    @PreAuthorize("hasAnyAuthority('SCOPE_openid')")
    public Jwt getPrincipal() {
        return (Jwt) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
}


@RestController
class HomeController {
    private HomeService service;

    HomeController(HomeService service) {
        this.service = service;
    }

    @GetMapping("/")
    public String testHome() {
        return  "Hello, World resource server! " + service.getPrincipal().getSubject();
    }
}
