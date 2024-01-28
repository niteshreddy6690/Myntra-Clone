// LazyImage.js
import React, { useRef, useEffect, useState } from "react";
import { Blurhash } from "react-blurhash";
const LazyImage = ({ src, alt, blurHashUrl, width, height }) => {
  const imageRef = useRef();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadImages = (image) => {
      image.src = image.dataset.src;
      image.onload = () => {
        setIsLoaded(true);
      };
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadImages(entry.target);
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(imageRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {!isLoaded && blurHashUrl && (
        <Blurhash
          hash={blurHashUrl}
          width={width}
          height={height}
          resolutionX={32}
          resolutionY={32}
          punch={1}
        />
      )}
      <img
        ref={imageRef}
        data-src={src}
        alt={alt}
        width={width}
        height={height}
        style={{
          width: "100%",
          height: "100%",
          filter: isLoaded ? "none" : "blur(0px)", // Apply blur effect if not loaded sice we are using BlurhashString we don't need any Blur effect
          opacity: isLoaded ? 1 : 0,
          transition: "filter 0.5s linear transform 0.4s", // Smoothly transition opacity and filter
          position: "absolute",
          objectFit: "cover",
          objectPosition: "top",
          top: 0,
          left: 0,
        }}
      />
    </>
  );
};

export default LazyImage;
