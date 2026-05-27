package com.example.lmsWebsite.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Maps http://localhost:8087/CourseVideos/* to the physical folder on your drive
        String uploadDirectory = System.getProperty("user.dir") + "/CourseVideos/";

        registry.addResourceHandler("/CourseVideos/**")
                .addResourceLocations("file:" + uploadDirectory);
    }
}