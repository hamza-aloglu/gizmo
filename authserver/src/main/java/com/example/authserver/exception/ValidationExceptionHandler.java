package com.example.authserver.exception;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

@ControllerAdvice
public class ValidationExceptionHandler {
        @ExceptionHandler(value = MethodArgumentNotValidException.class)
        public ResponseEntity<Object> handleMethodArguementNotValid(MethodArgumentNotValidException ex) {
            List<FieldError> fieldErrors = ex.getBindingResult().getFieldErrors();

            Map<String, String> errors = new HashMap<>();
            for(FieldError fieldError : fieldErrors) {
                errors.put(fieldError.getField(), fieldError.getDefaultMessage());
            }

            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }
    }
