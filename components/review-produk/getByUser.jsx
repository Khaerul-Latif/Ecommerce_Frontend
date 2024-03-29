import Axios from "@/api";
import useAuthStore from "@/stores/auth";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import ErrorHandler from "../user/errorHandler";
import Link from "next/link";

const GetReviewByUser = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuthStore();
  const { id } = useParams() || "";

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await Axios.get(`/review/user`, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      setLoading(false);
      const result = response.data.data;
      setData(result);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user, id]);

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Apakah yakin akan menghapus alamat ini?"
      );
      if (confirmDelete) {
        const response = await Axios.delete(`/review/${id}`, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });
        toast.success("Review berhasil di hapus");
        fetchData();
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="bg-white p-5 my-[150px] mx-[120px]">
      <Toaster position="top-center" />
      <div className="overflow-x-auto">
        {loading ? "Loading..." : ""}
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Produk</th>
              <th>Ulasan</th>
              <th>Rating</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {data && data.length > 0 ? (
              data.map((item) => (
                <tr key={item.id}>
                  <td className="w-1/4">
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src="/assets/user/images/no-picture.png"
                            alt="kategori image"
                            loading="lazy"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{item.produk.nama}</div>
                        <div className="text-sm opacity-50">
                          {item.created_at}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{item.comment}</td>
                  <td className="text-yellow-500 w-1/5 text-[20px]">
                    {Array.from({ length: item.bintang  }).map(
                      (_, index) => (
                        <span key={index}>★</span>
                      )
                    )}
                  </td>
                  <td className="flex justify-center items-center">
                    <Link href={`/review-product/update/${item.id}`}>
                      <img
                        src="/assets/user/images/edit.png"
                        alt="edit"
                        className="dark:invert bg-white p-1 hover:scale-[1.8] "
                        width={40}
                        loading="lazy"
                      />
                    </Link>
                    <button onClick={() => handleDelete(item.id)}>
                      <img
                        src="/assets/user/images/bin.png"
                        alt="Delete"
                        className="dark:invert bg-white p-1 hover:scale-[1.8]"
                        width={40}
                        loading="lazy"
                      />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>Data tidak ada</td>
              </tr>
            )}
          </tbody>
        </table>
        {error && <ErrorHandler error={error} />}
      </div>
    </div>
  );
};

export default GetReviewByUser;
