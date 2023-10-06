package com.example.authserver.service;

import com.example.authserver.model.SecurityUser;
import com.example.authserver.model.User;
import com.example.authserver.model.UserCreateRequest;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.lang.reflect.Field;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

class JpaUserDetailsServiceTest {
    private JpaUserDetailsService jpaUserDetailsService;
    private UserService userService;

    @BeforeEach
    void setUp() {
        userService = Mockito.mock(UserService.class);
        jpaUserDetailsService = new JpaUserDetailsService(userService, "dummy", "dummy");
    }

    @Test
    void loadByUsername_shouldReturnSavedUserDetailsWithUsernameIfUsernameExists() throws IllegalAccessException {
        String username = "username";
        User user = new User();
        user.setUsername(username);
        UserDetails expectedResult = new SecurityUser(user);

        Mockito.when(userService.findByUsername(username)).thenReturn(Optional.of(user));

        UserDetails result = jpaUserDetailsService.loadUserByUsername(username);

        for (Field f : UserDetails.class.getDeclaredFields()) {
            assertEquals(f.get(expectedResult), f.get(result));
        }

        Mockito.verify(userService).findByUsername(username);
    }

    @Test
    void loadByUsername_shouldThrowUsernameNotFoundExceptionIfNoUserDetailsFoundWithGivenUsername() throws IllegalAccessException {
        String username = "username";

        assertThrows(UsernameNotFoundException.class, () -> jpaUserDetailsService.loadUserByUsername(username));

        Mockito.verify(userService).findByUsername(username);
    }

    @AfterEach
    void tearDown() {
    }
}