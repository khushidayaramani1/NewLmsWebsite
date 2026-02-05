package com.example.lmsWebsite.controller;
import com.example.lmsWebsite.service.ApiService;
//import com.google.protobuf.Api;
//import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins="http://localhost:5173/")
public class ApiController {

    @Autowired
    ApiService apiService;

    @GetMapping("/chat")
    public ResponseEntity<Map<String, Object>> getResponseFromAi(@RequestParam(value="question") String question){
        try {
            // This is likely where the QuotaExceeded exception happens
            Map<String, Object> mRes = apiService.getAiResponse(question);
            return ResponseEntity.ok(mRes);
        } catch (Exception e) {
            // Log the actual error so you can see it in the IntelliJ console
            System.err.println("AI Error: " + e.getMessage());

            // Return a 200 OK but with an error message so the frontend doesn't "crash"
            return ResponseEntity.ok(Map.of("answer", "AI is currently busy (Rate Limit). Please try again in 30 seconds."));
        }
    }
}

