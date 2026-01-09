package com.example.lmsWebsite.repository;

import com.example.lmsWebsite.model.CourseDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseDetailRepo extends JpaRepository<CourseDetail,Integer> {
}
