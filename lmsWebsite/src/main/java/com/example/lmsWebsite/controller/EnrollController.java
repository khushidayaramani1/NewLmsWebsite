package com.example.lmsWebsite.controller;
import com.example.lmsWebsite.model.Enroll;
import com.example.lmsWebsite.service.EnrollService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173/")
public class EnrollController {

    @Autowired
    EnrollService enrollService;

    @PostMapping("/enrollCourse")
    public void enrollToCourse(@RequestBody Enroll enroll){
        System.out.println("method is called from here");
        try{
            System.out.println(enroll.getEmail()+"-"+ enroll.getCardNo()+"-"+enroll.getExpiryDate());
            enrollService.enrollToCourse(enroll);
        }catch(Exception e){
            System.out.println("error in enroll to course");
        }
    }
    @GetMapping("/getAllCourses/{userId}")
    public List<String> getEnrolledCoursesById(@PathVariable String userId){
        try{
            return enrollService.getEnrolledCoursesById(userId);
        }catch(Exception e){
            System.out.println("something went wrong in fetching id");
        }
        return null;
    }

    @GetMapping("/enrolled-to")
    public List<Map<String,Object>> getEnrolledUserCourse(){
        return enrollService.getEnrolledUserCourse();
    }
}
