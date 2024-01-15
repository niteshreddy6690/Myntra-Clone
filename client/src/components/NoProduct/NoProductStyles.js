import { Link } from "react-router-dom";
import styled from "styled-components";


export const Wrapper=styled.div`
padding: 20px 10px ;
`

export const NavLink=styled(Link)`
all:unset;
`
export const Container=styled.div`
box-sizing: content-box;
.searchHAngerClass{
    display: inline-block;
    margin: 30px 0;
    min-height: 53px;
    width: 200px;
}
.index-searchTerm {
    color: #3466e8;
    font-weight: 700;
}

.index-infoBig {
    font-size: 32px;
    color: #282c3f;
    margin-bottom: 10px;
    margin-top: 20px;
}
.index-infoSmall {
    font-size: 14px;
    margin-bottom: 25px;
    color: #94969f;
    margin-top: 10px;
}
.index-searchBox {
    display: inline-block;
    width: 700px;
    margin-top: 30px;
    font-size: 16px;
    @media screen and  (max-width:720px){
        width:80%
    }
}
.index-inputBox {
    border: 1px solid #ccc;
    padding: 10px 5px;
    width: 70%;
    outline: 0;
}
.index-searchBtn {
    padding: 10px 20px;
    border: 2px solid #ccc;
    border-left: none;
    color: #3466e8;
    font-weight: 700;
    font-size: 16px;
    outline: 0;
    cursor: pointer;
}

`