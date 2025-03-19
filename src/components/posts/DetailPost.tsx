import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { TiArrowLeftOutline } from "react-icons/ti";
import { IoMdDownload } from "react-icons/io";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import HeartButton from '../HeartButton';
import { FaExpandAlt } from "react-icons/fa";
import Modal from '../Modal';
import CommentSection from '../Comment';

export interface DetailPostProps {
  currentUser: {
    username: string,
    email: string,
    profileImageUrl: string | null,
    role: string,
    name: string
  }| null;

  data: {
    postId: number;
    imageUrls: string[];
    content: string;
    user: {
      email: string;
      name: string;
      profileImageUrl: string | null;
    }

  }
}

const DetailPost = ({ currentUser, data }: DetailPostProps) => {
  const router = useRouter();
  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.back(); // 브라우저 히스토리에서 뒤로 이동
    } else {
      router.push('/'); // 이전 페이지가 없으면 홈으로 이동
    }
  };

  const [likeCount, setLikeCount] = useState<number>(0); // 좋아요 수 상태

  // 서버에서 좋아요 수 가져오기
  useEffect(() => {
    const fetchLikeCount = async () => {
      try {
        const postId = data.postId;
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/like/count`, {
          params: { postId }, // postId를 서버로 전달
        });
        setLikeCount(response.data); // 서버에서 받은 좋아요 수 설정
      } catch (error) {
        console.error("Failed to fetch like count:", error);
      }
    };

    fetchLikeCount();
  }, []);

  // 이미지 다운
  const handleDownload = async () => {
    try {
      const response = await fetch(data.imageUrls[0]); // 이미지 데이터를 가져오기
      const blob = await response.blob(); // Blob(Binary Large Object) 생성
      const url = window.URL.createObjectURL(blob); // Blob URL 생성

      const link = document.createElement('a'); // <a> 태그 생성
      link.href = url; // Blob URL 설정
      link.download = 'image.jpg'; // 저장될 파일 이름 설정
      link.click(); // 다운로드 트리거

      window.URL.revokeObjectURL(url); // 메모리 해제
    } catch (error) {
      console.error('Failed to download image:', error);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  // 모달 열기
  const openModal = () => setIsModalOpen(true);

  // 모달 닫기
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="container p-4 max-w-6xl">
      {/* 메인 레이아웃 */}
      <div className="flex flex-col lg:flex-row gap-0 overflow-hidden border border-gray-300 rounded-3xl">
        {/* 왼쪽: 큰 이미지 */}
        <div className="relative bg-gray-200 w-full max-w-4xl rounded-lg shadow-md overflow-hidden h-[1000px]">
          <Image
            src={data.imageUrls?.[0] || ''}
            fill
            sizes='auto'
            className='object-contain w-full h-full'
            alt="post"
          />
        <button
          onClick={openModal}
          className="absolute bottom-2 right-2 bg-gray-800 text-white p-2 rounded-full"
        >
          <FaExpandAlt size={20} />
        </button>

{/* 모달 */}
{isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={closeModal} // 모달 배경 클릭 시 닫기
        >
          <div className="relative">
            {/* ESC 키로 모달 닫기 */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white text-2xl hover:bg-gray-600 cursor-pointer"
            >
              ✖
            </button>
            {/* 확대된 이미지 */}
            <Image
              src={data.imageUrls?.[0] || ''}
              alt="post"
              width={1200}
              height={800}
              className="object-contain max-w-full max-h-[90vh]"
            />
          </div>
        </div>
      )}

        </div>

        {/* 오른쪽: Content, 작성자 정보, 댓글 */}
        <div className="w-full lg:w-2/3 flex flex-col gap-6 p-0">
          {/*closeupActionBar */}
          <div className="relative top-0 left-0 w-full bg-white shadow-md px-4 py-4 flex justify-between items-center">
            {/* 좌측: 뒤로 가기 버튼 */}
            <button className="cursor-pointer text-gray-600 hover:text-black flex items-center gap-2"
              onClick={handleGoBack}>
              <TiArrowLeftOutline size={30} />
            </button>
            {/* 우측: 공유 및 좋아요 버튼 */}
            <div className="flex items-center gap-4 pl-4 cursor-pointer">
              {/* 좋아요 버튼 */}
              {currentUser?
              <div className='flex top-3 right-3'>
                <HeartButton
                  currentUser={currentUser}
                  postId={data.postId}
                />
              </div>
              :
              ""
              }
              <div>
                {likeCount}
              </div>
              {/* 이미지 다운로드 */}
              <div onClick={handleDownload} className="text-gray-600 hover:text-black flex items-center gap-2">
                <button>
                  <IoMdDownload size={30} />
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <h1 className="text-3xl font-bold ml-5">{data.content}</h1>
          {/* 작성자 정보 */}
          <div className="flex items-center gap-4 ml-5">
            <Image
              src={data.user.profileImageUrl || ''}
              alt={data.user.name}
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
            <p className="text-lg font-semibold">{data.user.name}</p>

          </div>
          {/* 댓글 */}
          <div>
           <CommentSection
           postId={data.postId}
           />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailPost