package com.example.lmsWebsite.service;
import com.example.lmsWebsite.model.CourseDetail;
import com.example.lmsWebsite.model.Enroll;
import com.example.lmsWebsite.repository.EnrollRepo;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    // Inside your Service method
    public boolean enrollToCourse(Enroll enroll) {
        if(isEnrolled(enroll.getCourseId(), enroll.getEmail())){
            return false;
        }
        // 1. Save to Database first
        enrollRepo.save(enroll);
        // 2. Send the Email
        try {
            int id = enroll.getCourseId();
            CourseDetail course=courseDetailService.getCourseDetailById(enroll.getCourseId());
            logger.info("id is "+id);
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true); // true = HTML mode
            helper.setTo(enroll.getEmail());
            helper.setSubject("Welcome to our LMS!");
            String htmlContent = "<html><body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>" +
                    "<div style='max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;'>" +
                    "<h2 style='color: #2563eb; text-align: center;'>Congratulations!</h2>" +
                    "<p>Hi there,</p>" +
                    "<p>You have successfully enrolled in <strong>" + course.getCourseTitle() + "</strong>. We're excited to have you on board!</p>" +
                    "<div style='background-color: #f9fafb; padding: 15px; border-radius: 8px; margin: 20px 0;'>" +
                    "<h4 style='margin-top: 0;'>Course Details:</h4>" +
                    "<p style='margin: 5px 0;'><strong>Course:</strong> " + course.getCourseTitle() + "</p>" +
                    "<p style='margin: 5px 0;'><strong>Price Paid:</strong> ₹" + course.getCoursePrice() + "</p>" +
                    "</div>" +
                    "<div style='text-align: center; margin-top: 30px;'>" +
                    "<a href='http://localhost:5173/my-enrollement' style='background-color: #2563eb; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;'>Go to My Dashboard</a>" +
                    "</div>" +
                    "<hr style='border: 0; border-top: 1px solid #eee; margin: 30px 0;'>" +
                    "<p style='font-size: 12px; color: #666; text-align: center;'>If you have any questions, reply to this email.</p>" +
                    "</div>" +
                    "</body></html>";
            helper.setText(htmlContent, true);
            mailSender.send(message);
        } catch (MessagingException e) {
            // Log the error so the app doesn't crash if the email fails
            System.out.println("Email failed to send: " + e.getMessage());
        }
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
