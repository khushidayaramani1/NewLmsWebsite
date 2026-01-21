package com.example.lmsWebsite.service;

import com.example.lmsWebsite.model.Enroll;
import com.example.lmsWebsite.repository.EnrollRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class EnrollService {

    @Autowired
    EnrollRepo enrollRepo;

    public void enrollToCourse(Enroll enroll){
        enrollRepo.save(enroll);
    }
    public List<String> getEnrolledCoursesById(String userId){
        return enrollRepo.getEnrolledCoursesById(userId);
    }
    public List<Map<String, Object>> getEnrolledUserCourse(){
        return enrollRepo.getEnrolledUserCourse();
    }
}
