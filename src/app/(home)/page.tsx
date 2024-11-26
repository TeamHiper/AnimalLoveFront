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

  const [posts, setPosts] = useState<any>(0);

  const [currentUser, setCurrentUser] = useState<any>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = {
          page : 0,
          size : 10
      }
        const postsData = await Promise.all([getPostList(queryParams)]);
        setPosts(postsData);
        setCurrentUser(0);
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

      {(!posts || !posts.data || posts.data === 0 ) 
        ?<EmptyPosts showReset/>
      :
      <>
        <div className='grid grid-cols-1 gap-8 pt-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {posts.data.map((post:any) =>(       
          <PostCard
            key={post.id}
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
