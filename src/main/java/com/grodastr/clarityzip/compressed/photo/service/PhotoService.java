package com.grodastr.clarityzip.compressed.photo.service;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface PhotoService {
    String uploadCompressedPhoto(MultipartFile image);

    Resource getPhotoResource(String fileName) throws IOException;
}
