package com.service;

import java.io.IOException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


@Service
public interface UpLoadImageFileService {
    String uploadImage(MultipartFile file) throws IOException;
}
