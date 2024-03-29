import Axios from "@/api";
import useAuthStore from "@/stores/auth";
import React, { useState } from "react";
import ErrorHandler from "./errorHandler";
import toast, { Toaster } from "react-hot-toast";

const ChangePassword = () => {
  const [data, setData] = useState({
    current_password: "",
    new_password: "",
  });

  const [loading, setLoading] = useState(false);
  const { user, logout } = useAuthStore();
  const [error, setEror] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await Axios.put(`/change-password`, data, {
        headers: {
          accept: "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      });
      setLoading(false);
      toast.success("Ganti password berhasil");
      setData({
        current_password: "",
        new_password: "",
      });
    } catch (error) {
      setLoading(false);
      setEror(error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="lg:flex md:flex justify-center font-['Inter']">
      <Toaster position="top-center" />
      <div className="mt-4 inline-block self-start break-words font-['Inter'] font-bold text-[24px] leading-[1.2] capitalize text-[#000000]">
        Change Password
      </div>
      <form
        className="max-w-md mx-auto mt-[80px] mb-auto w-[600px] bg-white p-10"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label htmlFor="current_password" className="block mb-1">
            Current Password
          </label>
          <input
            onChange={handleInputChange}
            value={data.current_password}
            type="password"
            id="current_password"
            name="current_password"
            min="6"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="new_password" className="block mb-1">
            New Password
          </label>
          <input
            onChange={handleInputChange}
            value={data.new_password}
            type="password"
            id="new_password"
            name="new_password"
            min="6"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <button
          type="submit"
          className="block w-full p-4 mt-5 text-sm font-medium text-white bg-orange-500 hover:bg-orange-400 border rounded-sm"
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
      {error && <ErrorHandler error={error} />}
    </div>
  );
};

export default ChangePassword;
