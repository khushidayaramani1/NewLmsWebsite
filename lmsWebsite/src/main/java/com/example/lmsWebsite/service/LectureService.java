package com.example.lmsWebsite.service;

import com.example.lmsWebsite.repository.LectureRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class LectureService {

    @Autowired
    LectureRepo lectureRepo;

    public List<Map<String,Object>> getLectureByChapterId(int chapterId){
        return lectureRepo.getLectureByChapterId(chapterId);
    }
}
