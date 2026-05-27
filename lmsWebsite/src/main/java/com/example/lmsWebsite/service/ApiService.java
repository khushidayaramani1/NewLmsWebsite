package com.example.lmsWebsite.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.ai.converter.MapOutputConverter;
import org.springframework.ai.chat.client.ChatClient;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Map;

@Service
public class ApiService {

    ChatClient chatClient;

    ChatModel chatModel;

    public ApiService(ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder.build();
    }
//    public ApiService(ChatModel chatModel) {
//        this.chatModel = chatModel;
//    }

    public Map<String, Object> getAiResponse(String question) {
//        CALL AI
        String res = chatClient.prompt(question)
                .call()
                .content();
//        return chatModel.call(question);
        return Map.of("answer", res);
    }   
}