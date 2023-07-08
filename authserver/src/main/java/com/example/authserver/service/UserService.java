package com.example.authserver.service;

import com.example.authserver.exception.UserAlreadyExistsAuthenticationException;
import com.example.authserver.model.User;
import com.example.authserver.model.UserCreateRequest;
import com.example.authserver.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository repository, PasswordEncoder passwordEncoder) {
        this.userRepository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    public User get(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("user not found with id: " + id));
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public void register(String username, String pw, String roles) {
        if (userRepository.existsUserByUsername(username)) {
            throw new UserAlreadyExistsAuthenticationException("Username: " + username + " already exists");
        }

        userRepository.save(new User(
                username,
                passwordEncoder.encode(pw),
                roles
        ));
    }
}
