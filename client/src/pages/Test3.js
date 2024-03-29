import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import transparentFolderImage from "../Assets/png/folder_icon_transparent.png";
import closeIconSvg from "../Assets/svg/CloseIcon.svg";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 36px 38px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  border-radius: 20px;
  text-align: center;
`;
const Image = styled.img`
  width: ${({ isLarge }) => (isLarge ? "150px" : "100px")};
  height: ${({ isLarge }) => (isLarge ? "150px" : "100px")};
  opacity: ${({ isLarge }) => (isLarge ? "1" : ".9")};
  margin: 15px;
  object-fit: cover;
  border-radius: 5px;
`;

const Input = styled.input`
  display: none;
`;
const DraggableDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
  margin-top: 20px;
  border: 1.3px dashed #799cd9;
  border-radius: 5px;
  min-width: 450px;
  min-height: 350px;
  width: 450px;
  background-color: #fff;

  label {
    width: 100px;
    margin: 0 0 0 10px;
    cursor: pointer;
  }
  label p {
    margin-top: -20px;
    color: #0a0a0a;
  }
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
// const DraggableElement = styled.div``;
const Test3 = () => {
  const [files, setFile] = useState(null);
  const [previewFiles, setPreviewFiles] = useState([]);

  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const handelSort = () => {
    let _previewFiles = [...previewFiles];

    //remove and save the dragged item content
    const draggedItemContent = _previewFiles.splice(dragItem.current, 1)[0];

    //switch the position
    _previewFiles.splice(dragOverItem.current, 0, draggedItemContent);

    //reset the position ref
    dragItem.current = null;
    dragOverItem.current = null;

    setPreviewFiles(_previewFiles);
  };
  // const handelDragStart = (e, i) => {
  //   
  // };
  // const handelDragEnter = (e, i) => {
  //   
  // };
  // const handelDragEnd = (e) => {
  //   
  // };
  const handelChange = (e) => {
    
    
    const selectedFiles = e.target.files;
    const selectedFileArray = Array.from(selectedFiles);
    const imageArray = selectedFileArray?.map((file) => {
      return {
        file: file,
        imgblob: URL.createObjectURL(file),
        imageType: file.type,
      };
    });
    
    setPreviewFiles((prev) => prev.concat(imageArray).slice(0, 6));
    e.currentTarget.value = null;
  };

  // useEffect(() => {}, [files]);

  
  return (
    <Wrapper>
      <Container>
        <h1>Upload Product Images</h1>
        <p>Select multiple images </p>

        <DraggableDiv>
          <Input
            id="file-upload"
            type="file"
            onChange={handelChange}
            multiple
            accept="image/*"
          />
          {previewFiles.length > 0 ? (
            <>
              {previewFiles?.map((img, i) => (
                <ImagePreViewWrapper>
                  <ImagePreview
                    key={i}
                    draggable
                    onDragStart={(e) => (dragItem.current = i)}
                    onDragEnter={(e) => (dragOverItem.current = i)}
                    onDragEnd={handelSort}
                  >
                    <Image src={img.imgblob} isLarge={i == 0 ? 1 : 0} />
                    <div
                      onClick={() =>
                        setPreviewFiles(previewFiles.filter((e) => e != img))
                      }
                    >
                      <img className="closeIcon" src={closeIconSvg} />
                    </div>
                  </ImagePreview>
                </ImagePreViewWrapper>
              ))}
              {previewFiles.length < 6 && previewFiles.length !== 0 ? (
                <label htmlFor="file-upload">
                  <img
                    src={transparentFolderImage}
                    draggable={false}
                    style={{ width: "100px", height: "100px" }}
                    alt="Upload"
                  />
                  <p>Add {6 - previewFiles.length} more Photo</p>
                </label>
              ) : null}
            </>
          ) : (
            <div draggable={false}>
              <label htmlFor="file-upload">
                <img
                  src={transparentFolderImage}
                  draggable={false}
                  style={{ width: "100px", height: "100px" }}
                  alt="Upload"
                />
                <p>Click here to upload</p>
              </label>
            </div>
          )}
        </DraggableDiv>
      </Container>
    </Wrapper>
  );
};

export default Test3;
