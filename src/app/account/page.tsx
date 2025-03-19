'use client';

import { useState, useEffect, useRef } from 'react';
import getCurrentUser from '../actions/getCurrentUser';
import Button from '@/components/Button';
import Image from 'next/image';
import axios from 'axios';

interface AccountPageProps {
  data: {
    user: {
      email: string;
      name: string;
      profileImage: string;
      role: string;
      userId: number;
      username: string;
      useYn: string;
    };
  };
}

const AccountPage = ({ data }: AccountPageProps) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewImage, setPreviewImage] = useState<string>(currentUser?.profileImage || null);

  const accessToken = sessionStorage.getItem("accessToken"); // 세션 스토리지에서 토큰 가져오기

  useEffect(() => {
    const fetchUser = async () => {
      if (accessToken) {
        const user = await getCurrentUser({ accessToken }); // 서버 함수 호출
        setCurrentUser(user?.data); // 사용자 상태 업데이트
        setPreviewImage(user?.data?.profileImageUrl || null);
      }

    };

    fetchUser();
  }, []);

  // 파일 선택 창 열기
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // 이미지 업로드 처리
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // 미리보기 URL 생성
      setPreviewImage(imageUrl);

      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post('http://localhost:8080/api/v1/image/upload/profile', formData, {
          headers: {
            Authorization: `${accessToken}`,
            'Content-Type': 'multipart/form-data'
          }
          ,
          withCredentials: true
        });

        if (response) {
          // UI 업데이트
          setCurrentUser((prev: any) => ({
            ...prev,
            profileImageUrl: response.data.url,
          }));

          console.log("response.data.url : " + response.data.url);

          setPreviewImage(response.data.url);
          setTimeout(() => {
            window.location.reload();
          }, 500);

        } else {
          console.error('Failed to upload image');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
      <h2 className="text-xl font-bold mb-4">계정 관리</h2>
      {currentUser && (
        <div className="space-y-4">
          <div>
            <label className="block font-medium">이름</label>
            <p className="p-2 border rounded">{currentUser?.name}</p>
          </div>
          <div>
            <label className="block font-medium">이메일</label>
            <p className="p-2 border rounded">{currentUser?.email}</p>
          </div>
          <div>
            <label className="block font-medium">프로필 이미지</label>
            {currentUser?.profileImageUrl && (
              <div className="flex flex-col items-start gap-2">
                <Image
                  src={previewImage}
                  alt="Profile Image"
                  width={100}
                  height={100}
                  className="rounded-full"
                />

                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />

                <Button
                  label="프로필 변경"
                  onClick={handleUploadClick}
                  small
                  outline
                />
              </div>
            )}
          </div>
          <div className="flex items-center justify-between">
            <label className="block font-medium">프로필 공개</label>
            <p className="p-2 border rounded">{currentUser?.useYn ? "공개" : "비공개"}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountPage;
