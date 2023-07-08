package com.example.authserver.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class UserAlreadyExistsAuhenticationExceptionHandler {
    @ExceptionHandler(value = UserAlreadyExistsAuthenticationException.class)
    public ResponseEntity<UserAlreadyExistsAuthenticationException> handleUserExistsException(
            UserAlreadyExistsAuthenticationException ex) {
        System.out.println(ex.getMessage());
        return new ResponseEntity<>(ex, HttpStatus.BAD_REQUEST);
    }
}
