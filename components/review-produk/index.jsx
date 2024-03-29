import Axios from "@/api";
import useAuthStore from "@/stores/auth";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import ErrorHandler from "../user/errorHandler";

const GetReview = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuthStore();
  const { id } = useParams() || "";

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await Axios.get(`/review/produk/${id}`, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      setLoading(false);
      const result = response.data;
      setData(result);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user, id]);

  return (
    <div className="bg-white p-5 my-[100px] mx-[120px]">
      <Toaster position="top-center" />
      <div className="overflow-x-auto">
        {loading ? "Loading..." : ""}
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Ulasan</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {data && data.length > 0 ? (
              data.map((item) => (
                <tr key={item.id}>
                  <td className="w-1/5">
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
                        <div className="font-bold">Nama Orang</div>
                        <div className="text-sm opacity-50">
                          {item.created_at}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{item.comment}</td>
                  <td className="text-yellow-500 w-1/5">
                    {Array.from({ length: item.bintang - 1 }).map(
                      (_, index) => (
                        <span key={index}>★</span>
                      )
                    )}
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

export default GetReview;
