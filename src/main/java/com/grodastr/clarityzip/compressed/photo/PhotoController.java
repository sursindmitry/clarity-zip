package com.grodastr.clarityzip.compressed.photo;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class PhotoController {
    @PostMapping("/compressed/photo")
    public ResponseEntity<?> uploadCompressedPhoto(@RequestParam("image") MultipartFile image) {
//        TODO: Удалить C:/, когда надо пушить на серевер
        String uploadDirectory = "C:/" + File.separator + "temp";
        Path path = Path.of(uploadDirectory);
        if (image.isEmpty()) {
            return ResponseEntity.badRequest().body("File is empty");
        }
        try {
            String originalFileName = image.getOriginalFilename();
            String uniqueFileName = UUID.randomUUID().toString() + "_" + originalFileName;
            File compressedImageFile = new File(path.toString(), uniqueFileName);


            image.transferTo(compressedImageFile);

            String imageUrl = "/uploads/" + uniqueFileName;
            return ResponseEntity.ok().body(imageUrl);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error uploading image");
        }
    }

    @GetMapping("/uploads/{fileName}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName) throws IOException {
//        TODO: Удалить C:/, когда надо пушить на серевер
        String uploadDirectory = "C:/" + File.separator + "temp";
        Path path = Path.of(uploadDirectory);

        Path file = Paths.get(path.toString()).resolve(fileName);

        Resource resource = new UrlResource(file.toUri());

        if (resource.exists() && resource.isReadable()) {
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"");

            return ResponseEntity.ok()
                    .headers(headers)
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .body(resource);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
