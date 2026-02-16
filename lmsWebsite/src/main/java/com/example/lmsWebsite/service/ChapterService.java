package com.example.lmsWebsite.service;

import com.example.lmsWebsite.model.Chapter;
import com.example.lmsWebsite.repository.ChapterRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ChapterService {

    @Autowired
    ChapterRepo chapterRepo;
    public List<Map<String,Object>> getChapterByCourseId(int courseId){
        return chapterRepo.getChapterByCourseId(courseId);
    }

    public List<Integer> getChapterId(int courseId){
        return chapterRepo.getChapterId(courseId);
    }
}
