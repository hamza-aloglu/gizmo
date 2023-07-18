package com.example.resourceserver.model;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;

@MappedSuperclass
public abstract class BaseModel {
    @Id
    @GeneratedValue
    private Long id;

    public Long getId() {
        return id;
    }
}
