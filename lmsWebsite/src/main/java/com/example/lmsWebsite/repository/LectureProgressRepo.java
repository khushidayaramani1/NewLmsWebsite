package com.example.lmsWebsite.repository;

import com.example.lmsWebsite.model.LectureProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface LectureProgressRepo extends JpaRepository<LectureProgress, Integer> {

    // Check karo — kya yeh lecture already complete hai?
    @Query("SELECT COUNT(l) FROM LectureProgress l WHERE l.userId = :userId AND l.lectureId = :lectureId")
    int isLectureCompleted(@Param("userId") String userId, @Param("lectureId") int lectureId);

    // Count karo — course mein kitne lectures complete kiye
    @Query("SELECT COUNT(l) FROM LectureProgress l WHERE l.userId = :userId AND l.courseId = :courseId AND l.completed = true")
    int countCompletedLectures(@Param("userId") String userId, @Param("courseId") int courseId);
}