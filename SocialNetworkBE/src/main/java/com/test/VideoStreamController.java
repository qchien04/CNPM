package com.test;

import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpRange;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

@RestController
public class VideoStreamController {

    private final ResourceLoader resourceLoader;

    public VideoStreamController(ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;
    }

    @GetMapping("/video")
    public ResponseEntity<byte[]> streamVideo(@RequestHeader(value = "Range", required = false) String range) throws IOException {
        Resource videoResource = resourceLoader.getResource("classpath:static/sample.mp4");
        Path videoPath = videoResource.getFile().toPath();

        byte[] videoData = Files.readAllBytes(videoPath);
        long videoLength = videoData.length;

        if (range == null) {
            // Trả về toàn bộ video nếu không có Range header
            return ResponseEntity.status(HttpStatus.OK)
                    .header(HttpHeaders.CONTENT_TYPE, "video/mp4")
                    .header(HttpHeaders.CONTENT_LENGTH, String.valueOf(videoLength))
                    .body(videoData);
        } else {
            // Xử lý video streaming dựa trên Range header
            HttpRange httpRange = HttpRange.parseRanges(range).get(0);
            long start = httpRange.getRangeStart(videoLength);
            long end = httpRange.getRangeEnd(videoLength);
            byte[] partialData = new byte[(int) (end - start + 1)];
            System.arraycopy(videoData, (int) start, partialData, 0, partialData.length);

            return ResponseEntity.status(HttpStatus.PARTIAL_CONTENT)
                    .header(HttpHeaders.CONTENT_TYPE, "video/mp4")
                    .header(HttpHeaders.CONTENT_RANGE, "bytes " + start + "-" + end + "/" + videoLength)
                    .header(HttpHeaders.CONTENT_LENGTH, String.valueOf(partialData.length))
                    .body(partialData);
        }
    }
}

