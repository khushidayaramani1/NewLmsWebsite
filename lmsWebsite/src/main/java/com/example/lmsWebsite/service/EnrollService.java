package com.example.lmsWebsite.service;
import com.example.lmsWebsite.event.EnrollmentEvent;
import com.example.lmsWebsite.event.EnrollmentEvent;
import com.example.lmsWebsite.model.CourseDetail;
import com.example.lmsWebsite.model.Enroll;
import com.example.lmsWebsite.repository.EnrollRepo;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;


@Service
public class EnrollService {
    @Autowired
    EnrollRepo enrollRepo;
    @Autowired
    CourseDetailService courseDetailService;
    @Autowired
    JavaMailSender mailSender;

    private static Logger logger = LoggerFactory.getLogger(EnrollService.class);

    @Autowired
    private KafkaTemplate<String, EnrollmentEvent> kafkaTemplate;

    // Inside your Service method
    public boolean enrollToCourse(Enroll enroll) {
        if(isEnrolled(enroll.getCourseId(), enroll.getEmail())){
            return false;
        }
        // 1. Save to Database first
        enrollRepo.save(enroll);

        EnrollmentEvent event = new EnrollmentEvent(
                enroll.getEmail(),
                enroll.getCourseId(),
                enroll.getUserId()
        );
        kafkaTemplate.send("enrollment-events", event);


        return true;
    }

    public List<Integer> getEnrolledCoursesById(String userId){
        return enrollRepo.getEnrolledCoursesById(userId);
    }

    public List<Map<String, Object>> getEnrolledUserCourse(){
        return enrollRepo.getEnrolledUserCourse();
    }
    public boolean isEnrolled(int courseId, String email) {
        // FIX: Use lowercase enrollRepo instance
        int num = enrollRepo.isEnrolled(courseId, email);
        return num > 0;
    }
}
