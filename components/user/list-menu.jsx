import Link from "next/link";
import symbol from "../../public/assets/user/images/Symbol.png";
import Image from "next/image";

const ListMenu = () => {
  return (
    <div>
      <div className="bg-[#FFFFFF] rounded-[8px] hover:bg-orange-500 m-[0_0_10px_0] flex flex-row justify-between p-[15px_17px_15px_15.2px] w-[214.5px] box-sizing-border cursor-pointer">
        <Link
          href={"/user/display"}
          className="m-[0_10.5px_0_0] w-[163.7px] break-words font-['Inter'] font-normal text-[14px] leading-[1.5] text-[#000000] hover:text-[#FFFFFF]"
        >
          Account info
        </Link>
        <div className="m-[3.5px_0_3.5px_0] inline-block break-words font-['Font_Awesome_5_Pro','Roboto_Condensed'] font-black text-[14px] leading-[1] text-[#FFFFFF]">
          <Image src={symbol} alt="My Image" width={10} height={10} />
        </div>
      </div>
      <div className="rounded-[8px] bg-[#FFFFFF] m-[0_0_10px_0] flex flex-row justify-between p-[15px_17px_15px_15.2px] w-[214.5px] box-sizing-border hover:bg-orange-500 cursor-pointer">
        <Link
          href={"/user/order-list"}
          className="m-[0_10.5px_0_0] w-[163.7px] break-words font-['Inter'] font-normal text-[14px] leading-[1.5] text-[#000000] hover:text-[#FFFFFF]"
        >
          My order
        </Link>
        <div className="m-[3.5px_0_3.5px_0] inline-block break-words font-['Font_Awesome_5_Pro','Roboto_Condensed'] font-black text-[14px] leading-[1] text-[#000000] hover:text-[#FFFFFF]">
          <Image src={symbol} alt="My Image" width={10} height={10} />
        </div>
      </div>
      <div className="rounded-[8px] bg-[#FFFFFF] m-[0_0_10px_0] flex flex-row justify-between p-[15px_17px_15px_15.2px] w-[214.5px] box-sizing-border hover:bg-orange-500 cursor-pointer">
        <Link
          href={"/user/my-address"}
          className="m-[0_10.5px_0_0] w-[163.7px] break-words font-['Inter'] font-normal text-[14px] leading-[1.5] text-[#000000] hover:text-[#FFFFFF] cursor-pointer"
        >
          My address
        </Link>
        <div className="m-[3.5px_0_3.5px_0] inline-block break-words font-['Font_Awesome_5_Pro','Roboto_Condensed'] font-black text-[14px] leading-[1] text-[#000000] ">
          <Image src={symbol} alt="My Image" width={10} height={10} />
        </div>
      </div>
      <div className="rounded-[8px] bg-[#FFFFFF] m-[0_0_10px_0] flex flex-row justify-between p-[15px_17px_15px_15.2px] w-[214.5px] box-sizing-border hover:bg-orange-500 cursor-pointer">
        <Link
          href={"/review-product"}
          className="m-[0_10.5px_0_0] w-[163.7px] break-words font-['Inter'] font-normal text-[14px] leading-[1.5] text-[#000000] hover:text-[#FFFFFF] cursor-pointer"
        >
        My review
        </Link>
        <div className="m-[3.5px_0_3.5px_0] inline-block break-words font-['Font_Awesome_5_Pro','Roboto_Condensed'] font-black text-[14px] leading-[1] text-[#000000] ">
          <Image src={symbol} alt="My Image" width={10} height={10} />
        </div>
      </div>
      <div className="rounded-[8px] bg-[#FFFFFF] flex flex-row justify-between p-[15px_17px_15px_15.2px] w-[214.5px] box-sizing-border hover:bg-orange-500 cursor-pointer">
        <Link
          href={"/user/change-password"}
          className="m-[0_10.5px_0_0] w-[163.7px] break-words font-['Inter'] font-normal text-[14px] leading-[1.5] text-[#000000] hover:text-[#FFFFFF]"
        >
          Change password
        </Link>
        <div className="m-[3.5px_0_3.5px_0] inline-block break-words font-['Font_Awesome_5_Pro','Roboto_Condensed'] font-black text-[14px] leading-[1] text-[#000000]">
          <Image src={symbol} alt="My Image" width={10} height={10} />
        </div>
      </div>
    </div>
  );
};

export default ListMenu;
