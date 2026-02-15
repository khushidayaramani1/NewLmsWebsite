package com.example.lmsWebsite.controller;
import com.example.lmsWebsite.dto.UserEnrolledCourseResponse;
import com.example.lmsWebsite.model.Enroll;
import com.example.lmsWebsite.service.EnrollService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173/")
public class EnrollController {

    private static Logger logger =  LoggerFactory.getLogger(EnrollController.class);

    @Autowired
    EnrollService enrollService;

    @PostMapping("/enrollCourse")
    public ResponseEntity<?> enrollToCourse(@RequestBody Enroll enroll) {
        boolean success = enrollService.enrollToCourse(enroll);

        if (!success) {
            // This is what the React toast will catch
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("body", "You are already enrolled!"));
        }

        return ResponseEntity.ok(Map.of("body", "Successfully enrolled and email sent!"));
    }

    @GetMapping("/is-enrolled")
    public boolean check(@RequestParam int courseId, @RequestParam String email) {
        return enrollService.isEnrolled(courseId, email);
    }

    @GetMapping("/getAllCourses/{userId}")
    public ResponseEntity<?> getEnrolledCoursesById(@PathVariable String userId){
        try{
            List<Integer> courseIds= enrollService.getEnrolledCoursesById(userId);
            UserEnrolledCourseResponse userCourses = new UserEnrolledCourseResponse(userId,courseIds);
            return ResponseEntity.ok().body(userCourses);
        }catch(Exception e){
            logger.error("could not get all courses of a user");
            logger.error(e.getMessage());
            return ResponseEntity.noContent().build();
        }
    }

    @GetMapping("/enrolled-to")
    public List<Map<String,Object>> getEnrolledUserCourse(){
        return enrollService.getEnrolledUserCourse();
    }


}
