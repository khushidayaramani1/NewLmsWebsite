package com.example.lmsWebsite.repository;

import com.example.lmsWebsite.model.Lecture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface LectureRepo extends JpaRepository<Lecture,Integer> {

    @Query(value="select lecture_duration,lecture_order,lecture_title from lecture where chapter_id=:chapterId;",
    nativeQuery = true)
    List<Map<String,Object>> getLectureByChapterId(@Param("chapterId") int chapterId);
}
