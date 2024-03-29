import Image from "next/image";
import { Inter } from "next/font/google";
import Main from "@/components/landing-page/Main";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen bg-gray-100 flex-col items-center${inter.className}`}
    >
      <Main/>
    </main>
  );
}
