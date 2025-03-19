import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";
import getComments from "@/app/actions/getComments";
import Swal from "sweetalert2";
import EmojiPicker from "emoji-picker-react";
import { FaSmile } from "react-icons/fa";

interface User {
  name: string;
  profileImageUrl: string | null;
}

interface Comment {
  commentId: number;
  content: string;
  post: {
    user: User;
  }
}

interface CommentSectionProps {
  postId: number;
}

interface CommentForm {
  comment: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {

  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedParentId, setSelectedParentId] = useState<number | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // 이모티콘 선택 시 실행되는 함수
  const handleEmojiClick = (emojiObject: any) => {
    const currentValue = getValues("comment") || ""; // 현재 입력값 가져오기
    setValue("comment", currentValue + emojiObject.emoji)
    setShowEmojiPicker(false); // 선택 후 이모티콘 창 닫기
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<CommentForm>();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await getComments({ postId });
        setComments(response.data);
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      }
    };

    fetchComments();
  }, [postId]);

  const onSubmit: SubmitHandler<CommentForm> = async (data) => {
    try {
      const requestBody = {
        commentId: null,
        content: data.comment,
        parentId: selectedParentId, // 대댓글이면 부모 ID 포함
        post: {
          postId,
        },
      };
      const accessToken = sessionStorage.getItem("accessToken");

      //로그인 체크
      if (!accessToken) {
        Swal.fire({
          icon: "warning",
          title: "로그인이 필요합니다!",
          text: "댓글을 작성하려면 먼저 로그인하세요.",
        });
        return;
      }

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/comment/register`,
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${accessToken}`
          },
          withCredentials: true
        }
      );

      setComments([...comments, response.data]);
      reset();
      setSelectedParentId(null);
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  return (
    <div className="mt-6 p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-lg font-semibold">댓글</h2>

      <div className="mt-4">
        {comments.length === 0 ? (
          <p className="text-gray-500">첫 댓글을 남겨보세요!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.commentId} className="border-b py-2 flex items-center gap-2">
              {comment.post.user.profileImageUrl && (
                <Image
                  src={comment.post.user.profileImageUrl}
                  alt={comment.post.user.name}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
              )}
              <div>
                <p className="font-semibold">{comment.post.user.name}</p>
                <p>{comment.content}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 댓글 입력 폼 */}
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 flex gap-2 relative">
        <input
          {...register("comment", { required: "댓글을 입력해주세요." })}
          placeholder="댓글을 입력하세요..."
          className="w-full p-2 border rounded-md focus:outline-none"
        />
        {/* 이모티콘 버튼 */}
        <button
          type="button"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="absolute bottom-3 right-12 text-gray-500 hover:text-gray-700"
        >
          <FaSmile size={24} />
        </button>

        {/* 이모티콘 선택기 (버튼 클릭 시 나타남) */}
        {showEmojiPicker && (
          <div className="absolute bottom-12 right-0">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}

                {/* 댓글 등록 버튼 */}
                <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          등록
        </button>
      </form>

      {/* 오류 메시지 표시 */}
      {errors.comment && (
        <p className="text-red-500 text-sm mt-2">{errors.comment.message}</p>
      )}
    </div>
  );
};

export default CommentSection;
