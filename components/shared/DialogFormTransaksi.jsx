import React, { useEffect, useState } from 'react';
import { IoIosClose } from "react-icons/io";

const DialogFormTransaksi = ({ isOpen, onClose, onSubmit, isSelect, data }) => {
    const [name, setName] = useState('');
    useEffect(() => {
        if (isOpen) {
            setName(isSelect ? data.status_pembayaran : data.status_pengiriman);
        }
    }, [isOpen, data]);
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(name, data);
        
    };

    const handleChange = (event) => {
        const { value } = event.target
        setName(value)
    }

    return (
        <div className={`fixed z-10 inset-0 overflow-y-auto ${isOpen ? 'block' : 'hidden'}`}>
            <div className="flex items-center justify-center min-h-screen p-4">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                <div className="relative bg-white rounded-lg p-8">
                    <div>
                        <IoIosClose className='w-full ml-20 hover:cursor-pointer' onClick={onClose} />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-3">{isSelect ? "Status Pembayaran" : "Status Pengiriman"}</label>
                            {isSelect
                                ?
                                <div className='flex flex-row'>
                                    <div className="mb-4 w-full">
                                        <select
                                            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="status_pembayaran"
                                            name="status_pembayaran"
                                            value={name}
                                            onChange={handleChange}
                                        >
                                            <option value='' hidden></option>
                                            <option value={0}>Belum Bayar</option>
                                            <option value={1}>Lunas</option>
                                        </select>
                                    </div>
                                </div>
                                :

                                <div className='flex flex-row'>
                                    <div className="mb-4 w-full">
                                        <select
                                            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="status_pembayaran"
                                            name="status_pembayaran"
                                            value={name.toUpperCase()}
                                            onChange={handleChange}
                                        >
                                            <option value='' hidden></option>
                                            <option value="TERKIRIM">TERKIRIM</option>
                                            <option value="BELUM DIKIRIM">BELUM DIKIRIM</option>
                                        </select>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className="mt-4 flex justify-end">
                            <button type="submit" className="w-full px-4 py-2 bg-indigo-600 border border-transparent rounded-md text-white font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DialogFormTransaksi;