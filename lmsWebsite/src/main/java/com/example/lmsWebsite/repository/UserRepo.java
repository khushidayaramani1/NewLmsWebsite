package com.example.lmsWebsite.repository;

import com.example.lmsWebsite.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<User,Long> {

    // Just a definition - No "=" sign here!
    User findByClerkId(String clerkId);


}
