import  { useState } from "react";
import ImageSearch from "./Components/ImageSearch"
import ImageCanvas from "./Components/ImageCanvas"
import "./Global.css"

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="app-container">
      <h1>Image Editor</h1>
      <ImageSearch onImageSelect={setSelectedImage} />
      {selectedImage && <ImageCanvas selectedImage={selectedImage} />}
    </div>
  );
};

export default App;
