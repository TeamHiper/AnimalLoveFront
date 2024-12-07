
import Categories from "@/components/categories/Categories";
import Container from "@/components/Container";
import EmptyPosts from "@/components/EmptyPosts";
import FloatingButton from "@/components/FloatingButton";
import PostCard from "@/components/posts/PostCard";
import Image from "next/image";
import React, {useState,useEffect} from 'react';
import getPostList from "../actions/getPosts";
import EmptyState from "@/components/EmptyState";

export default async function Home() {

        const queryParams = {
          page : 0,
          size : 10
      }
        const posts = await getPostList(queryParams);
   
        posts?.data.map((post:any) => console.log(post.postId));

    interface PostCardProps {
      data: {
          postId: number;
          content: string;
          user: {
              email: string;
              name: string;
              profileImage: string | null;
              role: string;
              userId: number;
              username: string;
          };
          imageUrls: string[];
      };
  }
  return (
    <Container>

      {/* 카테고리 */}
      {<Categories />}
      
      {(!posts || posts?.data.length === 0 ) 
        ?<EmptyPosts showReset/>
      :
      <>
        <div className='grid grid-cols-1 gap-8 pt-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {posts?.data.map((post:any) =>(  
           <PostCard
             key={post.postId}
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
