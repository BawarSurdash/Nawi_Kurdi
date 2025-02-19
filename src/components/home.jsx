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

  const handleAddToFavorite = (item) => {
    setFavorites(prev => {
      // Check if item is already in favorites
      const isExisting = prev.some(fav => fav.name === item.name);
      if (!isExisting) {
        // Store favorites in localStorage
        const newFavorites = [...prev, item];
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
        return newFavorites;
      }
      return prev;
    });
  };

  const handleVote = async (item, voteType) => {
    // Check if user has already voted for this name
    if (votedNames[item.name]) {
      alert('You have already voted for this name!');
      return;
    }

    try {
      const response = await axios.post(`https://nawikurdi.com/api/vote`, {
        name_id: item.id,
        vote_type: voteType // 'positive' or 'negative'
      });

      if (response.status === 200) {
        // Update local state with the new vote count
        setData(prevData => 
          prevData.map(nameItem => {
            if (nameItem.id === item.id) {
              return {
                ...nameItem,
                positive_votes: voteType === 'positive' 
                  ? parseInt(nameItem.positive_votes) + 1 
                  : parseInt(nameItem.positive_votes),
                negative_votes: voteType === 'negative' 
                  ? parseInt(nameItem.negative_votes) + 1 
                  : parseInt(nameItem.negative_votes)
              };
            }
            return nameItem;
          })
        );

        // Save voted status to localStorage
        const newVotedNames = { ...votedNames, [item.name]: true };
        setVotedNames(newVotedNames);
        localStorage.setItem('votedNames', JSON.stringify(newVotedNames));
      }
    } catch (error) {
      console.error("Error voting:", error);
      alert('Failed to submit vote. Please try again.');
    }
  };

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setData([]);
    setOffset(0);
    setHasMore(true);
    fetchData();
  }, [selectedGender, selectedSort]);

  return (
    <div className="page-container kurdish-font">

    <div className="bg-blue-950 w-full h-15 my-5 flex items-center justify-center">
    <p className="text-white text-center text-xl">گەڕان و پاڵاوتن</p>
    </div>

    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 ">

    
    <div dir="rtl" >
    <p className="mr-3">ڕەگەز</p>
    <div className="grid sm:grid-cols-1 sm:w- md:grid-cols-2 lg:grid-cols-4 items-center justify-center gap-2 p-4 ">
    <button 
      onClick={() => setSelectedGender('M')}
      className={`text-center kurdish-font hover:text-white cursor-pointer p-3 transition-all duration-300 ${
        selectedGender === 'M' ? 'bg-blue-950 text-white' : 'bg-gray-200 hover:bg-blue-950'
      }`}
    >
      کوڕ
    </button>
    <button 
      onClick={() => setSelectedGender('F')}
      className={`text-center kurdish-font hover:text-white cursor-pointer p-3 transition-all duration-300 ${
        selectedGender === 'F' ? 'bg-blue-950 text-white' : 'bg-gray-200 hover:bg-blue-950'
      }`}
    >
      کچ
    </button>
    <button 
      onClick={() => setSelectedGender('O')}
      className={`text-center kurdish-font hover:text-white cursor-pointer p-3 transition-all duration-300 ${
        selectedGender === 'O' ? 'bg-blue-950 text-white' : 'bg-gray-200 hover:bg-blue-950'
      }`}
    >
      هاوبەش
    </button>
    <button 
      onClick={() => setSelectedGender('all')}
      className={`text-center kurdish-font hover:text-white cursor-pointer p-3 transition-all duration-300 ${
        selectedGender === 'all' ? 'bg-blue-950 text-white' : 'bg-gray-200 hover:bg-blue-950'
      }`}
    >
      هەمووی
    </button>
    </div>
    </div>
    <div dir="rtl" className="">
    <p className="mr-3">بە پێی دەنگ </p>
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center gap-2 p-4">
    <button 
      onClick={() => setSelectedSort('positive')}
      className={`text-center kurdish-font hover:text-white cursor-pointer p-3 transition-all duration-300 ${
        selectedSort === 'positive' ? 'bg-blue-950 text-white' : 'bg-gray-200 hover:bg-blue-950'
      }`}
    >
      بەناوبانگترین
    </button>
    <button 
      onClick={() => setSelectedSort('negative')}
      className={`text-center kurdish-font hover:text-white cursor-pointer p-3 transition-all duration-300 ${
        selectedSort === 'negative' ? 'bg-blue-950 text-white' : 'bg-gray-200 hover:bg-blue-950'
      }`}
    >
      کەمترین دەنگ
    </button>
    <button 
      onClick={() => setSelectedSort('all')}
      className={`text-center kurdish-font hover:text-white cursor-pointer p-3 transition-all duration-300 ${
        selectedSort === 'all' ? 'bg-blue-950 text-white' : 'bg-gray-200 hover:bg-blue-950'
      }`}
    >
      هەمووی
    </button>
    </div>
    </div> 

    </div>

    <div dir="rtl" className="flex flex-col  justify-start m-2">
    <div>    <p>دەستەواژەیەک بنووسە بۆ گەڕان</p>
    </div>
    <div className="p-3 kurdish-font">
    <Form.Item className="w-full m-2 kurdish-font">
    <Input dir="rtl" className="kurdish-font" placeholder="   سەرەتایی ئەو ناوە یان دەستەواژەیە بنووسە کە لە خەیاڵتە وەک ئار...." />
    <style>
      {`
        .ant-input {
          border-radius: 10px;
          padding: 10px;
        }
      `}
    </style>  
  </Form.Item>
    </div>
    </div>


<div>
  <InfiniteScroll
    dataLength={data.length}
    next={fetchData}
    hasMore={hasMore}
    loader={
      <div className="text-center p-4">
        <p className="kurdish-font">چاوەڕێ بکە...</p>
      </div>
    }
    endMessage={
      <div className="text-center p-4">
        <p className="kurdish-font">هەموو ناوەکان نیشان دران</p>
      </div>
    }
  >
    <div className="max-w-7xl mx-auto px-4">
      {data.map((item, index) => (
        <div key={`${item.name}-${index}`} className="mb-4 flex justify-end">
          <Card 
            dir="rtl"
            title={`${item.name} - ${item.gender}`}
            variant="borderless"
            className="kurdish-font transform-gpu"
            style={{
              width: 800,
              height: 220,
              backgroundColor: '#e5e7eb',
              maxWidth: '100%'
            }}
          >
            <p className="kurdish-font mb-6">{item.desc}</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center">
              <p 
                onClick={() => handleAddToFavorite(item)}
                className="hover:bg-blue-950 hover:text-white p-2 transition-colors duration-200 cursor-pointer rounded-md"
              >
                {favorites.some(fav => fav.name === item.name) ? 'Added to Favorites' : 'Add to Favorite'}
              </p>
              <p 
                onClick={() => handleVote(item, 'positive')}
                className={`hover:bg-blue-950 hover:text-white p-2 transition-colors duration-200 cursor-pointer rounded-md ${
                  votedNames[item.name] ? 'opacity-50' : ''
                }`}
              >
                positive vote {item.positive_votes}
              </p>
              <p 
                onClick={() => handleVote(item, 'negative')}
                className={`hover:bg-blue-950 hover:text-white p-2 transition-colors duration-200 cursor-pointer rounded-md ${
                  votedNames[item.name] ? 'opacity-50' : ''
                }`}
              >
                negative vote {item.negative_votes}
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