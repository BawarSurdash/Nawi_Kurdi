import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

const Home = () => {
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [hasMore, setHasMore] = useState(true);
  const [genderFilter, setGenderFilter] = useState('M');
  const [sortFilter, setSortFilter] = useState('both');

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://nawikurdi.com/api?limit=${limit}&offset=${offset}&gender=${genderFilter}&sort=${sortFilter}`
      );
      const newNames = response.data.names || [];

      if (newNames.length < limit) {
        setHasMore(false);
      }

      setData(prevData => [...prevData, ...newNames]);
      setOffset(prevOffset => prevOffset + limit);
    } catch (error) {
      console.error("Error fetching data:", error);
      setHasMore(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
        <button 
          onClick={() => setGenderFilter('M')}
          className="text-center kurdish-font hover:text-white cursor-pointer p-3 hover:bg-blue-950 bg-gray-200 transition-all duration-300">
          کوڕ
        </button>
        <button 
          onClick={() => setGenderFilter('F')}
          className="text-center kurdish-font hover:text-white cursor-pointer p-3 hover:bg-blue-950 bg-gray-200 transition-all duration-300">
          کچ
        </button>
        <button 
          onClick={() => setGenderFilter('both')}
          className="text-center kurdish-font hover:text-white cursor-pointer p-3 hover:bg-blue-950 bg-gray-200 transition-all duration-300">
          هاوبەش
        </button>
        <button 
          onClick={() => setGenderFilter('all')}
          className="text-center kurdish-font hover:text-white cursor-pointer p-3 hover:bg-blue-950 bg-gray-200 transition-all duration-300">
          هەمووی
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <button 
          onClick={() => setSortFilter('popular')}
          className="text-center kurdish-font hover:text-white cursor-pointer p-3 hover:bg-blue-950 bg-gray-200 transition-all duration-300">
          بەناوبانگترین
        </button>
        <button 
          onClick={() => setSortFilter('least')}
          className="text-center kurdish-font hover:text-white cursor-pointer p-3 hover:bg-blue-950 bg-gray-200 transition-all duration-300">
          کەمترین دەنگ
        </button>
        <button 
          onClick={() => setSortFilter('all')}
          className="text-center kurdish-font hover:text-white cursor-pointer p-3 hover:bg-blue-950 bg-gray-200 transition-all duration-300">
          هەمووی
        </button>
      </div>
      <InfiniteScroll
        dataLength={data.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        {data.map((name, index) => (
          <div key={index}>{name}</div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default Home;