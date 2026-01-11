package com.example.lmsWebsite.controller;

import com.example.lmsWebsite.model.Paste;
import com.example.lmsWebsite.service.PasteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class PasteController {
    @Autowired
    PasteService pasteService;

    @PostMapping("/pasteData")
    public void insertPasteData(@RequestBody Paste paste){
        System.out.println(paste.getContent()+"------------"+paste.getTitle());
        pasteService.insertPasteData(paste);
    }
}
