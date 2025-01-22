
import Categories from "@/components/categories/Categories";
import Container from "@/components/Container";
import EmptyPosts from "@/components/EmptyPosts";
import FloatingButton from "@/components/FloatingButton";
import PostCard from "@/components/posts/PostCard";
import Image from "next/image";
import React, {useState,useEffect} from 'react';
import getPostList, { PostsParams } from "../actions/getPosts";
import EmptyState from "@/components/EmptyState";
import Pagination from "@/components/Pagination";

interface HomeProps{
  searchParams: PostsParams
}

export default async function Home({searchParams}: HomeProps) {

      const page = searchParams?.page;
      const pageNum = typeof page === 'string' ? Number(page): 1;
      
      console.log('searchParams.page : '+searchParams.page);
        const posts = await getPostList(searchParams);
        console.log("posts?.totalPage : "+posts?.totalPage);

  return (
    <Container>

      {/* 카테고리 */}
      {<Categories />}
      
      {(!posts || posts?.data.length === 0 ) 
        ?<EmptyPosts showReset/>
      :
      <>
        <div className='grid grid-cols-1 gap-8 pt-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {posts?.data?.map((post:any) =>(  
           <PostCard
             key={post.postId}
             data={post}
           />
          ))}
        </div>
      </>
      }
      <Pagination
        page={pageNum} totalItems={Number(posts?.totalPage)} size={5}
      >
      </Pagination>
      
    </Container>
  );
}
