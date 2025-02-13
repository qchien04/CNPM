import { useState } from "react";
import axiosClient from "../../config/axiosconfig";
import { Button } from "antd";
import { PictureFilled } from '@ant-design/icons';


const UploadImage=()=>{
    const [selectedFile, setSelectedFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState("");

  // Xử lý chọn file
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Xử lý upload file
  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage("Vui lòng chọn file!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axiosClient.post("http://localhost:8080/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percent);
        },
      });

      setMessage(`Tải lên thành công: ${response.data}`);
    } catch (error) {
      setMessage("Lỗi khi tải lên!");
    }
  };


    return(
        <>
            <Button icon={<PictureFilled style={{ fontSize: 20 }} />} onClick={() => document.getElementById("upload-image")?.click()} />
            <input type="file" id="upload-image" style={{ display: "none" }} accept="image/*" />
        </>
    )
}