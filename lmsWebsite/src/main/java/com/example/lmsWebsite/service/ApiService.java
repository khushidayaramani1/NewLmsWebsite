package com.example.lmsWebsite.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.ai.converter.MapOutputConverter;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Map;

@Service
public class ApiService {

    ChatClient chatClient;

    ChatModel chatModel;

        public ApiService(ChatClient.Builder chatClientBuilder){
        this.chatClient = chatClientBuilder.build();
    }
//    public ApiService(ChatModel chatModel) {
//        this.chatModel = chatModel;
//    }

    public Map<String,Object> getAiResponse(String question) {
//        CALL AI
        String res=chatClient.prompt(question)
                .call()
                .content();
//        return chatModel.call(question);
        return Map.of(question,res);
    }

//    public String generateResponse(String inputText) {
//        MapOutputConverter converter = new MapOutputConverter();
//        String promptString =  "hello";
//
////        Prompt prompt = new PromptTemplate(promptString)
////                .create(Map.of("input", inputText,
////                        "format", converter.getFormat()
////                ));
//
//        ChatResponse cricketResponse= chatModel.call(new Prompt(promptString));
//        return cricketResponse.getResult().getOutput().getText();
//
////        get content from chatResponse
////        return converter.convert(cricketResponse.getResult().getOutput().getText());
//    }
//    //        load prompt from the text file
//    public String loadPromptTemplate(String filename){
//        try {
//            Path filePath = new ClassPathResource(filename).getFile().toPath();
//            return Files.readString(filePath);
//        }catch (IOException e){
//            return e.getMessage();
//        }
//    }
//
//    //        put the values to the prompt
//    public String putValuesToPromptTemplate(String template, Map<String, String> values) {
//
//        for (Map.Entry<String, String> entry : values.entrySet()) {
//            template = template.replace("{" + entry.getKey() + "}", entry.getValue());
//        }
//        return template;
//    }

}

