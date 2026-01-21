package com.example.lmsWebsite.controller;

import com.example.lmsWebsite.model.User;
import com.example.lmsWebsite.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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

    @PostMapping("/addUser")
    public void addUser(@RequestBody User user){
        try{
            System.out.println(user.getUserName()+"-"+user.getEmail());
            userService.addUser(user);
        }catch(Exception e){
            System.out.println("add user me koi toh message aya hai");
        }
    }

    @GetMapping("/get-username-coursename-by-id")
    public List<Map<String,Object>> getUsernameById(){
        return userService.getUsernameById();
    }
}
