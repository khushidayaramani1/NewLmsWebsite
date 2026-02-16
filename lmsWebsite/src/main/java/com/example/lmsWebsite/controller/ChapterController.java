package com.example.lmsWebsite.controller;


import com.example.lmsWebsite.model.Chapter;
import com.example.lmsWebsite.service.ChapterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class ChapterController {

    @Autowired
    ChapterService chapterService;
    @GetMapping("/get-chapters/{courseId}")
    public List<Map<String,Object>> getChapterByCourseId(@PathVariable("courseId") int courseId){
        return chapterService.getChapterByCourseId(courseId);
    }

    @GetMapping("/get-chapterId/{courseId}")
    public List<Integer> getChapterId(@PathVariable("courseId") int courseId){
        return chapterService.getChapterId(courseId);
    }
}
