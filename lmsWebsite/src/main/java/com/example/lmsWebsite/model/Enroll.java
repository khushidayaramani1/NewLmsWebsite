package com.example.lmsWebsite.model;

import jakarta.persistence.*;

@Entity
@Table(name = "enroll", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"email", "course_id"})
})
public class Enroll {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int enrollId;
    private String userId;
    @Column(name = "course_id")
    private int courseId;
    private String email;
    private String cardNo;
    private String expiryDate;
    private String cvc;

    public int getEnrollId() {
        return enrollId;
    }

    public void setEnrollId(int enrollId) {
        this.enrollId = enrollId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public int getCourseId() {
        return courseId;
    }

    public void setCourseId(int courseId) {
        this.courseId = courseId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCardNo() {
        return cardNo;
    }

    public void setCardNo(String cardNo) {
        this.cardNo = cardNo;
    }

    public String getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(String expiryDate) {
        this.expiryDate = expiryDate;
    }

    public String getCvc() {
        return cvc;
    }

    public void setCvc(String cvc) {
        this.cvc = cvc;
    }
}
