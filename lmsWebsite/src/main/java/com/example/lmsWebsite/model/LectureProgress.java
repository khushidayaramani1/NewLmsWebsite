package com.example.lmsWebsite.model;

import jakarta.persistence.*;

@Entity
@Table(name = "lecture_progress")
public class LectureProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String userId;
    private int lectureId;
    private int courseId;
    private boolean completed;

    // Default constructor
    public LectureProgress() {}

    // Getters & Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public int getLectureId() { return lectureId; }
    public void setLectureId(int lectureId) { this.lectureId = lectureId; }

    public int getCourseId() { return courseId; }
    public void setCourseId(int courseId) { this.courseId = courseId; }

    public boolean isCompleted() { return completed; }
    public void setCompleted(boolean completed) { this.completed = completed; }
}