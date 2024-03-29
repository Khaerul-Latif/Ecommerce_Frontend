import { useRouter } from 'next/router'
import React from 'react'

const HeroSection = () => {
  const router = useRouter()
  const onListProduct = () => {
    router.push(`/list-product`)
  }
  return (
        <section className="sm:px-0 lg:px-3 py-5 bg-white lg:py-10 mx-10 mt-40 rounded-3xl" style={{ backgroundImage: "url('/assets/bg.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
            <div className="grid gap-5 px-20">
                <div className="my-40 flex flex-col justify-center sm:pl-0 md:pl-3">
                <p className="text-4xl md:text-white lg:text-black font-bold md:text-7xl">Temukan Petualangan Baru dengan Produk Hiking Kami!</p>
                <p className="mt-2 xs:text-white sm:font-bold lg:font-normal md:text-white lg:text-black text-sm md:text-lg">Nikmati Diskon Hingga 100% Setiap Pembelian Yang Kamu Lakukan</p>
                <button onClick={onListProduct} className="block w-40 p-3 mt-5 text-sm font-medium text-white bg-orange-600 border rounded-lg" type="button">Temukan Product</button>
                </div>
                
            </div>
        </section>
  )
}

export default HeroSection
