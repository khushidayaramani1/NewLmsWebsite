package com.example.lmsWebsite.repository;

import com.example.lmsWebsite.model.Enroll;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface EnrollRepo extends JpaRepository<Enroll,Integer> {

    @Query(value="select course_id from enroll where user_id=:userId",nativeQuery = true)
    public List<Integer> getEnrolledCoursesById(@Param("userId") String userId);

    @Query(value = "select user_id,course_id from enroll;",nativeQuery = true)
    public List<Map<String, Object>> getEnrolledUserCourse();

    @Query(value="select count(enroll_id) from enroll where course_id=:courseId AND email =:email", nativeQuery = true)
    int isEnrolled(@Param("courseId") int courseId, @Param("email") String email);

}
