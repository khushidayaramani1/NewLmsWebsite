package com.example.lmsWebsite.event;

import java.util.List;

public class NewCourseEvent {

    private int courseId;
    private String courseTitle;
    private List<String> allEmails; // saare registered users ke emails

    // Default constructor — Kafka ke liye zaruri!
    public NewCourseEvent() {}

    // Parameterized constructor
    public NewCourseEvent(int courseId, String courseTitle, List<String> allEmails) {
        this.courseId = courseId;
        this.courseTitle = courseTitle;
        this.allEmails = allEmails;
    }

    // Getters & Setters
    public int getCourseId() { return courseId; }
    public void setCourseId(int courseId) { this.courseId = courseId; }

    public String getCourseTitle() { return courseTitle; }
    public void setCourseTitle(String courseTitle) { this.courseTitle = courseTitle; }

    public List<String> getAllEmails() { return allEmails; }
    public void setAllEmails(List<String> allEmails) { this.allEmails = allEmails; }
}