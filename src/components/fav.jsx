import React, { useState, useEffect } from "react";
import { Card } from "antd";

const Fav = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Load favorites from localStorage when component mounts
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const handleRemoveFromFavorites = (itemToRemove) => {
    const updatedFavorites = favorites.filter(item => item.name !== itemToRemove.name);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div>
    <center>
      <div className="kurdish-font justify-center p-4">
        <h2 className="text-2xl text-center mb-6">ناوە دڵخوازەکان</h2>
        
        {/* Favorites Cards */}
        <div className="max-w-7xl mx-auto px-4">
          {favorites.length > 0 ? (
            favorites.map((item, index) => (
              <div key={`${item.name}-${index}`} className="mb-4">
              <Card 
  dir="rtl"
  title={`${item.name} - ${
    item.gender === 'M' ? 'کوڕ' : 
    item.gender === 'F' ? 'کچ' : 
    'هاوبەش'
  }`}
  variant="borderless"
  className="kurdish-font transform-gpu"
  style={{
    width: '100%', 
    maxWidth: 800, // Keep lg screens perfect
    height: 'auto', 
    backgroundColor: '#e5e7eb',
    padding: '1rem',
  }}
>
  <p className="kurdish-font mb-4 text-sm sm:text-base">{item.desc}</p>
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center">
    <p 
      onClick={() => handleRemoveFromFavorites(item)}
      className="hover:bg-red-600 hover:text-white p-2 transition-colors duration-200 cursor-pointer rounded-md text-xs sm:text-sm"
    >
      لابردن لیستی دڵخواز
    </p>
    <p className="hover:bg-blue-950 hover:text-white p-2 transition-colors duration-200 cursor-pointer rounded-md">
                  دەنگی ئەرێنی {item.positive_votes}
                </p>
                <p className="hover:bg-blue-950 hover:text-white p-2 transition-colors duration-200 cursor-pointer rounded-md">
                دەنگی نەرێنی {item.negative_votes}
              </p>
  </div>
</Card>

              </div>
            ))
          ) : (
            <div className="text-center p-4">
              <p>هیچ ناوێکی دڵخواز نییە</p>
            </div>
          )}
        </div>

        {/* Footer content */}
        <div className="flex justify-center items-center m-auto my-5">
          <p>له‌ لایه‌ن دره‌ختی گه‌شه‌پێده‌ران دروست كراوه‌</p>
        </div>
       
      </div>
      </center>
    </div>
  );
};

export default Fav;
