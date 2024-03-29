import React, { useEffect, useState } from "react";
import useAuthStore from "@/stores/auth";
import Axios from "@/api";
import { useRouter } from "next/router";
import useLocalStorageStore from "./userStore";
import toast, { Toaster } from "react-hot-toast";
import ErrorHandler from "./errorHandler";
import { cloudName, uploadPreset } from "@/utils/constant";

const AccountInfo = () => {
  const [data, setData] = useState({
    name: "",
    phone_number: "",
  });

  const [photo, setPhoto] = useState(null);
  const [photoPreviw, setPhotoPreview] = useState(null);

  const { user, logout } = useAuthStore();
  const router = useRouter();
  const { addItem } = useLocalStorageStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchUser = async () => {
    try {
      const response = await Axios.get(`/me`, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const result = response.data.data;
      const name = result.name;
      const phone = result.phone_number;
      const photo = result.url_profile;
      const email = result.email;
      const id = result.id;
      addItem({ name, email, id, phone, photo });

      setData({
        name: result.name || "Not found",
        url_profile: result.url_profile || "Not found",
        phone_number: result.phone_number || "Not found",
      });
    } catch (error) {
      toast.error("Session habis, Silahkan login lagi...");
      // router.push("/login");

      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Upload gambar ke Cloudinary
      const image = new FormData();
      image.append("file", photo);
      image.append("cloud_name", cloudName);
      image.append("upload_preset", uploadPreset);

      const cloudinaryResponse = await Axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        image
      );

      // Jika upload gambar berhasil, dapatkan URL gambar dari Cloudinary
      const imageURL = cloudinaryResponse.data.secure_url;

      const formData = {
        name: data.name,
        phone_number: data.phone_number,
        url_profile: imageURL,
      };

      const response = await Axios.put(`/update-profile`, formData, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      setLoading(false);
      toast.success("Update profil berhasil");
      setPhotoPreview(null);
      setPhoto(null);

      const result = response.data.data;
      const name = result.name;
      const url_profile = result.url_profile;
      addItem({ name, url_profile });
      fetchUser();
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUser();
    } else {
      router.push("/login");
    }
  }, [user]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleInputPhoto = (event) => {
    setPhoto(event.target.files[0]);
    setPhotoPreview(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <div className="lg:flex md:flex justify-center font-['Inter']">
      <Toaster position="top-center" />
      <div className="mt-4 inline-block self-start break-words font-['Inter'] font-bold text-[24px] leading-[1.2] capitalize text-[#3d3c3c]">
        Account Info
      </div>
      <form
        className="max-w-md mx-auto mt-[80px] mb-auto w-[600px] bg-white p-10"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label htmlFor="name" className="block mb-1">
            Fullname
          </label>
          <input
            disabled={loading}
            type="text"
            id="name"
            name="name"
            value={data.name}
            onChange={handleInputChange}
            className=" text-gray-500 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="url_profile" className="block mb-1">
            Photo
          </label>
          <input
            disabled={loading}
            type="file"
            id="url_profile"
            name="url_profile"
            onChange={handleInputPhoto}
            required
            className="text-gray-500 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
          <img
            src={photoPreviw}
            className="text-[12px] text-orange-500 w-[50px]"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone_number" className="block mb-1">
            Phone Number
          </label>
          <input
            disabled={loading}
            type="text"
            id="phone_number"
            name="phone_number"
            value={data.phone_number}
            onChange={handleInputChange}
            required
            className="text-gray-500 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        {error && <ErrorHandler error={error} />}

        <button
          type="submit"
          className="block w-full p-4 mt-5 text-sm font-medium text-white bg-orange-500 hover:bg-orange-400 border rounded-sm"
        >
          {loading ? "Loading..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default AccountInfo;
