import { host } from '@/utils/constant';
import axios from 'axios';
import Link from 'next/link';
import React from 'react'
import useSWR from 'swr';

const fetcher = url => axios.get(url).then(res => res.data.data)

const Filter = ({titleItem, produk}) => {
  const {data:category, error} = useSWR(`${host}/kategori`, fetcher)
  const categories = ["Category 1", "Category 2", "Category 3", "Category 4"];


  return (
        <section className="bg-white py-8 my-10">
            <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12">
                <nav className="w-full z-30 top-0 px-6 py-1">
                    <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3">
                        <Link
                            className="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl "
                            href="#"
                        >
                            {titleItem}
                        </Link>
                        {titleItem == 'Produk Terbaru!' && (<div className="flex items-center" id="store-nav-content">
                            <svg
                                className="w-4 h-4 mr-2 fill-current text-gray-600"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <path d="M7 11H17V13H7zM4 7H20V9H4zM10 15H14V17H10z" />
                            </svg>
                            <select
                                className="block px-2 py-1 bg-white rounded-md shadow-sm focus:ring-indigo-500 sm:text-sm"
                                defaultValue="all"
                            >
                                {categories.map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>
                                ))}
                            </select>
                        </div>)}
                        
                    </div>
                </nav>
                {category && category.map((item, index)=>{
                    const imageUrl = 'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80'
                    const harga = '0'
                    const slug = item.slug
                    return(
                    <Link href={`/list-product?category=${slug}`} className="w-full md:w-1/3 xl:w-1/4 p-6 border-2 rounded-2xl m-2 flex items-center flex-col" key={index}>
                          {/* <img
                              className="mb-2"
                              src={imageUrl}
                          /> */}
                          
                          <div className="pt-3 flex items-center justify-between">
                              <p className="">{item.nama}</p>
                          </div>
                        
                    </Link>
                    )
                })}  
            
            </div>
        </section>
  )
}

export default Filter