package com.example.lmsWebsite.model;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Paste {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int pasteId;
    private String title;
    private String content;
    private String date;
    private String time;

    public int getPasteId() {
        return pasteId;
    }

    public void setPasteId(int pasteId) {
        this.pasteId = pasteId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }
}
