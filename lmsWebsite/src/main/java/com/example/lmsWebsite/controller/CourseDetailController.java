package com.example.lmsWebsite.controller;

import com.example.lmsWebsite.model.Chapter;
import com.example.lmsWebsite.model.CourseDetail;
import com.example.lmsWebsite.model.Lecture;
import com.example.lmsWebsite.service.CourseDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class CourseDetailController {

    @Autowired
    private CourseDetailService courseDetailService;

    @PostMapping(value = "/add-course-detail", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> addCourse(
            @RequestPart("cd") CourseDetail cd,
            @RequestPart(value = "imageFile", required = false) MultipartFile imageFile,
            MultipartHttpServletRequest request) {
        try {
            // Relink the child objects to their parents for database cascading references
            if (cd.getChapters() != null) {
                for (Chapter chapter : cd.getChapters()) {
                    chapter.setCourseDetail(cd);

                    if (chapter.getLectures() != null) {
                        for (Lecture lecture : chapter.getLectures()) {
                            lecture.setChapter(chapter);
                        }
                    }
                }
            }

            // Controller -> Service
            CourseDetail savedCourse = courseDetailService.addCourse(cd, imageFile, request);
            return new ResponseEntity<>(savedCourse, HttpStatus.CREATED);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getImage")
    public ResponseEntity<byte[]> getThumbnailByCourseId(@RequestParam(value="courseId") int courseId){
        // Controller -> Service
        CourseDetail cd = courseDetailService.getCourseDetailById(courseId);
        byte[] byteArray = cd.getThumbnailData();
        return ResponseEntity.ok()
                .contentType(MediaType.valueOf(cd.getThumbnailType()))
                .body(byteArray);
    }

    @GetMapping("/get-four-courses")
    public List<Map<String,Object>> getFourCourses(){
        // Controller -> Service
        List<Map<String , Object>> map = courseDetailService.getAllCourses();
        while(map.size() > 4){
            map.remove(map.size()-1);
        }
        return map;
    }

    @GetMapping("/all-courses")
    public List<Map<String,Object>> getAllCourses(){
        // Controller -> Service
        return courseDetailService.getAllCourses();
    }

    @GetMapping("/all-id")
    public List<Integer> findAllIds(){
        // Controller -> Service
        return courseDetailService.findAllIds();
    }

    @GetMapping("/get-by-id/{courseId}")
    public ResponseEntity<?> getCourseDetailById(@PathVariable("courseId") int courseId){
        try{
            // Controller -> Service
            CourseDetail cd = courseDetailService.getCourseDetailById(courseId);
            return ResponseEntity.ok().body(cd);
        }catch(Exception e){
            return ResponseEntity.noContent().build();
        }
    }
}