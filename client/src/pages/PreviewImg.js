import React, { useState } from "react";
import styled from "styled-components";
import addIcon from "../Assets/png/addIcon.png";
import transparentFolderImage from "../Assets/png/folder_icon_transparent.png";
import closeIconSvg from "../Assets/svg/CloseIcon.svg";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   background: #fff;
//   padding: 36px 48px;
//   box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
//     rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
//   border-radius: 20px;
//   text-align: center;
//   p {
//     margin-top: -10px;
//     color: #777;
//   }
// `;
// const Image = styled.img`
//   width: ${({ isLarge }) => (isLarge ? "150px" : "100px")};
//   height: ${({ isLarge }) => (isLarge ? "150px" : "100px")};
//   opacity: ${({ isLarge }) => (isLarge ? "1" : ".6")};
//   margin: 15px;
//   object-fit: cover;
//   border-radius: 5px;
// `;

// const Input = styled.input`
//   display: none;
// `;
const DraggableDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
  margin-top: 20px;
  border: 1.3px dashed #799cd9;
  border-radius: 5px;
  width: 500px;
  height: 400px;
  background-color: #fff;
`;

const ImagePreViewWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  position: relative;
`;
const ImagePreview = styled.div`
  position: relative;

  .closeIcon {
    background: #000;
    border-radius: 5px;
    opacity: 0.8;
    position: absolute;
    z-index: 10;
    right: 20px;
    top: 20px;
    width: 15px;
    height: 15px;
    cursor: pointer;
    :hover {
      opacity: 1;
    }
  }
`;
const Layout = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  place-items: center;
`;

const Container = styled.div`
  border: 1px dashed blue;
  border-radius: 5px;
  margin: 20px;
  width: 80%;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  overflow: scroll;
`;

const Image = styled.img`
  width: ${({ isLarge }) => (isLarge ? "150px" : "100px")};
  height: ${({ isLarge }) => (isLarge ? "150px" : "100px")};
  opacity: ${({ isLarge }) => (isLarge ? "1" : ".6")};
  margin: 15px;
  object-fit: cover;
  border-radius: 5px;
`;

const Input = styled.input`
  display: none;
`;

const Label = styled.label`
  cursor: pointer;
  .addImage-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-60%, -50%);
    color: #f1f6f5;
  }
`;

const PreviewImageContainer = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  margin: 10px;
  border-radius: 5px;
  background-color: #b2b2b2;
  .closeIcon {
    background: #000;
    border-radius: 5px;
    opacity: 0.8;
    position: absolute;
    z-index: 10;
    right: 10px;
    top: 10px;
    width: 15px;
    height: 15px;
    cursor: pointer;
    :hover {
      opacity: 1;
    }
  }
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
`;
const PreviewImg = () => {
  const [previewFiles, setPreviewFiles] = useState([]);
  const handelAddImages = (e) => {
    const selectedFiles = e.target.files;
    const selectedFileArray = Array.from(selectedFiles);
    const imageArray = selectedFileArray?.map((file) => {
      return {
        file: file,
        imageBlobUrl: URL.createObjectURL(file),
        imageType: file.type,
      };
    });
    setPreviewFiles((prevState) => prevState.concat(imageArray).slice(0, 6));
    e.currentTarget.value = null;
  };

  console.log(previewFiles);
  return (
    <Layout>
      <h1>Add Product images</h1>
      <h4>Add upto 10 Images</h4>
      {previewFiles.length > 10 ? (
        <p>You can upload only 10 Images Only</p>
      ) : null}
      <Container>
        {previewFiles.length > 0
          ? previewFiles?.map((image, i) => (
              <PreviewImageContainer>
                <img
                  src={closeIconSvg}
                  className="closeIcon"
                  onClick={() =>
                    setPreviewFiles(previewFiles.filter((e) => e !== image))
                  }
                />
                <PreviewImage
                  isLarge={i == 0 ? 1 : 0}
                  src={image.imageBlobUrl}
                />
              </PreviewImageContainer>
            ))
          : null}
        {previewFiles.length < 6 ? (
          <Label htmlFor="addImage">
            <Input
              id="addImage"
              type="file"
              multiple
              onChange={handelAddImages}
              accept="image/*"
            />
            <div
              style={{
                position: "relative",
                width: "250px",
                height: "250px",
              }}
            >
              <img
                src={addIcon}
                style={{
                  position: "absolute",
                  top: "70px",
                  left: "40px",
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  background: "#777",
                }}
              />
              <p className="addImage-text">Add Images</p>
              <img src={transparentFolderImage} />
            </div>
          </Label>
        ) : null}
      </Container>
    </Layout>
  );
};

export default PreviewImg;
