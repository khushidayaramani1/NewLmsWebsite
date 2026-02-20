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

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class CourseDetailController {
    @Autowired
    CourseDetailService courseDetailService;
    @PostMapping("/add-course-detail")
    public ResponseEntity<?> addCourse(
            // @RequestPart("cd") matches the 'cd' key in Frontend FormData
            @RequestPart("cd") CourseDetail cd,
            // required = false makes the image optional to prevent 400 errors if missing
            @RequestPart(value = "imageFile", required = false) MultipartFile imageFile) {
        try {
            /* CRITICAL LOGIC:
               In a nested JSON submission, the 'CourseDetail' object arrives with a list
               of Chapters, but the Chapters don't "know" who their parent Course is yet.
               We must manually set these references so JPA can fill the Foreign Key columns.
            */
            if (cd.getChapters() != null) {
                for (Chapter chapter : cd.getChapters()) {
                    // Link Chapter -> CourseDetail
                    chapter.setCourseDetail(cd);

                    if (chapter.getLectures() != null) {
                        for (Lecture lecture : chapter.getLectures()) {
                            // Link Lecture -> Chapter
                            lecture.setChapter(chapter);
                        }
                    }
                }
            }

            // Save the parent. CascadeType.ALL in the Entity will save chapters & lectures automatically.
            CourseDetail savedCourse = courseDetailService.addCourse(cd, imageFile);
            return new ResponseEntity<>(savedCourse, HttpStatus.CREATED);

        } catch (Exception e) {
            // Log the error to your console so you can see why it failed
            e.printStackTrace();
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

    @GetMapping("/get-four-courses")
    public List<Map<String,Object>> getFourCourses(){
        List<Map<String , Object>> map = courseDetailService.getAllCourses();
        while(map.size()!=4){
            map.remove(map.size()-1);
        }
        return map;
    }

    @GetMapping("/all-courses")
    public List<Map<String,Object>> getAllCourses(){
        return courseDetailService.getAllCourses();
    }

    @GetMapping("/all-id")
    public List<Integer> findAllIds(){
        return courseDetailService.findAllIds();
    }

    @GetMapping("/get-by-id/{courseId}")
    public ResponseEntity<?> getCourseDetailById(@PathVariable("courseId") int courseId){
        try{
            CourseDetail cd = courseDetailService.getCourseDetailById(courseId);
            return ResponseEntity.ok().body(cd);
        }catch(Exception e){
            return ResponseEntity.noContent().build();
        }
    }
}
