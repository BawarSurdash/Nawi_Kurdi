import { Form, Input, Card } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

function Home() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // Filtered data for search
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Search state
  const limit = 20;
  const [selectedGender, setSelectedGender] = useState("M");
  const [selectedSort, setSelectedSort] = useState("both");

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://nawikurdi.com/api?limit=${limit}&offset=${offset}${
          selectedGender !== "all" ? `&gender=${selectedGender}` : ""
        }&sort=${selectedSort}`
      );

      const newNames = response.data.names || [];

      if (newNames.length < limit) {
        setHasMore(false);
      }

      const updatedData = [...data, ...newNames];

      setData(updatedData);
      setFilteredData(updatedData); // Update filteredData initially
      setOffset((prevOffset) => prevOffset + limit);
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

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item) =>
        item.name.toLowerCase().includes(query)
      );
      setFilteredData(filtered);
    }
  };

  return (
    <div className="page-container kurdish-font">
      {/* Header */}
      <div className="bg-blue-950 w-full h-15 my-5 flex items-center justify-center">
        <p className="text-white text-center text-xl">گەڕان و پاڵاوتن</p>
      </div>

      {/* Search Bar */}
      <div dir="rtl" className="flex flex-col justify-start m-2">
        <p>دەستەواژەیەک بنووسە بۆ گەڕان</p>
        <div className="p-3 kurdish-font">
          <Form.Item className="w-full m-2 kurdish-font">
            <Input
              dir="rtl"
              className="kurdish-font"
              placeholder="سەرەتایی ناوێک یان دەستەواژەیەک بنووسە..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </Form.Item>
        </div>
      </div>

      {/* Name List */}
      <div>
        <InfiniteScroll
          dataLength={filteredData.length}
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
            {filteredData.map((item, index) => (
              <div key={`${item.name}-${index}`} className="mb-4 flex justify-end">
                <Card
                  dir="rtl"
                  title={`${item.name} - ${
                    item.gender === "M" ? "کوڕ" : item.gender === "F" ? "کچ" : "هاوبەش"
                  }`}
                  variant="borderless"
                  className="kurdish-font transform-gpu"
                  style={{
                    width: "100%",
                    maxWidth: 800,
                    height: "auto",
                    backgroundColor: "#e5e7eb",
                    padding: "1rem",
                  }}
                >
                  <p className="kurdish-font mb-4 text-sm sm:text-base">{item.desc}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center text-sm">
                    <p
                      className="hover:bg-blue-950 hover:text-white p-2 transition-colors duration-200 cursor-pointer rounded-md"
                    >
                      {favorites.some((fav) => fav.name === item.name)
                        ? "زیاد کرا بۆ لیستی دڵخوازت"
                        : "زیاد بکا بۆ لیستی دڵخوازت"}
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
