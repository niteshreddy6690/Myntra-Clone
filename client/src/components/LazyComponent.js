import React, { useState, useEffect, useRef } from "react";

const config = {
  rootMargin: "0px 0px 0px 0px",
  threshold: 0,
};

function LazyComponent({ children }) {
  let ref = useRef();
  const loadImages = (image) => {
    image.src = image.dataset.src;
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

  const childElement = React.Children.only(children);
  return React.cloneElement(childElement, { ref: (el) => (ref = el) });
}

export default LazyComponent;
