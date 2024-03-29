import React, { useEffect, useState } from "react";
import ListMenu from "./list-menu";
import AccountInfo from "./account-info";
import { useRouter } from "next/router";
import ChangePassword from "./change-password";
import MyAddressComp from "./myAddress";
import OrderListComp from "./order-list";
import useAuthStore from "@/stores/auth";
import useLocalStorageStore from "./userStore";
import Address from "./address";
import ReviewProdukComp from "../review-produk/insert";

const MainSection = () => {
  const path = useRouter().pathname;
  const { user, logout } = useAuthStore();
  const { getAllItems } = useLocalStorageStore();
  const [name, setName] = useState("");
  const [foto_profile, setPhoto_profile] = useState("");

  useEffect(() => {
    const storedItems = getAllItems();
    if (storedItems.length > 0) {
      setName(storedItems[0].name);
      setPhoto_profile(storedItems[0].photo);
    }
  }, []);

  return (
    <div className="rounded-[10px] lg:flex lg:flex-row md:flex md:flex-row p-[29.9px_31px_30px_30px] w-[fit-content] box-sizing-border mt-[80px]">
      <div className="rounded-[10px]  m-[0.1px_78px_0_0] flex flex-col p-[20px_20px_30px_20px] box-sizing-border">
        <div className="rounded-[10px] m-[0_0_16.5px_0] flex flex-row justify-center w-[214.5px] h-[220px] box-sizing-border border">
          <img
            src={`${
              foto_profile == null
                ? "/assets/user/images/user.png"
                : foto_profile
            }`}
            alt="profile"
            className="dark:invert w-full h-auto"
            loading="lazy"
          />
        </div>
        <div className="m-[0_0_19px_0] inline-block self-start break-words font-['Inter'] font-bold text-[20px] leading-[1.2] text-[#000000]">
          {name ? name : "User tidak ditemukan"}
        </div>
        <div className="m-[0_0_27.5px_0] inline-block self-start break-words font-['Inter'] font-normal text-[14px] leading-[2] text-[#666666]">
          {user ? user.email : "User tidak ditemukan"}
        </div>

        <ListMenu />
      </div>

      {path == "/user/change-password" ? (
        <ChangePassword />
      ) : path == "/user/display" ? (
        <AccountInfo />
      ) : path == "/user/my-address" ? (
        <MyAddressComp />
      ) : path == "/user/insert-address" ? (
        <Address />
      ) : path == "/user/order-list" ? (
        <OrderListComp />
      ) : (
        <Address />
      )}
    </div>
  );
};

export default MainSection;
