package com.example.lmsWebsite.service;

import com.example.lmsWebsite.model.User;
import com.example.lmsWebsite.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    UserRepo userRepo;
    public User checkUser(String clerkId) throws NullPointerException {
        User u = userRepo.findByClerkId(clerkId);
        return u;
    }
    public void addUser(User user){
        userRepo.save(user);
    }


}
