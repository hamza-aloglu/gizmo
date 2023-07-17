package com.example.resourceserver.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@ControllerAdvice
public class ValidationExceptionHandler {
        @ExceptionHandler(value = MethodArgumentNotValidException.class)
        public ResponseEntity<?> handleMethodArguementNotValid(MethodArgumentNotValidException ex) {
            List<FieldError> fieldErrors = ex.getBindingResult().getFieldErrors();

            Map<String, String> errors = new HashMap<>();
            for(FieldError fieldError : fieldErrors) {
                errors.put(fieldError.getField(), fieldError.getDefaultMessage());
            }

            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }

        @ExceptionHandler(value = HttpMessageNotReadableException.class)
        public ResponseEntity<?> handleHttpMessageNotReadable(HttpMessageNotReadableException ex) {
            System.out.println("! http message not readable !");
            System.out.println(ex.getCause().getMessage());
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }