import { logIn } from "@/api/auth.api";
import { useRef } from "react";

type LogInFormProps = {
  isLogInCompletion: (isSuccess: boolean) => void;
};

function LogInForm({ isLogInCompletion }: LogInFormProps) {
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = emailInputRef.current?.value;
    const password = passwordInputRef.current?.value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailPattern.test(email)) {
      alert("올바른 이메일 형식을 입력해 주세요");
      return;
    }
    if (!password) {
      alert("비밀번호를 입력해 주세요");
      return;
    }

    try {
      await logIn(email, password);
    } catch {
      alert("로그인에 실패하였습니다");
      return;
    }
    isLogInCompletion(true);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-5 rounded-lg"
      onClick={(e) => e.stopPropagation()}
    >
      <h1 className="text-center font-bold mt-16 mb-10 text-3xl">로그인</h1>
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
        className="block mb-10 p-3 border rounded w-full"
        ref={passwordInputRef}
      />
      <button className="bg-black mb-3 text-white font-bold py-4 w-full">
        로그인하기
      </button>
    </form>
  );
}

export default LogInForm;
