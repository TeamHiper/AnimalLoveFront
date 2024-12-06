'use client'
import Categories from "@/components/categories/Categories";
import Container from "@/components/Container";
import EmptyPosts from "@/components/EmptyPosts";
import FloatingButton from "@/components/FloatingButton";
import PostCard from "@/components/posts/PostCard";
import Image from "next/image";
import React, {useState,useEffect} from 'react';
import getPostList from "../actions/getPosts";
import EmptyState from "@/components/EmptyState";

export default function Home() {

  const [posts, setPosts] = useState<any[]>([]);

  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = {
          page : 0,
          size : 10
      }
        setIsLoading(true);
        const postsData = await Promise.all([getPostList(queryParams)]);
    
        setPosts(postsData);
        setCurrentUser(0);
        setIsLoading(false); // 로딩 상태 해제

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // 컴포넌트가 렌더링된 후 비동기 작업 실행
  }, []); 

  return (
    <Container>

      {/* 카테고리 */}
      {<Categories />}
      
      {(!posts || posts.length === 0 ) 
        ?<EmptyPosts showReset/>
      :
      <>
        <div className='grid grid-cols-1 gap-8 pt-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {posts.map((post:any) =>(       
          <PostCard
            key={1}
            data={post}
          />
          ))}
        </div>
      </>
      }

      <FloatingButton
        href="/posts/upload"
      >+</FloatingButton>
    </Container>
  );
}
