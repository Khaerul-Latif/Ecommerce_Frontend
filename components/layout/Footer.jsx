import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <>
     <div className="bg-white pt-10">
        <div className=" m-auto text-gray-800 flex flex-wrap justify-center ">
        <div className="p-5 w-96">
            <img
                className="h-20 w-auto sm:h-20"
                src="/assets/logo.jpg"
                alt=""
              />
            <Link className="my-3 block font-bold" href="/#">
            Dapatkan promo terbaru dan info lainnya hanya dengan mendaftarkan emailmu! <span className="text-teal-600 text-xs p-1" />
            </Link>
            <div className='flex flex-wrap'>
                <svg xmlns="http://www.w3.org/2000/svg" className='w-auto h-7 mr-5' viewBox="0 0 20 20"><path fill="currentColor" d="M17 1H3c-1.1 0-2 .9-2 2v14c0 1.101.9 2 2 2h14c1.1 0 2-.899 2-2V3c0-1.1-.9-2-2-2M9.984 15.523a5.539 5.539 0 0 0 5.538-5.539c0-.338-.043-.664-.103-.984H17v7.216a.69.69 0 0 1-.693.69H3.693a.69.69 0 0 1-.693-.69V9h1.549c-.061.32-.104.646-.104.984a5.54 5.54 0 0 0 5.539 5.539M6.523 9.984a3.461 3.461 0 1 1 6.922 0a3.461 3.461 0 0 1-6.922 0M16.307 6h-1.615A.694.694 0 0 1 14 5.308V3.691c0-.382.31-.691.691-.691h1.615c.384 0 .694.309.694.691v1.616c0 .381-.31.693-.693.693"/></svg>
                <svg xmlns="http://www.w3.org/2000/svg" className='w-auto h-7 mr-5' viewBox="0 0 20 20"><path fill="currentColor" d="M17 1H3c-1.1 0-2 .9-2 2v14c0 1.101.9 2 2 2h7v-7H8V9.525h2v-2.05c0-2.164 1.212-3.684 3.766-3.684l1.803.002v2.605h-1.197c-.994 0-1.372.746-1.372 1.438v1.69h2.568L15 12h-2v7h4c1.1 0 2-.899 2-2V3c0-1.1-.9-2-2-2"/></svg>
                <svg xmlns="http://www.w3.org/2000/svg" className='w-auto h-7 mr-5' viewBox="0 0 20 20"><path fill="currentColor" d="M17.316 6.246c.008.162.011.326.011.488c0 4.99-3.797 10.742-10.74 10.742c-2.133 0-4.116-.625-5.787-1.697a7.577 7.577 0 0 0 5.588-1.562a3.779 3.779 0 0 1-3.526-2.621a3.858 3.858 0 0 0 1.705-.065a3.779 3.779 0 0 1-3.028-3.703v-.047a3.766 3.766 0 0 0 1.71.473a3.775 3.775 0 0 1-1.168-5.041a10.716 10.716 0 0 0 7.781 3.945a3.813 3.813 0 0 1-.097-.861a3.773 3.773 0 0 1 3.774-3.773a3.77 3.77 0 0 1 2.756 1.191a7.602 7.602 0 0 0 2.397-.916a3.789 3.789 0 0 1-1.66 2.088a7.55 7.55 0 0 0 2.168-.594a7.623 7.623 0 0 1-1.884 1.953"/></svg>
            </div>
        </div>
        <div className="p-5 w-48 ">
            <div className="text-xs uppercase text-gray-500 font-medium">Home</div>
            <Link className="my-3 block" href="/#">
            Products <span className="text-teal-600 text-xs p-1" />
            </Link>
            <Link className="my-3 block" href="/login">
            Sign in <span className="text-teal-600 text-xs p-1" />
            </Link>
            <Link className="my-3 block" href="/register">
            Register <span className="text-teal-600 text-xs p-1" />
            </Link>
        </div>
        <div className="p-5 w-48 ">
            <div className="text-xs uppercase text-gray-500 font-medium">User</div>
            <Link className="my-3 block" href="/keranjang">
            Cart <span className="text-teal-600 text-xs p-1" />
            </Link>
            <Link className="my-3 block" href="/wishlist">
            Wishlist <span className="text-teal-600 text-xs p-1" />
            </Link>
            <Link className="my-3 block" href="/transaksi">
            Transaction <span className="text-teal-600 text-xs p-1" />
            </Link>
            <Link className="my-3 block" href="/user/display">
            Profile <span className="text-teal-600 text-xs p-1" />
            </Link>
            
        </div>
        <div className="p-5 w-48 ">
            <div className="text-xs uppercase text-gray-500 font-medium">
            Product
            </div>
            <Link className="my-3 block" href="/list-product">
            Our Products <span className="text-teal-600 text-xs p-1" />
            </Link>
            <Link className="my-3 block" href="/list-product">
            Great Deals <span className="text-teal-600 text-xs p-1">New</span>
            </Link>
        </div>
        
        <div className="p-5 w-48 ">
            <div className="text-xs uppercase text-gray-500 font-medium">
            Contact us
            </div>
            <Link className="my-3 block" href="/#">
            +62 8232396913
            <span className="text-teal-600 text-xs p-1" />
            </Link>
            <Link className="my-3 block" href="/#">
            Jalan Raya SukaRame No.01 Pahlawan
            <span className="text-teal-600 text-xs p-1" />
            </Link>
            <Link className="my-3 block" href="/#">
            Mager@company.com <span className="text-teal-600 text-xs p-1" />
            </Link>
        </div>
        </div>
    </div>
    <div className="bg-white pt-2 ">
        <div
        className="flex pb-5 px-3 m-auto pt-5 border-t text-gray-800 text-sm flex-col
    md:flex-row mx-5  "
        >
        <div className="mt-2 text-center">© Copyright 2020. All Rights Reserved.</div>
        <div className="md:flex-auto md:flex-row-reverse mt-2 flex-row flex">
            
        </div>
        </div>
    </div> 
    </>
  )
}

export default Footer
