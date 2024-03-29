import AuthForm from "@/components/shared/AuthForm";
import Image from "next/image";
import React from "react";

export default function Index() {
  return (
    <main className="bg-gray-200 lg:px-40 pt-28 pb-14 md:pt-36">
      <div className="bg-white px-8 flex flex-col-reverse md:flex-row rounded-3xl md:justify-center lg:gap-52 md:px-16 lg:px-24">
        <div className="flex justify-center items-center md:w-96 lg:w-[500px]">
          <Image
            src="/login_image.jpg"
            alt="image-login-page"
            width={700}
            height={700}
            priority={true}
          />
        </div>
        <AuthForm />
      </div>
    </main>
  );
}