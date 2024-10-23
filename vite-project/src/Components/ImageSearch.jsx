import { useState } from "react";
import axios from "axios";
import "../ImageSearch.css"

const ImageSearch = ({ onImageSelect }) => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=1SGrLvc8jn-w10SWBisqVX21JtGCnwMp86Qy4dfNx6I`
      );
      setImages(response.data.results);
    } catch (error) {
      console.error("Error in  fetching images=", error);
    }
  };

  return (
    <div className="image_search">
      <input
        type="text"
        placeholder="I can find any image.."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="Search_button" onClick={fetchImages}>Search</button>

      <div className="image_results">
        {images.slice(0, 4).map((image) => ( // only 4 image will show as suggested in task
          <div key={image.id} className="image_item">
            <img src={image.urls.thumb} alt={image.Image_loading} />
            <button className="Caption_button" onClick={() => onImageSelect(image)}>Add Caption</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSearch;
