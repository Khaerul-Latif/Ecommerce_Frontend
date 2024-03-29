import Link from "next/link";
import SidebarLink from "./SidebarLink";

export default function Sidebar() {
  return (
    <div className="drawer-side z-50">
      <label
        htmlFor="my-drawer"
        aria-label="close sidebar"
        className="drawer-overlay bg-transparent"
      ></label>
      <div className="menu p-4 w-80 min-h-full bg-white text-base-content">
        <div className="flex justify-center items-center flex-col text-black">
          <Link href="/">
            <span className="sr-only">Workflow</span>
            <img
              className="h-20 w-auto sm:h-20"
              src="/assets/logo.jpg"
              alt=""
            />
          </Link>
          <h1 className="mt-8 text-lg font-bold">SIDEBAR ADMIN</h1>
        </div>

        <div className="flex flex-col gap-5 mt-8 text-black">
					<SidebarLink href="/admin/produk" name="Produk" />
        </div>
        <div className="flex flex-col gap-5 mt-8 text-black">
          <SidebarLink href="/admin/user" name="User" />
        </div>
        <div className="flex flex-col gap-5 mt-8 text-black">
          <SidebarLink href="/admin/promo" name="Promo" />
        </div>
		<div className="flex flex-col gap-5 mt-8 text-black">
          <SidebarLink href="/admin/kategori" name="Kategori" />
        </div>
        <div className="flex flex-col gap-5 mt-8 text-black">
          <SidebarLink href="/admin/transaksi" name="Transaksi" />
        </div>
    
     <div className="flex flex-col gap-5 mt-8 text-black">
         <SidebarLink href="/admin/barang-keluar" name="Barang Keluar" />
        </div>
    
      </div>
    </div>
  );
}
