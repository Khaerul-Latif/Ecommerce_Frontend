import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Axios from "../../api/index.jsx";
import useAuthStore from "@/stores/auth.js";
import useLocalStorageStore from "./userStore.jsx";
import { useParams } from "next/navigation.js";
import ErrorHandler from "./errorHandler.jsx";
import toast, { Toaster } from "react-hot-toast";

const Address = () => {
  const router = useRouter();
  const { id } = useParams() || "";
  const path = useRouter().pathname;
  const { user } = useAuthStore();
  const { getAllItems } = useLocalStorageStore();
  const [user_id, setUser_id] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState({
    alamat_lengkap: "",
    user_id: user_id,
  });

  // mengambil data user_id dari login
  useEffect(() => {
    const storedItems = getAllItems();
    if (storedItems.length > 0) {
      setUser_id(storedItems[0].id);
    }
  }, []);

  const fetchData = async () => {
    try {
      const response = await Axios.get(`/alamat/${id}`, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const result = response.data.data;
      setData(result);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user, id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleInput = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await Axios.post(`/alamat`, data, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      toast.success("Tambah alamat berhasil");
      setTimeout(() => {
        router.push("/user/my-address");
      }, 2000);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await Axios.put(`/alamat/${id}`, data, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      toast.success("Edit alamat berhasil");
      setTimeout(() => {
        router.push("/user/my-address");
      }, 2000);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  return (
    <div className="lg:flex md:flex justify-center font-['Inter']">
      <Toaster position="top-center" />
      <div className="mt-4 inline-block self-start break-words font-['Inter'] font-bold text-[24px] leading-[1.2] capitalize text-[#000000]">
        My Address
      </div>
      <form
        onSubmit={path == "/user/insert-address" ? handleInput : handleEdit}
        className="max-w-md mx-auto mt-[80px] mb-auto w-[600px] bg-white p-10"
      >
        <div className="mb-4">
          <label htmlFor="alamat_lengkap" className="block mb-1">
            Alamat Lengkap
          </label>
          <textarea
            disabled={loading}
            id="alamat_lengkap"
            name="alamat_lengkap"
            value={data ? data.alamat_lengkap : ""}
            onChange={handleInputChange}
            className="h-[150px] w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <button
          type="submit"
          className="block w-full p-4 mt-5 text-sm font-medium text-white bg-orange-500 hover:bg-orange-400 border rounded-sm"
        >
          {loading ? "Loading...." : "Submit"}
        </button>
      </form>
      {error && <ErrorHandler error={error} />}
    </div>
  );
};

export default Address;
