package com.example.lmsWebsite.repository;

import com.example.lmsWebsite.model.CourseDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface CourseDetailRepo extends JpaRepository<CourseDetail,Integer> {

    @Query(value = "select thumbnail_data from course_detail where course_id=:courseId;",
            nativeQuery = true)
    public byte[] getAllThumbnail(@Param("courseId") int courseId);


    @Query(value = "select course_id from course_detail",
    nativeQuery = true)
    public List<Integer> findAllIds();

    @Query(value="select course_id,course_description,course_price,course_title,course_headings from course_detail;",
    nativeQuery = true)
    public List<Map<String,Object>> getAllCourses();


}
