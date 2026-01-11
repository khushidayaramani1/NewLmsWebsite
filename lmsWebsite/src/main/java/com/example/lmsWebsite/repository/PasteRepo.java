package com.example.lmsWebsite.repository;

import com.example.lmsWebsite.model.Paste;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PasteRepo extends JpaRepository<Paste,Integer> {
}
