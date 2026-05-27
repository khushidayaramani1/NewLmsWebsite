package com.example.lmsWebsite.service;

import com.example.lmsWebsite.event.EnrollmentEvent;
import com.example.lmsWebsite.event.NewCourseEvent;
import com.example.lmsWebsite.model.CourseDetail;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private CourseDetailService courseDetailService;

    @KafkaListener(topics = "enrollment-events", groupId = "lms-chat-group")
    public void handleEnrollment(EnrollmentEvent event) {
        try {
            CourseDetail course = courseDetailService.getCourseDetailById(event.getCourseId());

            // NULL CHECK add karo ← yeh naya hai
            if (course == null) {
                System.out.println("❌ Course not found for id: " + event.getCourseId());
                return;
            }


            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(event.getEmail());
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

            System.out.println("✅ Email sent to: " + event.getEmail());

        } catch (MessagingException e) {
            System.out.println("❌ Email failed: " + e.getMessage());
        }
    }
    @KafkaListener(topics = "new-course-events", groupId = "lms-chat-group")
    public void handleNewCourse(NewCourseEvent event) {
        for (String email : event.getAllEmails()) {
            try {
                MimeMessage message = mailSender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(message, true);
                helper.setTo(email);
                helper.setSubject("New Course Available on LMS! 🎓");
                String htmlContent = "<html><body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>" +
                        "<div style='max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;'>" +
                        "<h2 style='color: #2563eb; text-align: center;'>New Course Available!</h2>" +
                        "<p>Hi there,</p>" +
                        "<p>A new course has just been added: <strong>" + event.getCourseTitle() + "</strong></p>" +
                        "<div style='text-align: center; margin-top: 30px;'>" +
                        "<a href='http://localhost:5173/courses' style='background-color: #2563eb; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;'>View Course</a>" +
                        "</div>" +
                        "</div>" +
                        "</body></html>";
                helper.setText(htmlContent, true);
                mailSender.send(message);
                System.out.println("✅ New course email sent to: " + email);
            } catch (MessagingException e) {
                System.out.println("❌ Email failed for: " + email + " - " + e.getMessage());
            }
        }
    }
}



//@KafkaListener(
//        topics = "enrollment-events",  // is topic ko suno
//        groupId = "lms-chat-group"     // same jo properties mein likha hai
//)
//
//Matlab:
//App start hote hi — yeh method background mein
//"enrollment-events" topic ko continuously sunta rahega
//Jaise hi event aaya → handleEnrollment() call hogi ✅