package com.example.lmsWebsite.controller;

import com.example.lmsWebsite.model.CourseDetail;
import com.example.lmsWebsite.service.CourseDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class CourseDetailController {

    @Autowired
    CourseDetailService courseDetailService;

    @PostMapping("/add-course-detail")
    public ResponseEntity<?> addCourse(@RequestPart CourseDetail cd,
                                       @RequestPart MultipartFile imageFile){
        try {
            CourseDetail cd1 = courseDetailService.addCourse(cd, imageFile);
            return new ResponseEntity<>(cd1,HttpStatus.CREATED);
        }
//        catch(IOException e){
//            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
//        }
        catch(Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getImage")
    public ResponseEntity<byte[]> getThumbnailByCourseId(@RequestParam(value="courseId") int courseId){
        CourseDetail cd = courseDetailService.getCourseDetailById(courseId);
        byte[] byteArray = cd.getThumbnailData();
        return ResponseEntity.ok()
                .contentType(MediaType.valueOf(cd.getThumbnailType()))
                .body(byteArray);
    }

    @GetMapping("/all-courses")
    public List<Map<String,Object>> getAllCourses(){
        return courseDetailService.getAllCourses();
    }

    @GetMapping("/all-id")
    public List<Integer> findAllIds(){
        return courseDetailService.findAllIds();
    }
}
