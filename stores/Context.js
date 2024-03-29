import React, { createContext, useEffect, useState } from 'react'

export const DataContext = createContext();

export const DataProvider = props => {
    const state = {
        cart: [],
        total: 0,
        checkout: []
    };
    const [cart, setCart] = useState(state);

    useEffect(() => {
        // Mengambil data dari localStorage saat komponen dimuat
        const dataFromLocalStorage = localStorage.getItem('myCart');
        if (dataFromLocalStorage) {
          setCart({cart: JSON.parse(dataFromLocalStorage)});
        }
      }, []);
    
      // Menyimpan data ke localStorage dan update state
      const setAndStoreData = (newData) => {
        setCart({cart: newData});
        localStorage.setItem('myCart', JSON.stringify(newData));
      };
    return (
      <DataContext.Provider value={{cart, setCart, setAndStoreData}}>
        {props.children}
      </DataContext.Provider>
    );
  };


