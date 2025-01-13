"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Categories from "@/components/categories/Categories";

const OAuth2RedirectHandler = () => {
  const router = useRouter();

  useEffect(() => {
    // URL에서 Access Token 추출
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("accessToken");

    if (accessToken) {
      // Access Token을 sessionStorage에 저장
      sessionStorage.setItem("accessToken", accessToken);

      
      console.log("accessToken :", sessionStorage.getItem("accessToken"));
      sessionStorage.getItem("accessToken");

      // 대시보드로 이동
      window.location.href = "/";
    } else {
      console.error("Access Token이 없습니다.");
      window.location.href = "/"; // 로그인 페이지로 리다이렉트
    }
  }, [router]);

  return 
  <div>Redirecting...</div>;
};

export default OAuth2RedirectHandler;
