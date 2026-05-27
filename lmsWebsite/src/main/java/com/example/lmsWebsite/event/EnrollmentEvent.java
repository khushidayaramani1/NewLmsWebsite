package com.example.lmsWebsite.event;

public class EnrollmentEvent {
    private String email;
    private int courseId;
    private String userId;

    public EnrollmentEvent() {}

    public EnrollmentEvent(String email, int courseId, String userId) {
        this.email = email;
        this.courseId = courseId;
        this.userId = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getCourseId() {
        return courseId;
    }

    public void setCourseId(int courseId) {
        this.courseId = courseId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}
