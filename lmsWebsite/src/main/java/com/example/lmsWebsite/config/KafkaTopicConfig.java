package com.example.lmsWebsite.config;
import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

@Configuration  // Spring ko batao — yeh config class hai
public class KafkaTopicConfig {

    @Bean  // Spring automatically isko run karega startup pe
    public NewTopic enrollmentTopic() {
        return new NewTopic("enrollment-events", 1, (short) 1);
    }

    @Bean
    public NewTopic lectureCompletedTopic() {
        return new NewTopic("lecture-completed-events", 1, (short) 1);
    }

    @Bean
    public NewTopic newCourseTopic() {
        return new NewTopic("new-course-events", 1, (short) 1);
    }
}
