import React, { useEffect, useRef ,useState } from 'react';
import Image from 'next/image';
import { TbPhotoPlus } from 'react-icons/tb';
import axios from 'axios';

interface ImageUploadProps {
  onChange: (data: { url: string; publicId: string }) => void;
}

const ImageUpload = ({onChange }: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {

      // 만약 이 단계에서 파일을 직접 백엔드로 전송하고 싶다면, 아래 코드를 사용해 이미지 URL을 가져올 수 있습니다.
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post('http://localhost:8080/api/v1/image/upload',formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        });

        if (response) {
          //const data = await response.json();
          console.log("response.data.url : "+response.data.url);
    
          const { url, publicId } = response.data;
          onChange({ url, publicId });
          setImageUrl(url);

        } else {
          console.error('Failed to upload image');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      onClick={handleClick}
      className="relative flex flex-col items-center justify-center gap-4 p-20 transition border-2 border-dashed cursor-pointer hover:opacity-70 border-neutral-300 text-neutral-300"
    >
      <TbPhotoPlus size={50} />
      {imageUrl && (
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={imageUrl}
            alt="Uploaded Image"
            layout="fill"
            style={{ objectFit: 'cover' }}
          />
        </div>
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
