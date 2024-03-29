import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const ProdukItem = ({ produk, titleItem, addwishlist }) => {
  const router = useRouter();

  const viewDetail = (slug) => {
    router.push(`/detail/${slug}`);
  };
  const hargaFormatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });
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
                        
                        
                    </div>
                </nav>
            {titleItem === "Produk Terbaru!" ? 
                (produk 
                  && produk.slice(0, 4).map((item, index) => {
                    const imageUrl = item.gambar[0]?.url || 'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80'
                    const harga = item.variant[0]?.harga || '0'
                    const slug = item.slug
                    return(
                    <div className="w-full md:w-1/3 xl:w-1/4 flex flex-col" key={index}>
                        <div className='hover:grow p-6 hover:shadow-lg hover:border-2 hover:border-orange-500'>
                            
                        <Link href={`/detail/${slug}`}>
                        <img
                            className="mb-2 "
                            src={imageUrl}
                        />
                        </Link>
                        <span className="bg-green-100 w-auto text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-lg dark:bg-green-200 dark:text-green-900">{item.kategori}</span>
                        <div className="pt-3 flex items-center justify-between">
                            <p className="">{item.nama}</p>
                            <svg onClick={() => addwishlist(item.id)}
                            className="h-6 w-6 fill-current text-gray-500 hover:text-black"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            >
                            <path d="M12,4.595c-1.104-1.006-2.512-1.558-3.996-1.558c-1.578,0-3.072,0.623-4.213,1.758c-2.353,2.363-2.352,6.059,0.002,8.412 l7.332,7.332c0.17,0.299,0.498,0.492,0.875,0.492c0.322,0,0.609-0.163,0.792-0.409l7.415-7.415 c2.354-2.354,2.354-6.049-0.002-8.416c-1.137-1.131-2.631-1.754-4.209-1.754C14.513,3.037,13.104,3.589,12,4.595z M18.791,6.205 c1.563,1.571,1.564,4.025,0.002,5.588L12,18.586l-6.793-6.793C3.645,10.23,3.646,7.776,5.205,6.209 c0.76-0.756,1.754-1.172,2.799-1.172s2.035,0.416,2.789,1.17l0.5,0.5c0.391,0.391,1.023,0.391,1.414,0l0.5-0.5 C14.719,4.698,17.281,4.702,18.791,6.205z" />
                            </svg>
                        </div>
                    
                        <p className="pt-1 text-gray-900">{hargaFormatter.format(harga)}</p>
                        
                        <button onClick={() => viewDetail(slug)} className="block w-full p-4 mt-5 text-sm font-medium text-white bg-orange-500 border rounded-2xl" type="button">
                            View Detail
                        </button>
                        </div>
                    </div>
                    )
                })) : 
                (produk 
                  && produk.map((item, index)=>{
                    const imageUrl = item.gambar[0]?.url || 'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80'
                    const harga = item.variant[0]?.harga || '0'
                    const slug = item.slug
                    return(
                    <div className="w-full md:w-1/3 xl:w-1/4 flex flex-col" key={index}>
                        <div className='hover:grow p-6 hover:shadow-lg hover:border-2 hover:border-orange-500'>
                            
                        <Link href={`/detail/${slug}`}>
                        <img
                            className="mb-2 "
                            src={imageUrl}
                        />
                        </Link>
                        <span className="bg-green-100 w-auto text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-lg dark:bg-green-200 dark:text-green-900">{item.kategori}</span>
                        <div className="pt-3 flex items-center justify-between">
                            <p className="">{item.nama}</p>
                            <svg onClick={() => addwishlist(item.id)}
                            className="h-6 w-6 fill-current text-gray-500 hover:text-black"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            >
                            <path d="M12,4.595c-1.104-1.006-2.512-1.558-3.996-1.558c-1.578,0-3.072,0.623-4.213,1.758c-2.353,2.363-2.352,6.059,0.002,8.412 l7.332,7.332c0.17,0.299,0.498,0.492,0.875,0.492c0.322,0,0.609-0.163,0.792-0.409l7.415-7.415 c2.354-2.354,2.354-6.049-0.002-8.416c-1.137-1.131-2.631-1.754-4.209-1.754C14.513,3.037,13.104,3.589,12,4.595z M18.791,6.205 c1.563,1.571,1.564,4.025,0.002,5.588L12,18.586l-6.793-6.793C3.645,10.23,3.646,7.776,5.205,6.209 c0.76-0.756,1.754-1.172,2.799-1.172s2.035,0.416,2.789,1.17l0.5,0.5c0.391,0.391,1.023,0.391,1.414,0l0.5-0.5 C14.719,4.698,17.281,4.702,18.791,6.205z" />
                            </svg>
                        </div>
                    
                        <p className="pt-1 text-gray-900">{hargaFormatter.format(harga)}</p>
                        
                        <button onClick={() => viewDetail(slug)} className="block w-full p-4 mt-5 text-sm font-medium text-white bg-orange-500 border rounded-2xl" type="button">
                            View Detail
                        </button>
                        </div>
                    </div>
                    )
                }))  
            }
            
            </div>
        
    </section>
  );
};

export default ProdukItem;
