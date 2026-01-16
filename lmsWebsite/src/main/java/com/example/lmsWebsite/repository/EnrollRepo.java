package com.example.lmsWebsite.repository;

import com.example.lmsWebsite.model.Enroll;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EnrollRepo extends JpaRepository<Enroll,Integer> {

    @Query(value="select course_id from enroll where user_id=:userId",nativeQuery = true)
    public List<String> getEnrolledCoursesById(@Param("userId") String userId);

}
