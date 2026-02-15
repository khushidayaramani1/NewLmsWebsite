package com.example.lmsWebsite.service;

import com.example.lmsWebsite.model.Chapter;
import com.example.lmsWebsite.model.CourseDetail;
import com.example.lmsWebsite.model.Lecture;
import com.example.lmsWebsite.repository.CourseDetailRepo;
import okhttp3.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class CourseDetailService {

    @Autowired
    CourseDetailRepo courseDetailRepo;

    public CourseDetail addCourse(CourseDetail cd, MultipartFile imageFile) throws IOException {
        cd.setThumbnailName(imageFile.getOriginalFilename());
        cd.setThumbnailType(imageFile.getContentType());
        cd.setThumbnailData(imageFile.getBytes());
        if(cd.getChapters()!=null) {
            for (Chapter ch : cd.getChapters()) {
                ch.setCourseDetail(cd);
                if(ch.getLectures()!=null){
                    for (Lecture lec : ch.getLectures()) {
                        lec.setChapter(ch);
                    }
                }
            }
        }
        return courseDetailRepo.save(cd);
    }

    public byte[] getAllThumbnail(int courseId){
         return courseDetailRepo.getAllThumbnail(courseId);
    }

    public List<Map<String,Object>> getAllCourses(){
        return courseDetailRepo.getAllCourses();
    }

    public CourseDetail getCourseDetailById(int courseId) {
        // findById returns Optional, .orElse(null) gives you the actual object
        return courseDetailRepo.findById(courseId).orElse(null);
    }

    public List<Integer> findAllIds(){
        return courseDetailRepo.findAllIds();
    }


}

// http://localhost:8087/getImage?courseId=1
//this api will give the thumbnail of the course



//        cd.setThumbnailFileName(imageFile.getOriginalFilename());
//        String uploadDirectory ="src/main/resources/static/CourseImages/";
//        String fileName = imageFile.getOriginalFilename();
//        Path filePath = Paths.get(uploadDirectory+fileName);
//        imageFile.transferTo(filePath);
//        cd.setThumbnailFilePath("/CourseImages/"+fileName);
//        courseDetailRepo.save(cd);
//        System.out.println("inserted successfully");