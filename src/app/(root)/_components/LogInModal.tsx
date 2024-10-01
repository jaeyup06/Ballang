"use client";

import { useState } from "react";
import LogInForm from "./LogInForm";

type LogInModalProps = {
  className: string;
  title: string;
};

function LogInModal({ className, title }: LogInModalProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className={`${className}`} onClick={() => setShowModal(true)}>
        {title}
      </button>
      {showModal && (
        <main
          onClick={() => setShowModal(false)}
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-10"
        >
          <LogInForm isLogInCompletion={() => setShowModal(false)} />
        </main>
      )}
    </>
  );
}

export default LogInModal;
