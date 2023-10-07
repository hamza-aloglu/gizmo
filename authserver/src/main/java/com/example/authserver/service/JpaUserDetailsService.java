package com.example.authserver.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import com.example.authserver.model.SecurityUser;
import org.springframework.stereotype.Service;

@Service
public class JpaUserDetailsService implements UserDetailsService {
    private final UserService userService;

    public JpaUserDetailsService(UserService userService, @Value("${ADMIN_USERNAME:admin}") String adminUsername,
                                 @Value("${ADMIN_PW:admin}") String adminPw) {
        this.userService = userService;
        if (userService.findByUsername(adminUsername).isEmpty()) {
            userService.register(adminUsername, adminPw, "ROLE_ADMIN");
        }
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userService
                .findByUsername(username)
                .map(SecurityUser::new)
                .orElseThrow(() -> new UsernameNotFoundException("user not found with username: " + username));
    }
}
