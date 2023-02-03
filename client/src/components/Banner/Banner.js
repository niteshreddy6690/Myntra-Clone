import React, { useState } from "react";
import { BannerContainer, BannerContentContainer } from "./Banner.styles";
import { GoTriangleLeft, GoTriangleRight } from "react-icons/go";

const Banner = () => {
  const [isClick, setClick] = useState(false);

  const togdleArrow = () => {
    setClick((prevState) => !prevState);
  };
  return (
    <>
      <BannerContainer onClick={togdleArrow} isClick={isClick}>
        {isClick ? (
          <GoTriangleRight style={{ fontSize: "30px", margin: "15px auto " }} />
        ) : (
          <GoTriangleLeft style={{ fontSize: "30px", margin: "15px auto" }} />
        )}
        <p className="FreeShippingBanner-sidebar-content">FLAT ₹200 OFF</p>
      </BannerContainer>
      <BannerContentContainer isClick={isClick}>
        <div className="FreeShippingBanner-first-row">
          <div className="FreeShippingBanner-description">
            <div className="FreeShippingBanner-pre-header">Avail Flat</div>
            <div className=" FreeShippingBanner-header FreeShippingBanner-header-primary">
              ₹200 OFF
            </div>
            <div className=" FreeShippingBanner-header FreeShippingBanner-header-secondary">
              + FREE SHIPPING
            </div>
          </div>
          <div className="FreeShippingBanner-image">
            <img
              draggable="false"
              className="FreeShippingBanner-imageContent"
              src="https://assets.myntassets.com/assets/images/2022/8/16/42ad3669-f87a-4983-8f0b-92c30e48c70a1660589404389-Frame-110.png"
              alt=""
            />
          </div>
        </div>

        <div className="FreeShippingBanner-second-row">
          <div className="FreeShippingBanner-coupon">
            <div>
              <span className="FreeShippingBanner-text">Coupon Code:</span>
              <span className="FreeShippingBanner-code">MYNTRA200</span>
            </div>
            <div className="FreeShippingBanner-footer">
              Applicable on your first order
            </div>
          </div>
          <div className="FreeShippingBanner-signup">
            <a
              className="FreeShippingBanner-button"
              href="/register?referer=https://www.myntra.com/"
            >
              <div className="FreeShippingBanner-text">SIGN UP NOW &gt;</div>
            </a>
          </div>
        </div>
        <div className="FreeShippingBanner-trust-builders">
          <div className="FreeShippingBanner-item">
            <svg
              viewBox="0 0 24 24"
              color="#03a685"
              className="FreeShippingBanner-icon"
            >
              <defs>
                <path
                  id="a"
                  d="M0 0L23.761125 0 23.761125 22.4999625 0 22.4999625z"
                ></path>
              </defs>
              <g
                transform="translate(-1152 -892) translate(1064 640) translate(82 246)"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
              >
                <path d="M0 0H36V36H0z"></path>
                <g transform="translate(6 6.75)">
                  <mask id="b" fill="#fff">
                    <use href="#a"></use>
                  </mask>
                  <path
                    d="M11.88 20.187c.512 0 1.033.195 1.535.385.586.221 1.214.435 1.65.294.497-.158.852-.7 1.196-1.223.285-.435.58-.883.975-1.166.398-.285.926-.424 1.437-.56.611-.16 1.242-.327 1.542-.73.29-.392.257-1.024.226-1.635-.027-.532-.055-1.076.101-1.546.15-.455.489-.862.816-1.255.403-.486.819-.988.819-1.505 0-.515-.416-1.018-.819-1.504-.328-.395-.666-.803-.816-1.256-.156-.472-.128-1.015-.101-1.54.03-.616.063-1.247-.227-1.64-.298-.404-.93-.57-1.542-.732-.509-.134-1.035-.273-1.435-.557-.394-.284-.676-.711-.974-1.163-.347-.529-.703-1.07-1.196-1.228-.42-.134-1.07.074-1.65.294-.506.19-1.027.384-1.537.384-.514 0-1.034-.196-1.537-.386-.582-.218-1.235-.424-1.652-.292-.493.157-.848.699-1.193 1.223-.284.433-.578.881-.975 1.165-.396.285-.9.417-1.433.559-.613.161-1.245.327-1.545.733-.289.391-.257 1.023-.226 1.634.028.525.057 1.066-.099 1.544-.152.456-.49.864-.817 1.258-.403.485-.819.987-.819 1.504 0 .515.416 1.019.818 1.506.327.393.666.8.816 1.255.156.472.128 1.014.101 1.539-.03.616-.063 1.248.227 1.641.298.403.93.57 1.54.73.51.135 1.036.274 1.436.558.397.285.692.734.977 1.167.345.525.701 1.067 1.194 1.224.414.131 1.068-.075 1.652-.294.515-.193 1.03-.385 1.535-.385m2.847 2.313c-.688 0-1.316-.237-1.87-.446-.37-.139-.753-.283-.977-.283-.219 0-.597.142-.963.278-.895.335-1.83.603-2.702.327-1.03-.33-1.59-1.18-2.04-1.864-.195-.298-.419-.637-.574-.749-.161-.114-.563-.22-.917-.314-.795-.209-1.782-.47-2.412-1.321-.627-.85-.576-1.852-.535-2.657.019-.368.04-.777-.023-.968-.056-.168-.33-.499-.53-.74C.654 13.123 0 12.33 0 11.246c0-1.088.684-1.913 1.184-2.516.2-.242.475-.572.532-.742.063-.193.04-.62.021-.962-.041-.812-.092-1.815.535-2.663.632-.852 1.618-1.112 2.41-1.321.357-.095.757-.2.917-.315.159-.113.39-.465.575-.748C6.6 1.332 7.183.445 8.211.116c.88-.277 1.813-.01 2.69.32.354.133.753.284.98.284.222 0 .606-.144.978-.283.874-.33 1.806-.6 2.687-.32 1.03.328 1.59 1.18 2.038 1.863.198.3.42.637.575.748.16.115.563.221.917.315.794.209 1.782.47 2.412 1.322.627.849.576 1.851.535 2.656-.019.368-.04.778.022.968.057.168.32.486.532.74v.001c.527.637 1.183 1.43 1.184 2.515 0 1.089-.656 1.88-1.184 2.517-.2.242-.475.572-.532.743-.062.188-.04.597-.022.959.041.814.092 1.817-.536 2.665-.63.85-1.616 1.111-2.409 1.32-.356.094-.758.2-.92.316-.156.111-.378.45-.573.747-.425.647-1.006 1.533-2.036 1.863-.26.083-.536.125-.822.125"
                    fill="#03a685"
                    mask="url(#b)"
                  ></path>
                </g>
                <path
                  d="M17.88 24.55A6.557 6.557 0 0111.333 18a6.557 6.557 0 019.093-6.036.792.792 0 01-.615 1.46A4.97 4.97 0 0012.916 18a4.97 4.97 0 004.965 4.964A4.97 4.97 0 0022.846 18a.792.792 0 111.584 0 6.557 6.557 0 01-6.55 6.55"
                  fill="#03a685"
                ></path>
                <path
                  d="M18.203 20.336a.793.793 0 01-.56-.231l-2.585-2.584a.791.791 0 111.12-1.12l1.964 1.963 3.974-4.874a.792.792 0 111.227 1l-4.527 5.555a.79.79 0 01-.613.291"
                  fill="#03a685"
                ></path>
              </g>
            </svg>
            <span className="FreeShippingBanner-text">Genuine Products</span>
          </div>
          <div className="FreeShippingBanner-item">
            <svg
              viewBox="0 0 24 24"
              color="#03a685"
              className="FreeShippingBanner-icon"
            >
              <g fill="#03a685" stroke="#03a685" strokeWidth="0.6">
                <path d="M16.606 21.888H6.398a.436.436 0 01-.307-.121.405.405 0 01-.125-.296V11.4l-1.555 1.916a.44.44 0 01-.607.075l-2.415-1.804a.41.41 0 01-.184-.392.42.42 0 01.274-.339.444.444 0 01.439.075l2.088 1.549 2.05-2.55a.441.441 0 01.485-.146c.177.058.295.22.292.4V21.06h9.334V10.184a.417.417 0 01.292-.4.441.441 0 01.485.145l2.058 2.55 2.084-1.549a.444.444 0 01.446-.085c.154.055.261.19.278.347a.411.411 0 01-.199.394l-2.419 1.789a.443.443 0 01-.606-.075l-1.556-1.916V21.47a.424.424 0 01-.424.417zM11.5 5.774a.424.424 0 01-.432-.417V5.23a2.093 2.093 0 01.965-1.706.86.86 0 00.355-.816.88.88 0 00-.565-.696.933.933 0 00-.906.135.854.854 0 00-.327.668c0 .23-.193.416-.432.416a.424.424 0 01-.431-.416c-.002-.808.584-1.507 1.404-1.675.82-.168 1.65.24 1.99.98.34.738.097 1.605-.583 2.079a1.28 1.28 0 00-.606 1.031v.127c0 .11-.046.217-.127.295a.44.44 0 01-.305.122z"></path>
                <path d="M21.354 11.672a.43.43 0 01-.342-.16l-1.621-2.018c-1.894-2.347-4.805-3.72-7.89-3.72-3.083 0-5.994 1.373-7.888 3.72L1.988 11.5a.443.443 0 01-.594.064.406.406 0 01-.09-.57l1.64-2.01c2.057-2.552 5.22-4.045 8.572-4.045 3.351 0 6.514 1.493 8.57 4.045L21.709 11a.407.407 0 01-.077.582.43.43 0 01-.277.09z"></path>
                <path d="M11.5 21.888a.424.424 0 01-.432-.417V5.346c0-.23.194-.416.432-.416s.432.186.432.416v16.125a.405.405 0 01-.126.296.436.436 0 01-.306.12z"></path>
              </g>
            </svg>
            <span className="FreeShippingBanner-text">Try &amp; Buy</span>
          </div>
          <div className="FreeShippingBanner-item">
            <svg
              viewBox="0 0 24 24"
              color="#03a685"
              className="FreeShippingBanner-icon"
            >
              <g fill="#03a685">
                <path d="M15.19 8.606V4.3a.625.625 0 00-.622-.625H6.384V.672a.624.624 0 00-.407-.588.62.62 0 00-.687.178L.367 6.048a.628.628 0 000 .812l4.923 5.778a.626.626 0 00.687.182.624.624 0 00.407-.588V9.228h8.184a.62.62 0 00.621-.622zm-1.244-.625H5.762a.625.625 0 00-.621.625v1.938l-3.484-4.09L5.14 2.362V4.3c0 .344.28.625.621.625h8.184v3.056z"></path>
                <path d="M22.708 13.028L17.785 7.25a.616.616 0 00-.687-.178.624.624 0 00-.407.587v3.003H8.507a.625.625 0 00-.622.625v4.304c0 .343.28.625.622.625h8.184v3.003a.624.624 0 00.621.625.626.626 0 00.473-.219l4.923-5.781a.632.632 0 000-.816zm-4.774 4.497v-1.937a.625.625 0 00-.622-.625H9.13v-3.054h8.183a.625.625 0 00.622-.625V9.347l3.484 4.09-3.484 4.088z"></path>
              </g>
            </svg>
            <span className="FreeShippingBanner-text">
              Easy Exchanges &amp; Returns
            </span>
          </div>
        </div>
      </BannerContentContainer>
    </>
  );
};

export default Banner;
