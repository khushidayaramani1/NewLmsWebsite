package com.example.lmsWebsite.model;
import jakarta.persistence.*;
import org.springframework.web.multipart.MultipartFile;
import java.time.LocalDateTime;

@Entity
public class CourseDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int courseId;
    private String courseTitle;
    private String courseHeading;
    private String courseDescription;
    private String coursePrice;
//    private MultipartFile file;
    private String thumbnailFileName;
    private String thumbnailFilePath;
    @Column(name = "upload_time", insertable = false, updatable = false)
    private LocalDateTime uploadTime;

    public int getCourseId() {
        return courseId;
    }
    public void setCourseId(int courseId) {
        this.courseId = courseId;
    }
    public String getCourseTitle() {
        return courseTitle;
    }
    public void setCourseTitle(String courseTitle) {
        this.courseTitle = courseTitle;
    }
    public String getCourseHeading() {
        return courseHeading;
    }
    public void setCourseHeading(String courseHeading) {
        this.courseHeading = courseHeading;
    }
    public String getCourseDescription() {
        return courseDescription;
    }
    public void setCourseDescription(String courseDescription) {
        this.courseDescription = courseDescription;
    }
    public String getCoursePrice() {
        return coursePrice;
    }
    public void setCoursePrice(String coursePrice) {
        this.coursePrice = coursePrice;
    }
    public String getThumbnailFileName() {
        return thumbnailFileName;
    }
    public void setThumbnailFileName(String thumbnailFileName) {
        this.thumbnailFileName = thumbnailFileName;
    }
    public String getThumbnailFilePath() {
        return thumbnailFilePath;
    }
    public void setThumbnailFilePath(String thumbnailFilePath) {
        this.thumbnailFilePath = thumbnailFilePath;
    }
    public LocalDateTime getUploadTime() {
        return uploadTime;
    }
    public void setUploadTime(LocalDateTime uploadTime) {
        this.uploadTime = uploadTime;
    }
}
