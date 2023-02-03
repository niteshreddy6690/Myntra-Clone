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
  padding: 36px 48px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  border-radius: 20px;
  text-align: center;
  p {
    margin-top: -10px;
    color: #777;
  }
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
  //   console.log("Drag Started", i);
  // };
  // const handelDragEnter = (e, i) => {
  //   console.log("Drag Entered", i);
  // };
  // const handelDragEnd = (e) => {
  //   console.log("drag Ended");
  // };
  const handelChange = (e) => {
    console.log("handelChangeTriggred");
    console.log(e.target.files);
    const selectedFiles = e.target.files;
    const selectedFileArray = Array.from(selectedFiles);
    const imageArray = selectedFileArray?.map((file) => {
      return { file: file, imgblob: URL.createObjectURL(file) };
    });
    console.log("image array", imageArray);
    setPreviewFiles((prev) => prev.concat(imageArray));
    e.currentTarget.value = null;
  };

  // useEffect(() => {}, [files]);

  console.log(previewFiles);
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
            </>
          ) : (
            <label htmlFor="file-upload">
              <img
                src={transparentFolderImage}
                draggable={false}
                style={{ width: "100px", height: "100px" }}
              />
              <p>Click here to upload</p>
            </label>
          )}
        </DraggableDiv>
      </Container>
    </Wrapper>
  );
};

export default Test3;
