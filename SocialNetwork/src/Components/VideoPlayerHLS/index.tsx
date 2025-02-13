import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

const VideoPlayerHLS: React.FC = () => {
  // Khai báo ref với kiểu HTMLVideoElement
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoUrl, setVideoUrl] = useState<string>('');

  // Effect này được dùng để thiết lập URL cho video từ API của Spring Boot
  useEffect(() => {
    setVideoUrl('http://localhost:8080/videos/video/playlist.m3u8');
  }, []);

  useEffect(() => {
    // Nếu videoUrl chưa được set thì không thực hiện gì
    if (!videoUrl) return;

    const videoElement = videoRef.current;
    if (!videoElement) return;

    // Nếu trình duyệt hỗ trợ Hls.js
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videoUrl);
      hls.attachMedia(videoElement);

      // Cleanup HLS instance khi component unmount
      return () => {
        hls.destroy();
      };
    } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
      // Nếu trình duyệt hỗ trợ HLS natively (ví dụ Safari)
      videoElement.src = videoUrl;
    }
  }, [videoUrl]);

  return (
    <div>
      <video ref={videoRef} controls width="600"></video>
    </div>
  );
};

export default VideoPlayerHLS;
