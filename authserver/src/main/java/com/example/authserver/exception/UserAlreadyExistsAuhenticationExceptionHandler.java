package com.example.authserver.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Collection;
import java.util.Collections;
import java.util.Map;

@ControllerAdvice
public class UserAlreadyExistsAuhenticationExceptionHandler {
    @ExceptionHandler(value = UserAlreadyExistsAuthenticationException.class)
    public ResponseEntity<Map<String, String>> handleUserExistsException(
            UserAlreadyExistsAuthenticationException ex) {
        System.out.println(ex.getMessage());
        return new ResponseEntity<>(Collections.singletonMap("ERROR:", ex.getMessage()), HttpStatus.BAD_REQUEST);
    }
}
