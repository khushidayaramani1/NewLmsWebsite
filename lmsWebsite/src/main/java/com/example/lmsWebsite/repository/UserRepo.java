package com.example.lmsWebsite.repository;

import com.example.lmsWebsite.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface UserRepo extends JpaRepository<User,Long> {

    // Just a definition - No "=" sign here!
    User findByClerkId(String clerkId);

    @Query(value="SELECT u.user_name, c.course_title FROM enroll e JOIN users u ON e.user_id = u.clerk_id JOIN courses c ON e.course_id = c.id;",
    nativeQuery = true)
    public List<Map<String,Object>> getUsernameAndCourseNameById();

}
