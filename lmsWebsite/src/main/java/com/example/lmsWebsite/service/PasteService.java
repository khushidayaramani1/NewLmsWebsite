package com.example.lmsWebsite.service;


import com.example.lmsWebsite.model.Paste;
import com.example.lmsWebsite.repository.PasteRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PasteService {

    @Autowired
    PasteRepo pasteRepo;

    public void insertPasteData(Paste paste){
        pasteRepo.save(paste);
    }
}
