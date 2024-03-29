import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { DataContext } from "@/stores/Context";
import { useRouter } from "next/router";
import { FaRegTrashAlt } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import useAuthStore from "@/stores/auth";

export default function Index() {
  const { cart, setCart, setAndStoreData } = useContext(DataContext);
  const route = useRouter();
  const { user } = useAuthStore();

  const reduction = (id) => {
    const data = cart.cart;
    data.forEach((item) => {
      if (item.id === id) {
        item.jumlah === 1 ? (item.jumlah = 1) : (item.jumlah -= 1);
      }
    });
    setCart({ cart: data });
    getTotal();
  };

  const increase = (id) => {
    const data = cart.cart;
    data.forEach((item) => {
      if (item.id === id) {
        item.jumlah += 1;
      }
    });
    setCart({ cart: data });
    getTotal();
  };

  const getTotal = () => {
    const data = cart.cart;
    let totalCheck = compareArrays(cart.cart, selectedItems);
    const res = totalCheck.reduce((prev, item) => {
      return prev + item.variant.harga * item.jumlah;
    }, 0);
    setCart({ cart: data, total: res });
  };
  const [selectedItems, setSelectedItems] = useState([]);

  const checkboxHandler = (e) => {
    let isSelected = e.target.checked;
    let value = e.target.value;

    if (isSelected) {
      setSelectedItems([...selectedItems, value]);
    } else {
      setSelectedItems((prevData) => {
        return prevData.filter((id) => {
          return id !== value;
        });
      });
    }
  };

  const checkAllHandler = () => {
    if (cart.cart.length === selectedItems.length) {
      setSelectedItems([]);
    } else {
      const postIds = cart.cart.map((item) => {
        return item.id.toString();
      });

      setSelectedItems(postIds);
    }
  };

  function compareArrays(array1, array2) {
    const objectMap = {};

    // Mengisi objekMap dengan objek berdasarkan id
    array1?.forEach((obj) => {
      objectMap[obj.id] = obj;
    });

    // Memfilter objek yang memiliki id yang terdapat dalam idArray
    const resultArray = array2.map((id) => objectMap[id]).filter(Boolean);

    return resultArray;
  }

  const handleDelete = async (id) => {
    try {
      if (window.confirm("Do you want to delete this product?")) {
        await axios.delete(`${host}/keranjang/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        toast.success("Success Delete Product");
        // set isi keranjang
        const resKeranjang = await axios.get(`${host}/keranjang`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        // set resKeranjang ke dalam state context keranjang
        const keranjang = resKeranjang.data.data;
        await setAndStoreData(keranjang);
        window.location.reload();
      }
    } catch (error) {}
  };

  const handleCheckout = async () => {
    let itemSelect = compareArrays(cart.cart, selectedItems);
    const res = itemSelect.reduce((prev, item) => {
      return prev + item.variant.harga * item.jumlah;
    }, 0);
    setCart({ checkout: itemSelect, total: res });
    route.push("/transaksi");
  };

  useEffect(() => {
    getTotal();
  }, [selectedItems]);
  return (
    <main
      className={`flex min-h-screen flex-col bg-gray items-center lg:mx-40 pt-24`}
    >
      <Toaster />
      <div className="flex flex-col bg-white w-full md:m-5 m-0">
        <div className="text-sm md:text-2xl font-semibold p-5">Keranjang</div>
        <div className="text-sm md:text-xl font-semibold mx-0 md:mx-5 mt-5 bg-gray-200 rounded-lg">
          <input
            type="checkbox"
            className="form-checkbox text-indigo-600 h-4 w-4 m-5"
            onChange={checkAllHandler}
          />
          Pilih Semua
        </div>
        <div className="flex md:flex-row flex-col w-full">
          <div className="flex flex-col md:w-3/4 w-full">
            {cart.cart?.map((product, index) => {
              return (
                <div
                  key={index}
                  className="w-75 flex flex-col text-sm font-semibold mx-0 md:mx-5 mt-5 py-5 bg-gray-200 rounded-lg"
                >
                  <div className="flex flex-row">
                    <input
                      type="checkbox"
                      className="form-checkbox text-indigo-600 h-4 w-4 m-5"
                      value={product.id.toString()}
                      onChange={checkboxHandler}
                      checked={selectedItems.includes(product.id.toString())}
                    />
                    <Image
                      src={product.variant.produk.gambar[0].url}
                      alt=""
                      width={125}
                      height={125}
                    />
                    <div className="flex flex-row justify-between w-full mx-5">
                      <div className="grid grid-rows-2 pr-5 text-sm">
                        <div>{product.variant.produk.nama}</div>
                        <div>
                          {product.variant.ukuran} - {product.variant.warna}
                        </div>
                      </div>
                      <div className="flex flex-col justify-between items-center">
                        <div>Rp. {product.variant.harga.toLocaleString()}</div>
                        <div>
                          <div className="flex justify-center items-center">
                            <FaRegTrashAlt
                              onClick={() => handleDelete(product.id)}
                              className="md:mr-5 hover:bg-red-600 hover:cursor-pointer"
                            />
                            <button
                              className="bg-gray-200 hover:bg-gray-300 text-green-800 text-xl font-bold py-2 md:px-4 px-2 rounded-l focus:outline-none"
                              onClick={() => reduction(product.id)}
                            >
                              -
                            </button>
                            <input
                              type="text"
                              className="w-10 text-center bg-gray-100 text-gray-700 font-bold py-1 px-1 border border-gray-200"
                              value={product.jumlah}
                              readOnly
                            />
                            <button
                              className="bg-gray-200 hover:bg-gray-300 text-green-800 font-bold py-2 md:px-4 px-2 rounded-r focus:outline-none"
                              onClick={() => increase(product.id)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="invisible md:visible bg-green-100 my-5 mr-5 p-5 w-1/4 h-min flex flex-col rounded-lg">
            <div>Ringkasan Belanja</div>
            <div className="flex flex-row justify-between mt-5 text-sm">
              <div>Total</div>
              <div>Rp {cart.total?.toLocaleString()}</div>
            </div>
            <button
              onClick={handleCheckout}
              className="mt-5 w-full bg-white text-gray-800 font-bold py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:border-gray-500 focus:shadow-outline"
            >
              Check out
            </button>
          </div>

          <div className="bg-green-100 p-2 fixed left-0 bottom-0 flex flex-row w-full justify-between md:invisible rounded-t-lg px-5">
            <div className="flex flex-col mr-5">
              <div className="text-sm">Total</div>
              <div>Rp {cart.total?.toLocaleString()}</div>
            </div>

            <button
              onClick={handleCheckout}
              className="bg-white text-gray-800 font-bold py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:border-gray-500 focus:shadow-outline"
            >
              Check out
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
