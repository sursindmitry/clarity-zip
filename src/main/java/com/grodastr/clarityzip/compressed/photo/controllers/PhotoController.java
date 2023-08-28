package com.grodastr.clarityzip.compressed.photo.controllers;

import com.grodastr.clarityzip.compressed.photo.service.PhotoService;
import org.apache.tika.Tika;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class PhotoController {

    private final PhotoService photoService;
    @Autowired
    public PhotoController(PhotoService photoService) {
        this.photoService = photoService;
    }

    @PostMapping("/compressed/photo")
    public ResponseEntity<?> uploadCompressedPhoto(@RequestParam("image") MultipartFile image) throws IOException {
        if (image.isEmpty()) {
            return ResponseEntity.badRequest().body("File is empty");
        }
        Tika tika = new Tika();
        String contentType=tika.detect(image.getBytes());
        if (!contentType.startsWith("image/")){
            return ResponseEntity.status(400).body("File is not an image");
        }
        return ResponseEntity.ok().body(photoService.uploadCompressedPhoto(image));
    }


    @GetMapping("/uploads/{fileName}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName) {
        try {
            Resource resource = photoService.getPhotoResource(fileName);

            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"");

            return ResponseEntity.ok()
                    .headers(headers)
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .body(resource);
        } catch (IOException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
