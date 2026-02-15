package com.example.lmsWebsite.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Chapter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int chapterId;

    private String chapterTilte;
    private int chapterOrder;

    @OneToMany(mappedBy = "chapter" , cascade = CascadeType.ALL)
    private List<Lecture> lectures = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name="courseId", nullable = false)
    private CourseDetail courseDetail;

    public int getChapterId() {
        return chapterId;
    }

    public void setChapterId(int chapterId) {
        this.chapterId = chapterId;
    }

    public String getChapterTilte() {
        return chapterTilte;
    }

    public void setChapterTilte(String chapterTilte) {
        this.chapterTilte = chapterTilte;
    }

    public int getChapterOrder() {
        return chapterOrder;
    }

    public void setChapterOrder(int chapterOrder) {
        this.chapterOrder = chapterOrder;
    }

    public List<Lecture> getLectures() {
        return lectures;
    }

    public void setLectures(List<Lecture> lectures) {
        this.lectures = lectures;
    }

    public CourseDetail getCourseDetail() {
        return courseDetail;
    }

    public void setCourseDetail(CourseDetail courseDetail) {
        this.courseDetail = courseDetail;
    }
}
