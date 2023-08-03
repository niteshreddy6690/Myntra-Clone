import { encode } from "blurhash";

export const loadImage = async (src) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (...args) => reject(args);
    img.src = src;
    img.crossOrigin = "Anonymous";
  });

export const getImageData = (image) => {
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

export const encodeImageToBlurhash = async (imageUrl) => {

  const image = await loadImage(imageUrl);
  const imageData = getImageData(image);
  if (imageData)
    return encode(imageData.data, imageData.width, imageData.height, 4, 4);
  throw Error("There is no image data");
};
