function SignUpPage() {
  return (
    <form
      className="w-[400px] m-auto bg-white p-5 rounded-lg"
    >
      <h1 className="text-center font-bold mt-16 mb-10 text-3xl">회원가입</h1>
      <h2 className="font-light mb-1">이메일</h2>
      <input
        type="text"
        className="block mb-4 p-3 border rounded w-[360px]"
        autoFocus
      />
      <h2 className="font-light mb-1">비밀번호</h2>
      <input
        type="password"
        className="block mb-4 p-3 border rounded w-full"
      />
      <h2 className="font-light mb-1">비밀번호 확인</h2>
      <input
        type="password"
        className="block mb-10 p-3 border rounded w-full"
      />
      <button className="bg-black mb-3 text-white font-bold py-4 w-full">
        로그인하기
      </button>
    </form>
  );
}

export default SignUpPage;
