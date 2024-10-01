"use client";

import Link from "next/link";
import LogInModal from "./LogInModal";
import { useAuthStore } from "@/Zustand/auth.store";
import { logOut } from "@/api/auth.api";

function Header() {
  const { currentUser, setCurrentUser } = useAuthStore();
  const clearUserEmailStorage = useAuthStore.persist.clearStorage;

  const handleClickLogOut = async () => {
    await logOut();
    setCurrentUser(null);
    clearUserEmailStorage();
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 border-b flex justify-between items-center px-7 font-light bg-white z-10">
      <div className="flex items-center gap-20">
        <Link href={"/"} className="text-2xl font-bold">
          발랑
        </Link>
        <Link href={"/brands"}>BRANDS</Link>
      </div>
      {!!currentUser?.email ? (
        <div className="flex gap-5">
          <Link href={"/cart"}>장바구니</Link>
          <button onClick={handleClickLogOut}>로그아웃</button>
        </div>
      ) : (
        <div className="flex gap-5">
          <Link href={"/sign-up"}>회원가입</Link>
          <LogInModal className="" title="로그인" />
        </div>
      )}
    </header>
  );
}

export default Header;
