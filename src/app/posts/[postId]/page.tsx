'use client'
import getCurrentUser from '@/app/actions/getCurrentUser';
import getPost from '@/app/actions/getPost';
import getPostList, { PostsParams } from '@/app/actions/getPosts';
import Container from '@/components/Container'
import EmptyPosts from '@/components/EmptyPosts';
import Pagination from '@/components/Pagination';
import DetailPost, { DetailPostProps } from '@/components/posts/DetailPost'
import PostCard from '@/components/posts/PostCard';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
interface PostPageProps {
  params: {
    postId: string; // 동적 라우팅 변수
  };
}

const PostPage = ({ params }:PostPageProps) => {
  const [post, setPost] = useState(null);
  const [currentUser, setCurrentUser] = useState();

  const searchParams = useSearchParams();
  const { postId } = params;
  let posts

  useEffect(() => {
    const fetchPost = async () => {

      if (!postId) {
        console.warn("Invalid postId: postId is null");
        return;
      }

      const response = await getPost({ postId: Number(postId) });
      console.log(response.data);

        const accessToken = sessionStorage.getItem("accessToken"); // 세션 스토리지에서 토큰 가져오기
        if (accessToken) {
          const user = await getCurrentUser({accessToken}); // 서버 함수 호출
          setCurrentUser(user?.data); // 사용자 상태 업데이트
        }

      posts = await getPostList(searchParams);

      if (response.data) {
        setPost(response.data); // data 객체를 상태로 설정
      }
    };

    fetchPost();
  }, [postId]);
  

  return (
    <Container>
        {post && (
        <DetailPost
            currentUser={currentUser || null}
            data={post}
        />
        )}
    </Container>
  )
}

export default PostPage;