package com.example.lmsWebsite.model;


import com.example.lmsWebsite.BaseEntity;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class CourseDetail extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int courseId;
    private String educatorId;
    private String courseTitle;
    private String courseHeadings;
    @Lob
    private String courseDescription;
    private int coursePrice;
    private String thumbnailName;
    private String thumbnailType;
    @Lob
    private byte[] thumbnailData;

    public String getCourseTitle() {
        return courseTitle;
    }

    public void setCourseTitle(String courseTitle) {
        this.courseTitle = courseTitle;
    }

    public String getCourseHeadings() {
        return courseHeadings;
    }

    public void setCourseHeadings(String courseHeadings) {
        this.courseHeadings = courseHeadings;
    }

    public String getCourseDescription() {
        return courseDescription;
    }

    public void setCourseDescription(String courseDescription) {
        this.courseDescription = courseDescription;
    }

    public int getCoursePrice() {
        return coursePrice;
    }

    public void setCoursePrice(int coursePrice) {
        this.coursePrice = coursePrice;
    }

    public String getThumbnailName() {
        return thumbnailName;
    }

    public void setThumbnailName(String thumbnailName) {
        this.thumbnailName = thumbnailName;
    }

    public String getThumbnailType() {
        return thumbnailType;
    }

    public void setThumbnailType(String thumbnailType) {
        this.thumbnailType = thumbnailType;
    }

    public byte[] getThumbnailData() {
        return thumbnailData;
    }

    public void setThumbnailData(byte[] thumbnailData) {
        this.thumbnailData = thumbnailData;
    }
    public String getEducatorId() {
        return educatorId;
    }
    public void setEducatorId(String educatorId) {
        this.educatorId = educatorId;
    }
    public int getCourseId() {
        return courseId;
    }

    public void setCourseId(int courseId) {
        this.courseId = courseId;
    }
}