package com.example.resourceserver;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
public class EndpointAccessTest {
    @Autowired
    private MockMvc mockMvc;

    @WithMockUser(roles = "ADMIN")
    @Test
    public void givenAdminRole_whenAccessActuator_thenOk() throws Exception {
        mockMvc.perform(get("/actuator"))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(roles = "USER")
    public void givenUserRole_whenAccessActuator_thenForbidden() throws Exception {
        mockMvc.perform(get("/actuator"))
                .andExpect(status().isForbidden());
    }

}
