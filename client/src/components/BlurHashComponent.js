import React, { useEffect, useState } from "react";
import { encodeImageToBlurhash } from "./encode";
import { Blurhash } from "react-blurhash";

const BlurHashComponent = ({ image, src, blurHashUrl }) => {
  
  return (
    <div>
      {/* <h1>{blurHashUrl}</h1> */}
      <Blurhash
        hash={blurHashUrl}
        width="380px"
        height="450px"
        resolutionX={32}
        resolutionY={32}
        punch={1}
      />
    </div>
  );
};

export default BlurHashComponent;
