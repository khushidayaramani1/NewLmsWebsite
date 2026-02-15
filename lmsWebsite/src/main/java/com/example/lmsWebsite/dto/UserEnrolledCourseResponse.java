package com.example.lmsWebsite.dto;

import java.util.List;

public class UserEnrolledCourseResponse {
    private String userId;
    private List<Integer> courseIds;

    public UserEnrolledCourseResponse(String userId, List<Integer> courseIds) {
        this.userId = userId;
        this.courseIds = courseIds;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public List<Integer> getCourseIds() {
        return courseIds;
    }

    public void setCourseIds(List<Integer> courseIds) {
        this.courseIds = courseIds;
    }
}
