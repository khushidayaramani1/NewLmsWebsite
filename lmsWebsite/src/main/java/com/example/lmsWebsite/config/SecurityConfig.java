package com.example.lmsWebsite.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/chat",
                                "/clerk/**",
                                "/add-course-detail",
                                "/pasteData",
                                "/addUser",
                                "/enrollCourse",
                                "/getAllCourses/**",
                                "/enrolled-to",
                                "/get-username-coursename-by-id",
                                "/cricket",
                                "/chat",
                                "/set-isEducator",
                                "/getImage",
                                "/all-courses",
                                "/all-id"
                        ).permitAll()
                        .anyRequest().authenticated()
                );
        return http.build();
    }
}
