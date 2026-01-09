package com.example.lmsWebsite.service;

import com.example.lmsWebsite.model.CourseDetail;
import com.example.lmsWebsite.repository.CourseDetailRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class CourseDetailService {

    @Autowired
    CourseDetailRepo courseDetailRepo;

    public void addCourse(CourseDetail cd, MultipartFile imageFile) throws IOException {
        cd.setThumbnailFileName(imageFile.getOriginalFilename());
        String uploadDirectory ="src/main/resources/static/CourseImages/";
        String fileName = imageFile.getOriginalFilename();
        Path filePath = Paths.get(uploadDirectory+fileName);
        imageFile.transferTo(filePath);
        cd.setThumbnailFilePath("/CourseImages/"+fileName);
        courseDetailRepo.save(cd);
        System.out.println("inserted successfully");
    }


}
