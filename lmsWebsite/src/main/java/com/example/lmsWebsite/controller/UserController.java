package com.example.lmsWebsite.controller;

import com.example.lmsWebsite.model.User;
import com.example.lmsWebsite.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
    @Autowired
    UserService userService;
    @PostMapping("/clerk")
    public User checkUser(@RequestBody User user){
        try{
            User u =userService.checkUser(user.getClerkId());
            System.out.println(u.getUserName()+"---");
            return u;
        }catch(NullPointerException e){
            System.out.println("no user found wiht ths id");
        }catch(Exception e){
            System.out.println("some exception occured");
        }
        return null;
    }
}
