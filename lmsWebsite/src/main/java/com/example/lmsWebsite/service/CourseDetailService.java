package com.example.lmsWebsite.service;

import com.example.lmsWebsite.event.NewCourseEvent;
import com.example.lmsWebsite.model.Chapter;
import com.example.lmsWebsite.model.CourseDetail;
import com.example.lmsWebsite.model.Lecture;
import com.example.lmsWebsite.repository.CourseDetailRepo;
import com.example.lmsWebsite.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

@Service
public class CourseDetailService {

    @Autowired
    private CourseDetailRepo courseDetailRepo;

    @Autowired
    private UserRepo userRepo; // saare users ke emails ke liye

    @Autowired
    private KafkaTemplate<String, NewCourseEvent> kafkaTemplate; // NAYA

    public CourseDetail addCourse(CourseDetail cd, MultipartFile imageFile, MultipartHttpServletRequest request) throws IOException {

        // Tera existing code — kuch nahi badla ✅
        if (imageFile != null && !imageFile.isEmpty()) {
            cd.setThumbnailName(imageFile.getOriginalFilename());
            cd.setThumbnailType(imageFile.getContentType());
            cd.setThumbnailData(imageFile.getBytes());
        }

        if (cd.getChapters() != null) {
            String uploadDirectory = System.getProperty("user.dir") + "/CourseVideos/";
            Path uploadPath = Paths.get(uploadDirectory);

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            for (int i = 0; i < cd.getChapters().size(); i++) {
                Chapter ch = cd.getChapters().get(i);
                ch.setCourseDetail(cd);

                if (ch.getLectures() != null) {
                    for (int j = 0; j < ch.getLectures().size(); j++) {
                        Lecture lec = ch.getLectures().get(j);
                        lec.setChapter(ch);

                        String videoKey = "lectureVideo_" + i + "_" + j;
                        MultipartFile videoFile = request.getFile(videoKey);

                        if (videoFile != null && !videoFile.isEmpty()) {
                            String fileName = System.currentTimeMillis() + "_" + videoFile.getOriginalFilename();
                            Path filePath = uploadPath.resolve(fileName);
                            videoFile.transferTo(filePath.toFile());
                            lec.setVideoName(fileName);
                            lec.setVideoPath("/CourseVideos/" + fileName);
                        }
                    }
                }
            }
        }

        // DB mein save karo
        CourseDetail saved = courseDetailRepo.save(cd);

        // Kafka ko event bhejo — NAYA ✅
        List<String> allEmails = userRepo.getAllEmails();
        NewCourseEvent event = new NewCourseEvent(
                saved.getCourseId(),
                saved.getCourseTitle(),
                allEmails
        );
        kafkaTemplate.send("new-course-events", event);

        System.out.println("🎓 New course event sent: " + saved.getCourseTitle());

        return saved;
    }

    // Baaki methods same ✅
    public byte[] getAllThumbnail(int courseId){
        return courseDetailRepo.getAllThumbnail(courseId);
    }

    public List<Map<String,Object>> getAllCourses(){
        return courseDetailRepo.getAllCourses();
    }

    public CourseDetail getCourseDetailById(int courseId) {
        return courseDetailRepo.findById(courseId).orElse(null);
    }

    public List<Integer> findAllIds(){
        return courseDetailRepo.findAllIds();
    }
}