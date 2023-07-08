package com.example.authserver.model;

import jakarta.validation.constraints.Size;

public class UserCreateRequest {
    @Size(min = 3, message = "username is too short")
    @Size(max = 30, message = "username is too long")
    private String username;
    @Size(min = 3, message = "password is too short")
    @Size(max = 30, message = "password is too long")
    private String password;
    private String roles;

    public UserCreateRequest(String username, String password, String roles) {
        this.username = username;
        this.password = password;
        this.roles = roles;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRoles() {
        return roles;
    }

    public void setRoles(String roles) {
        this.roles = roles;
    }
}
