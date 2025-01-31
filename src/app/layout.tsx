import type { Metadata } from "next";
import "./Index.css";
import Header from "./(root)/_components/Header";

export const metadata: Metadata = {
  title: "Ballang",
  description: "Generated by create next app",
};

function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body className={"antialiased"}>
        <Header />
        {children}
      </body>
    </html>
  );
}

export default RootLayout;
