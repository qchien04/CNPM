package com.test;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.InputStream;
import java.io.RandomAccessFile;

@RestController
@RequestMapping("/videos")
public class VideoController {
    private int cnount=0;
    private final ResourceLoader resourceLoader;


    private final String videoDir = "C:/path/to/video/segments"; // Thư mục chứa các đoạn video .ts và .m3u8

    @GetMapping("/video/{fileName:.+}")
    public ResponseEntity<Resource> serveVideo(@PathVariable String fileName) {
        try {
            Resource video = resourceLoader.getResource("classpath:static/segments/"+fileName);
            if (video.exists()) {
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + video.getFilename() + "\"")
                        .body(video);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    public VideoController(ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;
    }

    @GetMapping("/stream1")
    public ResponseEntity<Resource> streamVideo(@RequestHeader(value = "Range", required = false) String range) throws IOException {
        Resource video = resourceLoader.getResource("classpath:static/sample-video.mp4");
        long contentLength = video.contentLength(); // Tổng độ dài video
        HttpHeaders headers = new HttpHeaders();

        long start = 0;
        long end = contentLength - 1; // Byte cuối cùng

        if (range != null) {
            // Phân tích phạm vi Range từ client
            HttpRange httpRange = HttpRange.parseRanges(range).get(0);
            start = httpRange.getRangeStart(contentLength);
            end = httpRange.getRangeEnd(contentLength);
        }

        // Thêm header Content-Range
        headers.add("Content-Range", "bytes " + start + "-" + end + "/" + contentLength);
        headers.add("Accept-Ranges", "bytes");
        headers.add("Content-Type", "video/mp4");
        headers.add("Content-Length", String.valueOf(end - start + 1));

        InputStream videoStream = video.getInputStream();
        videoStream.skip(start);

        return ResponseEntity.status(range != null ? 206 : 200) // Nếu có Range, trả về 206 Partial Content
                .headers(headers)
                .body(new InputStreamResource(videoStream));
    }


    @GetMapping("/stream/range1")
    public ResponseEntity<Resource> streamVideoRange(@RequestHeader(value = "Range", required = false) String range) throws IOException {
        cnount++;
        System.out.println(range);

        Resource resource = resourceLoader.getResource("classpath:static/sample-video.mp4");

        String contentType = "application/octet-stream";

        //file ki length
        long fileLength = resource.contentLength();


        long rangeStart;
        long rangeEnd;

        if (range == null) {
            rangeStart = 0;
        }
        else {
            String[] ranges = range.replace("bytes=", "").split("-");
            rangeStart = Long.parseLong(ranges[0]);
        }
        int CHUNK_SIZE=1024*1024;
        rangeEnd = rangeStart +CHUNK_SIZE - 1;

        if (rangeEnd >= fileLength) {
            rangeEnd = fileLength - 1;
        }
        System.out.println("range start : " + rangeStart);
        System.out.println("range end : " + rangeEnd);
        try {
            try (RandomAccessFile raf = new RandomAccessFile(resource.getFile(), "r")) {
                raf.seek(rangeStart);
                long contentLength = rangeEnd - rangeStart + 1;
                byte[] data = new byte[(int) contentLength];
                raf.readFully(data);

                HttpHeaders headers = new HttpHeaders();
                headers.add("Content-Range", "bytes " + rangeStart + "-" + rangeEnd + "/" + fileLength);
                headers.add("Cache-Control", "no-cache, no-store, must-revalidate");
                headers.add("Pragma", "no-cache");
                headers.add("Expires", "0");
                headers.add("X-Content-Type-Options", "nosniff");
                headers.setContentLength(contentLength);

                return ResponseEntity
                        .status(HttpStatus.PARTIAL_CONTENT)
                        .headers(headers)
                        .contentType(MediaType.parseMediaType(contentType))
                        .body(new ByteArrayResource(data));
            }


        } catch (IOException ex) {
            System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }



    }
}
