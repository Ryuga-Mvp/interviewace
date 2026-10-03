package com.interviewace.service.impl;

import com.interviewace.dto.ResumeResponse;
import com.interviewace.service.ResumeService;
import lombok.RequiredArgsConstructor;
import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ResumeServiceImpl implements ResumeService {

    private static final List<String> REQUIRED_SKILLS  = List.of(
            "java",
            "spring boot",
            "spring security",
            "hibernate",
            "jpa",
            "mysql",
            "postgresql",
            "rest",
            "git",
            "docker",
            "aws",
            "redis",
            "kafka",
            "microservices",
            "junit",
            "mockito"
    );

    @Override
    public ResumeResponse analyzeResume(MultipartFile file) {

        if(file == null || file.isEmpty()){
            throw new RuntimeException("Please upload a resume");
        }

        if(file.getContentType() == null || !file.getContentType().contains("pdf")){
            throw new RuntimeException("Only PDF files are allowed");
        }

        String text = "";

        try(PDDocument document = Loader.loadPDF(file.getBytes())) {

            PDFTextStripper stripper = new PDFTextStripper();

            text = stripper.getText(document).toLowerCase();

        } catch (IOException e) {
            throw new RuntimeException("Unable to read file");
        }

        List<String> missingSkills = new ArrayList<>();

        for(String skill : REQUIRED_SKILLS ){
            if(!text.contains(skill)){
                missingSkills.add(skill);
            }
        }

        int foundSkills = REQUIRED_SKILLS .size() - missingSkills.size();

        int score = (foundSkills * 100) / REQUIRED_SKILLS .size();

        List<String> suggestions = new ArrayList<>();

        if(score < 50){
            suggestions.add("Improve your resume by adding more backend skills.");
        }

        if(missingSkills.contains("docker")){
            suggestions.add("Learn Docker and containerization.");
        }

        if(missingSkills.contains("redis")){
            suggestions.add("Add Redis caching experience.");
        }

        if(missingSkills.contains("aws")){
            suggestions.add("Mention AWS deployment projects.");
        }

        return ResumeResponse.builder()
                .score(score)
                .missingSkills(missingSkills)
                .suggestions(suggestions)
                .build();
    }

}
