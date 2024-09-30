"useClient";

import { useState } from "react";

function LogInModal() {
  const [closeModal, setCloseModal] = useState(false);
  return (
    <>
      {!closeModal && (
        <section
          onClick={() => setCloseModal(true)}
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50"
        >
          <form
            className="bg-white p-5 rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h1 className="text-center font-bold mt-16 mb-10 text-3xl">로그인</h1>
            <h2 className="font-light mb-1">이메일</h2>
            <input
              type="text"
              className="block mb-4 p-3 border rounded w-[360px]"
              autoFocus
            />
            <h2 className="font-light mb-1">비밀번호</h2>
            <input
              type="password"
              className="block mb-10 p-3 border rounded w-full"
            />
            <button className="bg-black mb-3 text-white font-bold py-4 w-full">로그인하기</button>
          </form>
        </section>
      )}
    </>
  );
}

export default LogInModal;
