import toast, { Toaster } from "react-hot-toast";
import useAuthStore from "@/stores/auth";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import useLocalStorageStore from "../user/userStore";
import { useEffect, useState } from "react";
import Axios from "@/api";
import StarRating from "./star-rating";
import ErrorHandler from "../user/errorHandler";

const InsertReview = () => {
  const router = useRouter();
  const { id } = useParams() || "";
  const { user } = useAuthStore();
  const { getAllItems } = useLocalStorageStore();
  const [user_id, setUser_id] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const path = useRouter().pathname;

  const [bintang, setBintang] = useState(0);

  const [data, setData] = useState({
    user_id: user_id,
    produk_id: id,
    comment: "",
  });

  // Mengambil data user_id dari login
  useEffect(() => {
    const storedItems = getAllItems();
    if (storedItems.length > 0) {
      setUser_id(storedItems[0].id);
      setData((prevData) => ({
        ...prevData,
        user_id: storedItems[0].id,
      }));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const items = [1, 2, 3, 4, 5];

  const handleRating = (value) => {
    setBintang(value);
  };

  const handleInsert = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const formdata = {
        user_id: user_id,
        produk_id: id,
        comment: data.comment,
        bintang: bintang,
      };
      
      const response = await Axios.post(`/review`, formdata, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      setLoading(false);
      toast.success("Insert review berhasil");
      router.push("/user/order-list");
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  return (
    <div className="lg:flex md:flex justify-center font-['Inter'] mt-[70px] ">
      <Toaster position="top-center" />
      <form
        onSubmit={handleInsert}
        className="max-w-md mx-auto mt-[80px] mb-auto w-[600px] bg-white p-10"
      >
        <h5 className="font-bold mb-5 text-center text-[24px]">
          Insert Review
        </h5>
        <div className="h-1 text-gray-100 w-full"></div>
        <div className="mb-4">
          <label htmlFor="comment" className="block mb-1">
            Comment
          </label>
          <textarea
            disabled={loading}
            id="comment"
            name="comment"
            value={data ? data.comment : ""}
            onChange={handleInputChange}
            required
            className="h-[150px] w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <StarRating
          bintang={bintang}
          items={items}
          handleRating={handleRating}
        />
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

export default InsertReview;
