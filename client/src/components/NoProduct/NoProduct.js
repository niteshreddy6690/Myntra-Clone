import React, { useState } from 'react'
import SearchHanger from "../../Assets/png/search404.png"
import { Wrapper,Container,NavLink } from './NoProductStyles'
import {useSearchParams ,useNavigate} from "react-router-dom";

const NoProduct = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams()
    const [searchInputText,setSearchInputText] = useState("")

    
  const handleKeyPress = async (event) => {
    
    if (event?.key === "Enter") {
      const { name, value } = event?.target;
      
      const params = new URLSearchParams({ [name]: value });
      navigate({
        pathname: "/"+value,
        search: "rawQuery"+params.toString(),
      });
    }
  };

  return (
    <Wrapper>
        <center>
            <Container>
                <div>
                <p>You searched for <span className="index-searchTerm">{searchParams?.get('rawQuery')}</span></p>
                <img  className="searchHAngerClass" src={SearchHanger} alt="Search hanger" />
                <p className="index-infoBig"> We couldn't find any matches! </p>
                <p className="index-infoSmall">Please check the spelling or try searching something else</p>
                </div>
                <div className="index-searchBox">
                    <input type="text" className="index-inputBox" value={searchInputText} placeholder="Shoes, T-shirts, Tops etc."  onChange={(e)=>setSearchInputText(e.target.value)} onKeyPress={handleKeyPress}/>
                        <NavLink to={searchInputText?`/${searchInputText}?rawQuery=${searchInputText}`:"/"} className="index-searchBtn"> SEARCH </NavLink>
                        </div>
            </Container>
        </center>
        </Wrapper>
  )
}

export default NoProduct