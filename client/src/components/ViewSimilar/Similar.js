import React, { useEffect, useState } from "react";
import {
  Wrapper,
  Overlay,
  SimilarContainer,
  SimilarHeaderContainer,
  SimilarHeader,
  SimilarContent,
  Icon,
  Ul,
  Li,
  NavLink,
  Image,
  ProductMetaInfo,
  ProductHeader3,
  ProductHeader4,
  ProductPriceContainer,
  ProductDiscountedPrice,
  ProductOriginalPrice,
  ProductDiscountPercentage,
} from "./Similar.styles";
import ClearIcon from "@mui/icons-material/Clear";
import { request } from "../../api/axios";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import LazyImage from "../LazyImage";

const Similar = ({ open, similarProduct, handelClick }) => {
  const [similarUniqueProducts, setSimilarUniqueProducts] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const getSimilarProducts = async (id) => {
    const response = await request.get(`/products/related/${id}`);
    if (response) {
      const arrays = [
        response?.data?.SimilarBrandProduct,
        response?.data?.SimilarCategoryProducts,
        response?.data?.SimilarColorProduct,
      ];
      const mergedArray = [].concat(...arrays.filter((arr) => arr.length > 0));

      // Shuffle the merged array using the Fisher-Yates algorithm
      for (let i = mergedArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [mergedArray[i], mergedArray[j]] = [mergedArray[j], mergedArray[i]];
      }

      // Remove duplicates by converting to a Set and back to an array
      const uniqueMergedArray = mergedArray.reduce((accumulator, current) => {
        const existing = accumulator?.find(
          (item) => item?._id === current?._id
        );
        if (!existing) {
          accumulator.push(current);
        }
        return accumulator;
      }, []);
      setSimilarUniqueProducts(uniqueMergedArray);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getSimilarProducts(similarProduct?._id);
  }, [similarProduct]);

  return (
    <div>
      <Overlay onClick={() => handelClick(open)} open={open}></Overlay>
      <Wrapper open={open}>
        {!isLoading ? (
          <SimilarContainer>
            <SimilarHeaderContainer>
              <SimilarHeader>Similar Products</SimilarHeader>
              <Icon>
                <ClearIcon onClick={() => handelClick(open)} />
              </Icon>
            </SimilarHeaderContainer>
            <SimilarContent>
              <div className="results-similarItemContainer">
                <Ul>
                  {similarUniqueProducts?.map((product, i) => (
                    <Li key={i}>
                      <NavLink
                        to={`/${product.gender.toLowerCase()}/${product.brand
                          .replaceAll(" ", "-")
                          .toLowerCase()}/${product.description
                          .replaceAll(" ", "-")
                          .toLowerCase()}/${product._id}/buy`}
                      >
                        <div className="image-Container">
                          {/* <Image src={product.images[0]?.url} /> */}
                          <LazyImage
                            key={`${product.images[0]?.name}-${i}`}
                            src={`${product.images[0]?.url}&tr=q-70`}
                            alt={product.images[0]?.name}
                            width="100%"
                            height="100%"
                            loading="lazy"
                            placeholderSrc={`${product.images[0]?.url}&tr=w-50,h-50,bl-20,q-50:w-250,h-320`}
                            blurHashUrl={product.images[0]?.blurHashUrl}
                          />
                        </div>
                        <ProductMetaInfo>
                          <ProductHeader3>{product.brand}</ProductHeader3>
                          <ProductHeader4>{product.Desc}</ProductHeader4>
                          <ProductPriceContainer>
                            <span>
                              <ProductDiscountedPrice>
                                {`Rs. ${Math.floor(
                                  product.price -
                                    product.price *
                                      (product.discountPercentage / 100)
                                )}`}
                              </ProductDiscountedPrice>
                              <ProductOriginalPrice>
                                {product.price}
                              </ProductOriginalPrice>
                            </span>
                            <ProductDiscountPercentage>
                              {`(${product.discountPercentage}%OFF)`}
                            </ProductDiscountPercentage>
                          </ProductPriceContainer>
                        </ProductMetaInfo>
                      </NavLink>
                    </Li>
                  ))}
                </Ul>
              </div>
            </SimilarContent>
          </SimilarContainer>
        ) : (
          <LoadingSpinner loading={isLoading} />
        )}
      </Wrapper>
    </div>
  );
};

export default Similar;
