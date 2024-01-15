import { encode } from "blurhash";

const loadImage = async (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (error) => reject(error);
    img.src = src;
    img.crossOrigin = "Anonymous";
  });
};

const getImageData = async (image) => {
  const canvas = new OffscreenCanvas(image.width, image.height);
  const context = canvas.getContext("2d");
  if (context) {
    context.drawImage(image, 0, 0);
    return context.getImageData(0, 0, image.width, image.height);
  }
  throw new Error("There is no canvas context");
};

export const encodeImageToBlurhash = async (imageUrl) => {
  try {
    const image = await loadImage(imageUrl);
    const bitmap = await createImageBitmap(image);
    const imageData = await getImageData(bitmap);
    if (imageData) {
      return encode(imageData.data, imageData.width, imageData.height, 4, 4);
    }
    throw new Error("There is no image data");
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
};






// not a efficient code #No :1
// import { encode } from "blurhash";

// const loadImage = async (src) =>
//   new Promise((resolve, reject) => {
//     const img = new Image();
//     img.onload = () => resolve(img);
//     img.onerror = (...args) => reject(args);
//     img.src = src;
//     img.crossOrigin = "Anonymous";
//   });

// const getImageData = async (image) => {
//   const canvas = document.createElement("canvas");
//   canvas.width = image.width;
//   canvas.height = image.height;
//   const context = canvas.getContext("2d");
//   if (context) {
//     context.drawImage(image, 0, 0);
//     return context.getImageData(0, 0, image.width, image.height);
//   }
//   throw Error("There is no canvas context");
// };

// export const encodeImageToBlurhash = async (imageUrl) => {
//   const image = await loadImage(imageUrl);
//   const imageData = await getImageData(image);
//   if (imageData)
//     return encode(imageData.data, imageData.width, imageData.height, 4, 4);
//   throw Error("There is no image data");
// };