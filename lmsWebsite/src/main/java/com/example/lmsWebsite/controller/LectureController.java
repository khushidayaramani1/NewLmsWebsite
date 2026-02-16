package com.example.lmsWebsite.controller;


import com.example.lmsWebsite.service.LectureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class LectureController {

    @Autowired
    LectureService lectureService;

    @GetMapping("/get-lecture-by-chapterId/{chapterId}")
    public List<Map<String,Object>> getLectureByChapterId(@PathVariable("chapterId") int chapterId){
        return lectureService.getLectureByChapterId(chapterId);
    }

}
