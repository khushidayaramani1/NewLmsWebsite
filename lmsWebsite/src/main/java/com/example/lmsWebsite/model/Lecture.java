package com.example.lmsWebsite.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
public class Lecture {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int lectureId;
    private String lectureTitle;
    private String lectureDuration;
    private int lectureOrder;
    private String lectureUrl;
    @ManyToOne
    @JoinColumn(name="chapterId", nullable = false)
    @JsonBackReference
    Chapter chapter;

    public int getLectureId() {
        return lectureId;
    }

    public void setLectureId(int lectureId) {
        this.lectureId = lectureId;
    }

    public String getLectureTitle() {
        return lectureTitle;
    }

    public void setLectureTitle(String lectureTitle) {
        this.lectureTitle = lectureTitle;
    }

    public String getLectureDuration() {
        return lectureDuration;
    }

    public void setLectureDuration(String lectureDuration) {
        this.lectureDuration = lectureDuration;
    }

    public int getLectureOrder() {
        return lectureOrder;
    }

    public void setLectureOrder(int lectureOrder) {
        this.lectureOrder = lectureOrder;
    }

    public String getLectureUrl() {
        return lectureUrl;
    }

    public void setLectureUrl(String lectureUrl) {
        this.lectureUrl = lectureUrl;
    }

    public Chapter getChapter() {
        return chapter;
    }

    public void setChapter(Chapter chapter) {
        this.chapter = chapter;
    }
}
