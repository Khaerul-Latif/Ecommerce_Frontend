import axios from "axios";
import React, { useEffect, useState } from "react";

const ImageKategori = ({ kategori }) => {
  const [image, setImage] = useState(null);
  const fetchData = async () => {
    try {
      const kategoriQuery = kategori ? kategori : "random";
      const clientId = process.env.NEXT_PUBLIC_CLIENT_ID_UNSPLASH;
      const url = `https://api.unsplash.com/search/photos?page=3&query=${kategoriQuery}&client_id=${clientId}&per_page=10&color=blue&orientation=portrait`;

      const response = await axios.get(url);
      const results = response.data.results;

      const randomIndex = Math.floor(Math.random() * results.length);

      const randomImageUrl = results[randomIndex].urls.regular;

      setImage(randomImageUrl);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      {image ? (
        <img
          class=" rounded-md h-[100px] overflow-hidden"
          src={image}
          alt="kategori Image"
        />
      ) : (
        <img
          src="/assets/user/images/no-picture.png"
          alt="kategori image"
          className="h-[100px] overflow-hidden rounded-md"
          loading="lazy"
        />
      )}
    </div>
  );
};

export default ImageKategori;
