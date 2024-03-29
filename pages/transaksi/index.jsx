import { DataContext } from "@/stores/Context";
import React, { useContext, useState } from "react";
import Image from "next/image";
import useSWR from "swr";
import toast, { Toaster } from "react-hot-toast";
import Loading from "@/components/Loading";
import useAuthStore from "@/stores/auth";
import axios from "axios";
import { useRouter } from "next/router";

export default function Index() {
    const { user } = useAuthStore();
    const { cart, setAndStoreData } = useContext(DataContext);
    const [input, setInput] = useState({
        kode_promo: "",
        alamat: "",
    });
    const [disc, setDisc] = useState({
        discount: "",
        total: "",
        set: false,
    });
    const router = useRouter();

    const fetcher = (url) =>
        axios
            .get(url, { headers: { Authorization: `Bearer ${user.token}` } })
            .then((res) => res.data);
    const { data, error, isLoading, mutate } = useSWR(
        `${host}/alamat/user/personal`,
        fetcher
    );
    if (isLoading) {
        return <Loading />; // Tampilkan indikator loading
    }
    if (error) {
        if (error.response && error.response.status === 401) {
            toast.error("You Must Login First");
            setTimeout(() => {
                router.push("/login");
            }, 2000);
        }
        return <Loading />; // Tampilkan indikator loading
    }

    const handleSubmit = async () => {
        try {
            const dataSend = {
                total_harga: disc.set ? disc.total : cart.total,
                kode_promo: input.kode_promo,
                alamat_id: input.alamat,
                barang_keluar: cart.checkout?.flatMap((product, index) => [
                    {
                        variant_id: product.variant.id,
                        jumlah: product.jumlah,
                        harga: product.variant.harga,
                    },
                ]),
            };
            await axios.post(
                `${host}/checkout`,
                dataSend,
                { headers: { Authorization: `Bearer ${user.token}` } }
            );
            toast.success("Order Success");
            // set isi keranjang
            const resKeranjang = await axios.get(
                `${host}/keranjang`,
                { headers: { Authorization: `Bearer ${user.token}` } }
            );
            // set resKeranjang ke dalam state context keranjang
            const keranjang = resKeranjang.data.data;
            await setAndStoreData(keranjang);
            router.push("/");
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error) {
            toast.error("Order Failured");
        }
    };

    const handleDiscount = (dataDiscount) => {
        let harga = cart.total;
        let totalHarga = harga - (dataDiscount / 100) * harga;
        setDisc({ set: true, discount: dataDiscount, total: totalHarga });
    };

    const handleOrder = async () => {
        try {
            const response = await axios.get(
                `${host}/check-promo?kode=${input.kode_promo}`,
                { headers: { Authorization: `Bearer ${user.token}` } }
            );
            const dataDiscount = response.data.data?.diskon;
            handleDiscount(dataDiscount);
            toast.success("Kode Promo Terpakai");
        } catch (error) {
            if (error.response && error.response.status === 409) {
                toast.error("Kode Promo Telah Terpakai");
            } else if (error.response && error.response.status === 410) {
                toast.error("Kode Promo Tidak Tersedia");
            } else if (error.response && error.response.status === 411) {
                toast.error("Kode Promo Telah Berakhir");
            } else if (error.response && error.response.status === 412) {
                toast.error("Kode Promo Belum Berlaku");
            } else {
                toast.error("Kode Promo Error");
            }
        }
    };

    const handleChange = (event) => {
        const { value, name } = event.target;
        setInput({ ...input, [name]: value });
    };

    return (
        <main
            className={`flex min-h-screen flex-col bg-gray items-start lg:mx-40 pt-24`}>
            <Toaster />
            <div className="text-sm md:text-2xl font-semibold p-5">
                Rincian Transaksi
            </div>
            <div className="flex md:flex-row flex-col w-full">
                <form className="flex w-full" onSubmit={handleSubmit}>
                    <div className="flex flex-col md:w-3/4 w-full">
                        <div className="w-75 flex flex-col text-sm font-semibold mx-0 md:mx-5 mt-5 py-5 px-5 bg-gray-200 rounded-lg">
                            <div className="mb-2">Alamat Pengiriman</div>
                            <div className="flex flex-row">
                                <div className="mb-4 w-full">
                                    <select
                                        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="alamat"
                                        name="alamat"
                                        value={input.alamat}
                                        onChange={handleChange}>
                                        <option value="" hidden></option>
                                        {data.data?.map((alamat) => {
                                            return (
                                                <option key={alamat.id} value={alamat.id}>
                                                    {alamat.alamat_lengkap}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>
                        {cart.checkout?.map((product, index) => {
                            return (
                                <div
                                    key={index}
                                    className="w-75 flex flex-col text-sm font-semibold mx-0 md:mx-5 mt-5 py-5 px-5 bg-gray-200 rounded-lg">
                                    <div className="mb-2">Pesanan {index + 1}</div>
                                    <div className="flex flex-row">
                                        <Image
                                            src={product.variant.produk.gambar[0].url}
                                            alt=""
                                            width={125}
                                            height={125}
                                        />
                                        <div className="flex flex-row justify-between w-full mx-5">
                                            <div className="grid grid-rows-2 pr-5 font-light text-sm">
                                                <div>{product.variant.produk.nama}</div>
                                                <div>
                                                    {product.variant.ukuran} - {product.variant.warna}
                                                </div>
                                            </div>
                                            <div className="flex flex-col justify-between items-center">
                                                <div>{product.jumlah} x Rp. {product.variant.harga?.toLocaleString()}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="bg-green-100 my-5 mr-5 p-5 w-1/4 h-min flex flex-col rounded-lg">
                        <div>Ringkasan Belanja</div>
                        <div className="flex flex-row justify-between mt-5 text-sm font-light">
                            <div>Harga</div>
                            <div>Rp {cart.total?.toLocaleString()}</div>
                        </div>
                        {disc.set ? (
                            <>
                                <div className="flex flex-row justify-between mt-5 text-sm font-light">
                                    <div>Discount</div>
                                    <div>{disc.discount} %</div>
                                </div>
                                <div className="flex flex-row justify-between mt-5 text-sm font-light">
                                    <div>Total</div>
                                    <div>Rp {disc.total?.toLocaleString()}</div>
                                </div>
                            </>
                        ) : (
                            <div></div>
                        )}
                        <div className="my-5">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="kodePromo">
                                Kode Promo
                            </label>
                            <div className="flex flex-row gap-2">
                                <input
                                    className="border rounded border-black w-full py-2 px-3 text-gray-700"
                                    id="kode_promo"
                                    type="text"
                                    placeholder="Input Kode Promo"
                                    name="kode_promo"
                                    value={input.kode_promo}
                                    onChange={handleChange}
                                />
                                <button
                                    type="button"
                                    onClick={handleOrder}
                                    className="w-full bg-white text-gray-800 font-bold py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:border-gray-500 focus:shadow-outline">
                                    Check
                                </button>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="mt-5 w-full bg-white text-gray-800 font-bold py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:border-gray-500 focus:shadow-outline">
                            Order
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}
