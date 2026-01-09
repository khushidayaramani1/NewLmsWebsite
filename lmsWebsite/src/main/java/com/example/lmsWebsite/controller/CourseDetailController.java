package com.example.lmsWebsite.controller;

import com.example.lmsWebsite.model.CourseDetail;
import com.example.lmsWebsite.service.CourseDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
public class CourseDetailController {

    @Autowired
    CourseDetailService courseDetailService;
    @PostMapping("/addCourseDetail")
    public void addCourse(@RequestPart CourseDetail cd, @RequestPart MultipartFile imageFile){
        System.out.println(cd.getCourseDescription()+"-----"+cd.getCourseHeading());
        try {
            courseDetailService.addCourse(cd, imageFile);
        }catch (IOException e){
            System.out.println("file upload or path mistake");
        }catch(Exception e){
            System.out.println("some exception occured");
        }
    }
}
