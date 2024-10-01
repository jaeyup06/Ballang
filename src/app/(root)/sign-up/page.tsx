"use client";
import { logIn, signUp } from "@/api/auth.api";
import { useAuthStore } from "@/Zustand/auth.store";
import { useRouter } from "next/navigation";
import { useRef } from "react";

function SignUpPage() {
  const setCurrentUser = useAuthStore((state) => state.setCurrentUser);
  const router = useRouter();

  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);
  const confirmPasswordInputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = emailInputRef.current?.value;
    const password = passwordInputRef.current?.value;
    const confirmPassword = confirmPasswordInputRef.current?.value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailPattern.test(email)) {
      alert("올바른 이메일 형식을 입력해 주세요");
      return;
    }
    if (!password) {
      alert("비밀번호를 입력해 주세요");
      return;
    }
    if (!confirmPassword) {
      alert("비밀번호 확인을 입력해 주세요");
      return;
    }
    if (password !== confirmPassword) {
      alert("비밀번호와 비밀번호 확인이 다릅니다");
      return;
    }

    try {
      await signUp(email, password);
    } catch {
      alert("회원가입에 실패하였습니다");
      return;
    }
    alert("회원가입이 완료되었습니다.");
    await logIn(email, password);
    setCurrentUser({ email, password });
    router.push("/");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[400px] mt-[64px] m-auto bg-white p-5 rounded-lg"
    >
      <h1 className="text-center font-bold mt-16 mb-10 text-3xl">회원가입</h1>
      <h2 className="font-light mb-1">이메일</h2>
      <input
        type="text"
        className="block mb-4 p-3 border rounded w-[360px]"
        ref={emailInputRef}
        autoFocus
      />
      <h2 className="font-light mb-1">비밀번호</h2>
      <input
        type="password"
        className="block mb-4 p-3 border rounded w-full"
        ref={passwordInputRef}
      />
      <h2 className="font-light mb-1">비밀번호 확인</h2>
      <input
        type="password"
        className="block mb-10 p-3 border rounded w-full"
        ref={confirmPasswordInputRef}
      />
      <button className="bg-black mb-3 text-white font-bold py-4 w-full">
        회원가입하기
      </button>
    </form>
  );
}

export default SignUpPage;
