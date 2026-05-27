package com.example.lmsWebsite.service;

import com.example.lmsWebsite.event.LectureCompletedEvent;
import com.example.lmsWebsite.model.LectureProgress;
import com.example.lmsWebsite.repository.LectureProgressRepo;
import com.example.lmsWebsite.repository.LectureRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class LectureService {

    @Autowired
    LectureRepo lectureRepo;

    // NAYA ↓
    @Autowired
    LectureProgressRepo lectureProgressRepo;

    @Autowired
    private KafkaTemplate<String, LectureCompletedEvent> kafkaTemplate;

    // Tera existing method — bilkul same ✅
    public List<Map<String, Object>> getLectureByChapterId(int chapterId) {
        return lectureRepo.getLectureByChapterId(chapterId);
    }

    // NAYA method ↓
    public String completeLecture(String userId, int lectureId, int courseId) {

        // Check — pehle se complete toh nahi?
        if (lectureProgressRepo.isLectureCompleted(userId, lectureId) > 0) {
            return "already completed";
        }

        // DB mein save karo
        LectureProgress progress = new LectureProgress();
        progress.setUserId(userId);
        progress.setLectureId(lectureId);
        progress.setCourseId(courseId);
        progress.setCompleted(true);
        lectureProgressRepo.save(progress);

        // Kafka ko event bhejo
        LectureCompletedEvent event = new LectureCompletedEvent(userId, lectureId, courseId);
        kafkaTemplate.send("lecture-completed-events", event);

        System.out.println("📚 Lecture completed event sent for user: " + userId);

        return "completed";
    }
}