package com.grodastr.clarityzip.compressed.photo.service.impl;

import com.grodastr.clarityzip.compressed.photo.service.PhotoService;
import org.apache.tika.Tika;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.IIOImage;
import javax.imageio.ImageIO;
import javax.imageio.ImageWriteParam;
import javax.imageio.ImageWriter;
import javax.imageio.plugins.jpeg.JPEGImageWriteParam;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class PhotoServiceIml implements PhotoService {

    @Override
    public String uploadCompressedPhoto(MultipartFile image) {
        //        TODO: Удалить C:/, когда надо пушить на серевер
        String uploadDirectory = "C:/" + File.separator + "temp";
        Path path = Path.of(uploadDirectory);

        try {

            BufferedImage originalImage = ImageIO.read(image.getInputStream());

            BufferedImage compressedImage = compressImage(originalImage, 0.0f);

            String originalFileName = image.getOriginalFilename();
            String uniqueFileName = UUID.randomUUID() + "_" + originalFileName;
            File compressedImageFile = new File(path.toString(), uniqueFileName);

            ImageIO.write(compressedImage, "jpg", compressedImageFile);

            return "/uploads/" + uniqueFileName;
        } catch (IOException e) {
            throw new RuntimeException("Error uploading image", e);
        }
    }

    private BufferedImage compressImage(BufferedImage originalImage, float compressionQuality) {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();

        ImageWriter imageWriter = ImageIO.getImageWritersByFormatName("jpeg").next();
        ImageWriteParam imageWriteParam = new JPEGImageWriteParam(null);
        imageWriteParam.setCompressionMode(ImageWriteParam.MODE_EXPLICIT);
        imageWriteParam.setCompressionQuality(compressionQuality);

        try {
            imageWriter.setOutput(ImageIO.createImageOutputStream(byteArrayOutputStream));
            imageWriter.write(null, new IIOImage(originalImage, null, null), imageWriteParam);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            imageWriter.dispose();
        }


        return originalImage;
    }

    @Override
    public Resource getPhotoResource(String fileName) throws IOException {
        //        TODO: Удалить C:/, когда надо пушить на серевер
        String uploadDirectory = "C:/" + File.separator + "temp";
        Path path = Path.of(uploadDirectory);

        Path file = Paths.get(path.toString()).resolve(fileName);
        Resource resource = new UrlResource(file.toUri());

        if (resource.exists() && resource.isReadable()) {
            return resource;
        } else {
            throw new FileNotFoundException("File not found or not readable: " + fileName);
        }
    }
}
