package com.example.lmsWebsite.repository;

import com.example.lmsWebsite.model.Chapter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;

public interface ChapterRepo extends JpaRepository<Chapter,Integer> {

    @Query(value="select chapter_id,chapter_order,chapter_tilte,course_id from chapter where course_id=:courseId;",
    nativeQuery = true)
    List<Map<String,Object>> getChapterByCourseId(@Param("courseId") int courseId);

    @Query(value="select chapter_id from chapter where course_id=:courseId",
    nativeQuery = true)
    List<Integer> getChapterId(@Param("courseId") int courseId);
}
