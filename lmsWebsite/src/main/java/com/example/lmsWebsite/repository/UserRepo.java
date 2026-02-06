package com.example.lmsWebsite.repository;

import com.example.lmsWebsite.model.User;
import com.google.gson.annotations.Since;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Repository
public interface UserRepo extends JpaRepository<User,Long> {

    // Just a definition - No "=" sign here!
    User findByClerkId(String clerkId);

    @Query(value="SELECT u.user_name, c.course_title FROM enroll e JOIN users u ON e.user_id = u.clerk_id JOIN courses c ON e.course_id = c.id;",
    nativeQuery = true)
    public List<Map<String,Object>> getUsernameAndCourseNameById();

    @Modifying   //modifying tells jpa that this is update query
    @Transactional  //Since you are changing data in the database, Spring requires an active transaction. Without this, you will get a "Transaction Required" error next.
    @Query(value = "update users set isEducator = true where clerk_id=:clerkId;",
    nativeQuery = true)
    public int setIsEducator(@Param("clerkId") String clerkId);

}
