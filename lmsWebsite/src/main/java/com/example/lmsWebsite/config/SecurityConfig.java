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
                .csrf(csrf -> csrf.disable()) // Disable CSRF for testing
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/clerk/**",
                                "/addCourseDetail",
                                "/pasteData",
                                "/addUser",
                                "/enrollCourse",
                                "/getAllCourses/**",
                                "/enrolled-to",
                                "/get-username-coursename-by-id"
                        ).permitAll() // Allow everyone to access this URL
                        .anyRequest().authenticated()            // Lock everything else
                );

        return http.build();
    }
}
