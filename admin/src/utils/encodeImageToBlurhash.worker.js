import { encode } from "blurhash";

// Note: You'll need to import the blurhash library in the worker thread as well


const loadImage = async (src) =>
  new Promise((resolve, reject) => {
     const img = new Image();
     img.onload = () => resolve(img);
    img.onerror = (...args) => reject(args);
     img.src = src;
     img.crossOrigin = "Anonymous";  
     });


     const getImageData = async (image) => {
        const canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        const context = canvas.getContext("2d");
        if (context) {
          context.drawImage(image, 0, 0);
          return context.getImageData(0, 0, image.width, image.height);
        }
        throw Error("There is no canvas context");
      };


onmessage = async (event) => {
    
  const imageUrl = event.data;
  const image = await loadImage(imageUrl);
  const imageData = await getImageData(image);

  try {
    const blurhash = encode(imageData.data, imageData.width, imageData.height, 4, 4);
    
    postMessage(blurhash);
  } catch (error) {
    postMessage(error);
  }
};

onmessage = async (event) => {
    const { imageUrl, action } = event.data;
    const image = await loadImage(imageUrl);
    const imageData = await getImageData(image);
  
    try {
        if (action === 'encodeImageToBlurhash') {
            const blurhash = encode(imageData.data, imageData.width, imageData.height, 4, 4);
            postMessage({ result: blurhash });
          } else {
            throw new Error('Invalid action');
          }
    } catch (error) {
      postMessage(error);
    }
 
  };