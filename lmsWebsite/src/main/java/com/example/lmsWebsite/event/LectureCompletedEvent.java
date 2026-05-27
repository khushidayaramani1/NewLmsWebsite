package com.example.lmsWebsite.event;

public class LectureCompletedEvent {

    private String userId;
    private int lectureId;
    private int courseId;

    // Default constructor — Kafka ke liye zaruri!
    public LectureCompletedEvent() {}

    // Parameterized constructor
    public LectureCompletedEvent(String userId, int lectureId, int courseId) {
        this.userId = userId;
        this.lectureId = lectureId;
        this.courseId = courseId;
    }

    // Getters & Setters
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public int getLectureId() { return lectureId; }
    public void setLectureId(int lectureId) { this.lectureId = lectureId; }

    public int getCourseId() { return courseId; }
    public void setCourseId(int courseId) { this.courseId = courseId; }
}