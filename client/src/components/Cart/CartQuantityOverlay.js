import React,{useState,useEffect} from 'react'
import styled from "styled-components";
import ClearIcon from "@mui/icons-material/Clear";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 12;
  background-color: rgba(0, 0, 0, 0.4);
  display: ${({ isSetQty }) => (isSetQty ? "block" : "none")};
  overflow: hidden;
  height: 100%;
  width: 100%;
`;

export const QuantityOverlayWrapper = styled.div`
  z-index: 15;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -100%);
  display: ${({ isSetQty }) => (isSetQty ? "block" : "none")};
  border: 1px solid #d4d5d9;
  box-shadow: 0 0 8px rgba(0,0,0,.1);
  border-radius: 5px;
`;
export const QuantityOverlayContainer = styled.div`
  width: 306px;
  padding: 0 16px;
  border: 1px solid #d4d5d9;
  position: relative;
  overflow: hidden;
  margin: auto;
  background-color: #fff;
  border-radius: 4px;

  .dialogs_base_header{
    margin: 16px;
    padding: 19px 0 18px 8px;
    font-weight: 700;
    font-size: 16px;
    border-bottom: 1px solid #f5f5f6;
  }
  .dialogs_base_qtyList{
    max-height: 200px;
    padding: 16px 0 0 8px;
  }
  .dialogs_base_qtyList .dialogs_base_item {
    height: 40px;
    cursor: pointer;
    font-size: 16px;
    position: relative;
    padding: 10px 12px;
    border: 1px solid #535766;
    border-radius: 50px;
    display: inline-block;
    margin-right: 12px;
    margin-bottom: 16px;
}
.selected_Quantity{
    height: 40px;
    cursor: pointer;
    font-size: 16px;
    position: relative;
    padding: 10px 12px;
    border-radius: 50px;
    display: inline-block;
    margin-right: 12px;
    margin-bottom: 16px;
    border: 1px solid #ff3e6c;
    color: #ff3e6c;
}
 .dialogs_base_display {
    font-weight: 700;
    font-size: 16px;
    min-width: 14px;
    line-height: normal;
    text-align: center;
}
.done_quantity{
    font-size: 14px;
    padding: 10px 16px;
    width: 100%;
    letter-spacing: 1px;
    margin-top: 16px;
    margin-bottom: 16px;
    font-weight: 700;
    border-radius: 2px;
    border-width: 0px;
    background-color: rgb(255, 63, 108);
    color: rgb(255, 255, 255);
    cursor: pointer;
}

.done_quantity_text{
    box-sizing: border-box;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    display: flex;
}
`
export const StyledClearIcon = styled(ClearIcon)`
position: absolute;
top: 24px;
right: 24px;
cursor: pointer;
`;

let QuantityArray = [...Array(10).keys()].map(i => i + 1);
const CartQuantityOverlay = ({handelSelectQty,isSetQty,product,handelUpdateSizeAndQuantity}) => {
    const [selectedQuantity, setSelectedQuantity] = useState(null);

    const handelSelectedQty = (Quantity) => {
        setSelectedQuantity(Quantity);
      };
    

    
      useEffect(() => {
        setSelectedQuantity(product?.quantity);
      }, []);
    //   
  return (
    <>
    <Overlay onClick={handelSelectQty} isSetQty={isSetQty}></Overlay>
    <QuantityOverlayWrapper isSetQty={isSetQty}>
       <QuantityOverlayContainer>
       <StyledClearIcon onClick={() => handelSelectQty()} />
       <div className="dialogs_base_header">Select Quantity</div>
       <div className="dialogs_base_qtyList">
       {QuantityArray.map(i=><div key={i}  className={ selectedQuantity == i ?"selected_Quantity":"dialogs_base_item"} onClick={()=>{ 
handelSelectedQty(i)}}>
                <div className='dialogs_base_display'>{i}</div></div>)}
       </div>

       <div className='done_quantity' onClick={()=>{
        handelUpdateSizeAndQuantity(
                product?.productId?._id,
                null,
                product?._id,
                selectedQuantity
              );handelSelectQty();}}><div className="done_quantity_text">DONE</div></div>
       </QuantityOverlayContainer>
    </QuantityOverlayWrapper>
    </>
  )
}

export default CartQuantityOverlay