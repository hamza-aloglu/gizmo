package com.example.authserver.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import com.example.authserver.model.SecurityUser;
import org.springframework.stereotype.Service;

@Service
public class JpaUserDetailsService implements UserDetailsService {
    private final UserService userService;

    public JpaUserDetailsService(UserService userService) {
        this.userService = userService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userService
                .findByUsername(username)
                .map(SecurityUser::new)
                .orElseThrow(() -> new UsernameNotFoundException("user not found with username: " + username));
    }
}
