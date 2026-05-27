package com.example.lmsWebsite.service;

import com.example.lmsWebsite.event.LectureCompletedEvent;
import com.example.lmsWebsite.repository.LectureProgressRepo;
import com.example.lmsWebsite.repository.LectureRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class ProgressService {

    @Autowired
    LectureProgressRepo lectureProgressRepo;

    @Autowired
    LectureRepo lectureRepo;

    @KafkaListener(topics = "lecture-completed-events", groupId = "lms-chat-group")
    public void handleLectureCompleted(LectureCompletedEvent event) {

        // Kitne lectures complete kiye is course mein?
        int completedCount = lectureProgressRepo
                .countCompletedLectures(event.getUserId(), event.getCourseId());

        System.out.println("📊 Progress Update:");
        System.out.println("   User: " + event.getUserId());
        System.out.println("   Course: " + event.getCourseId());
        System.out.println("   Completed Lectures: " + completedCount);
    }
}