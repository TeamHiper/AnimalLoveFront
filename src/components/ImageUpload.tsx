import React, { useEffect, useRef ,useState, useCallback } from 'react';
import Image from 'next/image';
import { TbPhotoPlus } from 'react-icons/tb';
import axios from 'axios';
import { useDropzone } from "react-dropzone";
import Swal from "sweetalert2";

interface ImageUploadProps {
  onChange: (data: { url: string; publicId: string }) => void;
}

const ImageUpload = ({onChange }: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadFile(file);
    }
  }

  const uploadFile = async (file: File) => {
    setLoading(true);
    if (!file) {
      Swal.fire({
        icon: "warning",
        title: "파일이 없습니다!",
        text: "업로드할 파일을 선택하거나 드래그하세요.",
      });
      return;
    }

      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/image/upload`,formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        });

        if (response) {
          console.log("response.data.url : "+response.data.url);
    
          const { url, publicId } = response.data;
          onChange({ url, publicId });
          setImageUrl(url);

        } else {
          console.error('Failed to upload image');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }finally{
        setLoading(false);
      }
    
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

    // 드래그 앤 드롭 기능 추가
    const onDrop = useCallback((acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        uploadFile(acceptedFiles[0]);
      }
    }, []);
  
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      accept: { "image/*": [] },
    });

  return (
    <div
    {...getRootProps()}
    className={`relative flex flex-col items-center justify-center gap-4 p-20 transition border-2 border-dashed cursor-pointer hover:opacity-70 ${
      isDragActive ? "border-blue-500" : "border-neutral-300"
    } text-neutral-500`}
    onClick={() => fileInputRef.current?.click()} // 클릭 시 파일 업로드 실행
  >{loading ? (
    <p className="text-blue-500">업로드 중...</p>
  ) : imageUrl ? (
    <div className="absolute inset-0 w-full h-full">
      <Image
        src={imageUrl}
        alt="Uploaded Image"
        layout="fill"
        style={{ objectFit: "cover" }}
      />
    </div>
  ) : (
    <>
      <TbPhotoPlus size={50} />
      <p>이미지를 드래그하거나 클릭하여 업로드하세요</p>
    </>
  )}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }} // 파일 입력 필드는 숨김 처리
      />
    </div>
  );
};

export default ImageUpload;
