package com.example.resourceserver;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT, properties = {
        "spring.profiles.active=test"
})
class ResourceserverApplicationTests {

    @Test
    void contextLoads() {
    }

}
