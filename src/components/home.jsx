import { Form, Input, Card } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

function Home() {
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [votedNames, setVotedNames] = useState(() => {
    const saved = localStorage.getItem('votedNames');
    return saved ? JSON.parse(saved) : {};
  });
  const limit = 20;
  const [selectedGender, setSelectedGender] = useState('M');
  const [selectedSort, setSelectedSort] = useState('both');

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://nawikurdi.com/api?limit=${limit}&offset=${offset}${
          selectedGender !== 'all' ? `&gender=${selectedGender}` : ''
        }&sort=${selectedSort}`
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

  useEffect(() => {
    setData([]);
    setOffset(0);
    setHasMore(true);
    fetchData();
  }, [selectedGender, selectedSort]);

  const handleAddToFavorite = (item) => {
    setFavorites(prev => {
      const isExisting = prev.some(fav => fav.name === item.name);
      if (!isExisting) {
        const newFavorites = [...prev, item];
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
        return newFavorites;
      }
      return prev;
    });
  };

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  return (
    <div className="page-container kurdish-font">

      {/* Header */}
      <div className="bg-blue-950 w-full h-15 my-5 flex items-center justify-center">
        <p className="text-white text-center text-xl">گەڕان و پاڵاوتن</p>
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">

        {/* Gender Selection */}
        <div dir="rtl">
          <p className="mr-3">ڕەگەز</p>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 gap-2 p-4 w-full">
            <button 
              onClick={() => setSelectedGender('M')}
              className={`w-full text-center p-3 sm:p-4 ${
                selectedGender === 'M' ? 'bg-blue-950 text-white' : 'bg-gray-200'
              }`}
            >
              کوڕ
            </button>
            <button 
              onClick={() => setSelectedGender('F')}
              className={`w-full text-center p-3 sm:p-4 ${
                selectedGender === 'F' ? 'bg-blue-950 text-white' : 'bg-gray-200'
              }`}
            >
              کچ
            </button>
            <button 
              onClick={() => setSelectedGender('O')}
              className={`w-full text-center p-3 sm:p-4 ${
                selectedGender === 'O' ? 'bg-blue-950 text-white' : 'bg-gray-200'
              }`}
            >
              هاوبەش
            </button>
            <button 
              onClick={() => setSelectedGender('all')}
              className={`w-full text-center p-3 sm:p-4 ${
                selectedGender === 'all' ? 'bg-blue-950 text-white' : 'bg-gray-200'
              }`}
            >
              هەمووی
            </button>
          </div>
        </div>

        {/* Vote Sorting */}
        <div dir="rtl">
          <p className="mr-3">بە پێی دەنگ</p>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-2 p-4 w-full">
            <button 
              onClick={() => setSelectedSort('positive')}
              className={`w-full text-center p-3 ${
                selectedSort === 'positive' ? 'bg-blue-950 text-white' : 'bg-gray-200'
              }`}
            >
              بەناوبانگترین
            </button>
            <button 
              onClick={() => setSelectedSort('negative')}
              className={`w-full text-center p-3 ${
                selectedSort === 'negative' ? 'bg-blue-950 text-white' : 'bg-gray-200'
              }`}
            >
              کەمترین دەنگ
            </button>
            <button 
              onClick={() => setSelectedSort('all')}
              className={`w-full text-center p-3 ${
                selectedSort === 'all' ? 'bg-blue-950 text-white' : 'bg-gray-200'
              }`}
            >
              هەمووی
            </button>
          </div>
        </div> 

      </div>

      {/* Search Input */}
      <div dir="rtl" className="flex flex-col justify-start m-2">
        <p>دەستەواژەیەک بنووسە بۆ گەڕان</p>
        <div className="p-3 kurdish-font">
          <Form.Item className="w-full m-2 kurdish-font">
            <Input dir="rtl" className="kurdish-font" placeholder="سەرەتایی ناوێک یان دەستەواژەیەک بنووسە..." />
          </Form.Item>
        </div>
      </div>

      {/* Name List */}
      <div>
        <InfiniteScroll
          dataLength={data.length}
          next={fetchData}
          hasMore={hasMore}
          loader={<div className="text-center p-4"><p className="kurdish-font">چاوەڕێ بکە...</p></div>}
          endMessage={<div className="text-center p-4"><p className="kurdish-font">هەموو ناوەکان نیشان دران</p></div>}
        >
          <div className="max-w-7xl mx-auto px-4">
            {data.map((item, index) => (
              <div key={`${item.name}-${index}`} className="mb-4 flex justify-end">
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
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center text-sm">
                <p 
                  onClick={() => handleAddToFavorite(item)}
                  className="hover:bg-blue-950 hover:text-white p-2 transition-colors duration-200 cursor-pointer rounded-md"
                >
                  {favorites.some(fav => fav.name === item.name) 
                    ? 'زیاد کرا بۆ لیستی دڵخوازت' 
                    : 'زیاد بکا بۆ لیستی دڵخوازت'}
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
            ))}
          </div>
        </InfiniteScroll>
      </div>

    </div>
  );
}

export default Home;