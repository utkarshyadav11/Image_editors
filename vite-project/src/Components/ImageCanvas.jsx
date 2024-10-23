import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";

const ImageCanvas = ({ selectedImage }) => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Function to calculate responsive canvas dimensions
  const getCanvasDimensions = () => {
    const width = window.innerWidth < 800 ? window.innerWidth * 0.9 : 700;
    const height = window.innerHeight < 600 ? window.innerHeight * 0.5 : 500;
    return { width, height };
  };

  // Initialize the canvas
  useEffect(() => {
    const { width, height } = getCanvasDimensions();
    const newCanvas = new fabric.Canvas(canvasRef.current);
    setCanvas(newCanvas);

    // Set the initial canvas dimensions
    newCanvas.setWidth(width);
    newCanvas.setHeight(height);

    const handleResize = () => {
      const { width, height } = getCanvasDimensions();
      newCanvas.setWidth(width);
      newCanvas.setHeight(height);
      newCanvas.renderAll();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      newCanvas.dispose();
    };
  }, []);

  // Add image to the canvas when selectedImage changes
  useEffect(() => {
    if (selectedImage && canvas) {
      // Clear the canvas before adding a new image
      canvas.clear();

      // Load and add the image to the canvas
      fabric.Image.fromURL(
        selectedImage.urls.regular,
        (img) => {
          const canvasWidth = canvas.getWidth();
          const canvasHeight = canvas.getHeight();

          // Get the original dimensions of the image
          const imgWidth = img.width;
          const imgHeight = img.height;

          // Calculate the scaling factor to fit the image inside the canvas
          const scaleX = canvasWidth / imgWidth;
          const scaleY = canvasHeight / imgHeight;
          const scale = Math.min(scaleX, scaleY); // Maintain aspect ratio using the smaller scale factor

          // Center the image on the canvas
          const offsetX = (canvasWidth - imgWidth * scale) / 2;
          const offsetY = (canvasHeight - imgHeight * scale) / 2;

          // Set the image properties and scale it to fit the canvas
          img.set({
            left: offsetX, // Center horizontally
            top: offsetY, // Center vertically
            scaleX: scale,
            scaleY: scale,
            selectable: false, // Ensure the base image is not draggable
          });

          canvas.add(img);
          canvas.sendToBack(img); // Ensure image stays in the background
          setImageLoaded(true); // Mark the image as loaded
          canvas.renderAll();
        },
        { crossOrigin: "anonymous" } // Set crossOrigin for external images
      );
    }
  }, [selectedImage, canvas]);

  // Add editable and resizable text
  const addText = () => {
    if (!canvas) return;

    const text = new fabric.IText("Text....", {
      left: 100,
      top: 100,
      fontSize: 24,
      fill: "black",
      editable: true,
    });

    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.renderAll();
  };

  // Add resizable shapes (circle, rectangle, triangle)
  const addShape = (shape) => {
    if (!canvas) return;

    let shapeObj;
    if (shape === "circle") {
      shapeObj = new fabric.Circle({
        radius: 50,
        fill: "red",
        left: 150,
        top: 150,
        selectable: true,
      });
    } else if (shape === "rectangle") {
      shapeObj = new fabric.Rect({
        width: 100,
        height: 70,
        fill: "blue",
        left: 200,
        top: 200,
        selectable: true,
      });
    } else if (shape === "triangle") {
      shapeObj = new fabric.Triangle({
        width: 100,
        height: 100,
        fill: "green",
        left: 250,
        top: 250,
        selectable: true,
      });
    }

    canvas.add(shapeObj);
    canvas.renderAll();
  };

  // Log all canvas layers and their attributes for debugging
  const logCanvasLayers = () => {
    if (!canvas) return;

    const layers = canvas.getObjects().map((obj) => {
      const { type, left, top, width, height, fill, text } = obj;
      return {
        type, // E.g., 'circle', 'rect', 'text', 'image'
        left,
        top,
        width: width || obj.radius * 2 || obj.scaleX * obj.width, // Handle width for circles or scaled objects
        height: height || obj.radius * 2 || obj.scaleY * obj.height,
        fill: fill || (obj.getSrc ? obj.getSrc() : undefined), // Get image src if it's an image
        text: text || undefined, // If it's a text object
      };
    });

    console.log(layers); // Log the array of layer details
  };

  // Download the modified image as a PNG
  const downloadImage = () => {
    if (!canvas) return;

    const dataURL = canvas.toDataURL({
      format: "png",
      quality: 0.8,
    });

    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "modified_image.png";
    link.click();
  };

  return (
    <div className="image_editor">
      {/* Canvas where the image and elements will be displayed */}
      <canvas ref={canvasRef} className="canvas_body"></canvas>

      {/* Controls for adding captions, shapes, and downloading the image */}
      {imageLoaded && (
        <div className="controls">
          <button className="Control_button" onClick={addText}>Add Text</button>
          <button className="Control_button" onClick={() => addShape("circle")}>Add Circle</button>
          <button className="Control_button" onClick={() => addShape("rectangle")}>Add Rectangle</button>
          <button className="Control_button" onClick={() => addShape("triangle")}>Add Triangle</button>
          <button className="Control_button" onClick={logCanvasLayers}>Log Canvas Layers</button>
          <button className="Control_button" onClick={downloadImage}>Download Image</button>
        </div>
      )}
    </div>
  );
};

export default ImageCanvas;
