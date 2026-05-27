package com.example.lmsWebsite.controller;

import com.example.lmsWebsite.service.LectureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class LectureController {

    @Autowired
    LectureService lectureService;

    // Tera existing method — same ✅
    @GetMapping("/get-lecture-by-chapterId/{chapterId}")
    public List<Map<String, Object>> getLectureByChapterId(@PathVariable("chapterId") int chapterId) {
        return lectureService.getLectureByChapterId(chapterId);
    }

    // NAYA ↓
    @PostMapping("/complete-lecture")
    public ResponseEntity<?> completeLecture(
            @RequestParam String userId,
            @RequestParam int lectureId,
            @RequestParam int courseId) {

        String result = lectureService.completeLecture(userId, lectureId, courseId);

        if (result.equals("already completed")) {
            return ResponseEntity.ok(Map.of("message", "Lecture already completed!"));
        }

        return ResponseEntity.ok(Map.of("message", "Lecture marked as complete!"));
    }
}