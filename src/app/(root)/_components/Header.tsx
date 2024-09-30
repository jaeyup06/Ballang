"use client";

import Link from "next/link";
import { useState } from "react";
import LogInModal from "./LogInModal";

function Header() {
  const [isLogInModalOpen, setIsLogInModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      {isLogInModalOpen && <LogInModal onClose={() => setIsLogInModalOpen(false)} />}
      <header className="h-16 border-b flex justify-between items-center px-7 font-light">
        <div className="flex items-center gap-20">
          <Link href={"/"} className="text-2xl font-bold">
            발랑
          </Link>
          <Link href={"/brands"}>BRANDS</Link>
        </div>
        {isLoggedIn ? (
          <div className="flex gap-5">
            <Link href={"/cart"}>장바구니</Link>
            <button onClick={() => setIsLoggedIn(!isLoggedIn)}>로그아웃</button>
          </div>
        ) : (
          <div className="flex gap-5">
            <Link href={"/sign-up"}>회원가입</Link>
            <button onClick={() => setIsLogInModalOpen(true)}>
              로그인
            </button>
          </div>
        )}
      </header>
    </>
  );
}

export default Header;
