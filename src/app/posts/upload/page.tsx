'use client'
import Button from '@/components/Button';
import Container from '@/components/Container';
import Heading from '@/components/Heading';
import ImageUpload from '@/components/ImageUpload';
import Input from '@/components/Input';
import { categories } from '@/components/categories/Categories';
import CategoryInput from '@/components/categories/CategoryInput';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

import React, {useEffect, useState} from 'react';
import { FieldPathValues, FieldValues, SubmitHandler, useForm } from 'react-hook-form';

const PostUploadPage = () => {

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    // 이미지 URL과 publicId를 저장할 상태 추가
    const [imageUrl, setImageUrl] = useState<string>('');
    const [publicId, setPublicId] = useState<string>('');

    // 하위 컴포넌트에서 완료된 데이터를 전달받는 함수
    const handleUploadComplete = async (data: { url: string; publicId: string }) => {
      setImageUrl(data.url);
      setPublicId(data.publicId);
    }

    const {register, 
        handleSubmit,
        setValue,
        watch,
        formState: {errors},
        reset} = useForm<FieldValues>({
        defaultValues: {
            content: '',
            imageSrc: '',
            userId:''
        }
    })

    const imageSrc = watch('imageSrc');

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        // 두 개의 DTO 구조에 맞는 데이터 준비
        const requestData = {
            ...data, // postDto 해당하는 데이터

        };

        axios.post(`http://localhost:8080/api/v1/post/register`, requestData, {
            params: {
                url: imageUrl,
                publicId: publicId,
                userId: 1
            },
            headers: {
                'Content-Type': 'application/json',
            }
        }
        )
        .then(response => {

        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            setIsLoading(false);
            window.location.href =`http://localhost:3000`;
        })
    }

      // 상태 업데이트 확인
  useEffect(() => {
    if (imageUrl) {
      console.log("Updated imageUrl: ", imageUrl);
    }
    if (publicId) {
      console.log("Updated publicId: ", publicId);
    }
  }, [imageUrl, publicId]);

  return (
    <Container>
    <div className='max-w-screen-lg mx-auto'>
        <form className='flex flex-col gap-8'
                onSubmit={handleSubmit(onSubmit)}>
            <Heading
                title="게시물 등록"
                subtitle = "새 게시물 만들기"
            />

            {/* Image Upload Component */}
            <ImageUpload 
                onChange={handleUploadComplete}
            />

            <Input
                id="content"
                label='Content'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <hr/>
            <Button label='공유하기'></Button>    
        </form>
        
    </div>
    </Container>
  )
}


export default PostUploadPage