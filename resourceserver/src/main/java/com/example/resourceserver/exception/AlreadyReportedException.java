package com.example.resourceserver.exception;

public class AlreadyReportedException extends RuntimeException {

    public AlreadyReportedException(String message) {
        super(message);
    }
}
