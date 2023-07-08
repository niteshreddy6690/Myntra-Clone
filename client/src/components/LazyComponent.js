import React, { useState, useEffect, useRef } from "react";
import { Blurhash } from "react-blurhash";
const config = {
  rootMargin: "500px 0px 0px 0px",
  threshold: 0,
};

function LazyComponent({ children }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  let ref = useRef();
  const loadImages = (image) => {
    image.src = image.dataset.src;
    image.onload = () => {
      setImageLoaded(true);
    };
  };
  useEffect(() => {
    let observer = new IntersectionObserver(function (entries, self) {
      console.log("entries", entries);
      console.log("self", self);
      // iterate over each entry
      entries.forEach((entry) => {
        console.log("entries11", entries);
        // process just the images that are intersecting.
        // isIntersecting is a property exposed by the interface
        if (entry.isIntersecting) {
          // custom function that copies the path to the img
          // from data-src to src
          loadImages(entry.target);
          // the image is now in place, stop watching
          self.unobserve(entry.target);
        }
      });
    }, config);

    observer.observe(ref.current);

    return () => {
      if (ref && ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const imageStyle = {
    filter: imageLoaded ? "none" : "blur(10px)",
    transition: "filter 0.5s linear",
  };

  // const imgStyle = imageLoaded
  //   ? { opacity: "1", transition: "opacity 450ms linear" }
  //   : {
  //       opacity: "0",
  //       filter: "blur(10px)",
  //       transition: "opacity 450ms linear",
  //     };
  // return React.cloneElement(children, { style: imageStyle, ref });
  // const childElement = React.Children.only(children);
  // return React.cloneElement(childElement, { ref: (el) => (ref = el) });

  return (
    <div>
      {/* {!imageLoaded && (
        <Blurhash
          hash="LEHV6nWB2yk8pyo0adR*.7kCMdnj"
          width={"100%"}
          height={"100%"}
          resolutionX={32}
          resolutionY={32}
          punch={1}
        />
      )} */}
      {React.cloneElement(children, { style: imageStyle, ref })}
    </div>
  );
}

export default LazyComponent;
