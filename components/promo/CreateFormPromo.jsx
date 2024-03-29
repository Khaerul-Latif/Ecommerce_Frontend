import { useState, useEffect } from "react";
import axios from "axios";
import useAuthStore from "@/stores/auth";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import { host } from "@/utils/constant";

const CreateFormPromo = () => {
  const router = useRouter();
  const [kode, setKode] = useState("");
  const [diskon, setDiskon] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { user } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${host}/promo`,
        {
          kode: kode,
          diskon: diskon,
          start_date: startDate,
          end_date: endDate,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      toast.success("Promo Berhasil Dibuat");
      setKode("");
      setDiskon("");
      setStartDate("");
      setEndDate("");
      
      router.push(`/admin/promo`);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Toaster position="top-center" />
      <h1 className="text-3xl font-bold mb-6">Create Promo</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="mb-4">
          <label
            htmlFor="kode"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Kode
          </label>
          <input
            type="text"
            id="kode"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={kode}
            onChange={(e) => setKode(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="diskon"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Diskon
          </label>
          <input
            type="number"
            id="diskon"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={diskon}
            onChange={(e) => setDiskon(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="start-date"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Start Date
          </label>
          <input
            type="datetime-local"
            id="startDate"
            name="startDate"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="end-date"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            End Date
          </label>
          <input
            type="datetime-local"
            id="endDate"
            name="endDate"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateFormPromo;
