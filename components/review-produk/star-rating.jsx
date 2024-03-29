import React, { useState } from 'react';

const StarRating = ({handleRating,items,bintang}) => {
  

  return (
    <div>
      <p>Rating: {bintang}</p>
      <div className='flex justify-center my-10'>
        {items.map((item) => (
          <button type='button' key={item} onClick={() => handleRating(item)} className={item <= bintang ? 'text-yellow-500 text-[30px]' : 'text-gray-400 text-[30px]'}>
            ★
          </button>
        ))}
      </div>
    </div>
  );
};

export default StarRating;
