const products = [
  {
    id: "1",
    brand: "HRX by Hrithik Roshan",
    Gender: ["men"],
    Desc: "Rapid Dry Training T-shirt",
    img: ["images1", "images2", "images3", "images4", "images5", "images6"],
    size: ["L", "M", "XL", "XS", "XXL"],
    OriginalPrice: "1999",
    discountPercentage: "60",
    inStock: true,
  },
  {
    id: "2",
    brand: "HRX by Hrithik Roshan",
    color: ["green", "limegreen"],
    Gender: ["men"],
    Desc: "Rapid Dry Training T-shirt",
    img: ["images1", "images2", "images3", "images4", "images5", "images6"],
    size: ["L", "M", "XL", "XS", "XXL"],
    OriginalPrice: "1999",
    discountPercentage: "20",
    inStock: true,
  },
  {
    id: "3",
    brand: "HRX by Hrithik Roshan",
    Gender: ["men"],
    Desc: "Rapid Dry Training T-shirt",
    img: ["images1", "images2", "images3", "images4", "images5", "images6"],
    size: ["L", "M", "XL", "XS", "XXL"],
    OriginalPrice: "1999",
    discountPercentage: "30",
    inStock: true,
  },
  {
    id: "4",
    brand: "HRX by Hrithik Roshan",
    Gender: ["men"],
    Desc: "Rapid Dry Training T-shirt",
    img: ["images1", "images2", "images3", "images4", "images5", "images6"],
    size: ["L", "M", "XL", "XS", "XXL"],
    OriginalPrice: "1999",
    discountPercentage: "40",
    inStock: true,
  },
  {
    id: "5",
    brand: "HRX by Hrithik Roshan",
    Gender: ["men"],
    Desc: "Rapid Dry Training T-shirt",
    img: ["images1", "images2", "images3", "images4", "images5", "images6"],
    size: ["L", "M", "XL", "XS", "XXL"],
    OriginalPrice: "1999",
    discountPercentage: "60",
    inStock: true,
  },
  {
    id: "6",
    brand: "HRX by Hrithik Roshan",
    Gender: ["men"],
    Desc: "Rapid Dry Training T-shirt",
    img: ["images1", "images2", "images3", "images4", "images5", "images6"],
    size: ["L", "M", "XL", "XS", "XXL"],
    OriginalPrice: "1999",
    discountPercentage: "60",
    inStock: true,
  },
  {
    id: "7",
    brand: "HRX by Hrithik Roshan",
    Gender: ["men"],
    Desc: "Rapid Dry Training T-shirt",
    img: ["images1", "images2", "images3", "images4", "images5", "images6"],
    size: ["L", "M", "XL", "XS", "XXL"],
    OriginalPrice: "1999",
    discountPercentage: "50",
    inStock: true,
  },
  {
    id: "8",
    brand: "HRX by Hrithik Roshan",
    Gender: ["men"],
    Desc: "Rapid Dry Training T-shirt",
    img: ["images1", "images2", "images3", "images4", "images5", "images6"],
    size: ["L", "M", "XL", "XS", "XXL"],
    OriginalPrice: "1999",
    discountPercentage: "65",
    inStock: true,
  },
  {
    id: "9",
    brand: "HRX by Hrithik Roshan",
    Gender: ["men"],
    Desc: "Rapid Dry Training T-shirt",
    img: ["images1", "images2", "images3", "images4", "images5", "images6"],
    size: ["L", "M", "XL", "XS", "XXL"],
    OriginalPrice: "1999",
    discountPercentage: "60",
    inStock: true,
  },
  {
    id: "10",
    brand: "HRX by Hrithik Roshan",
    Gender: ["men"],
    Desc: "Rapid Dry Training T-shirt",
    img: ["images1", "images2", "images3", "images4", "images5", "images6"],
    size: ["L", "M", "XL", "XS", "XXL"],
    OriginalPrice: "1999",
    discountPercentage: "65",
    inStock: true,
  },
  {
    id: "11",
    brand: "HRX by Hrithik Roshan",
    Gender: ["men"],
    Desc: "Rapid Dry Training T-shirt",
    img: ["images1", "images2", "images3", "images4", "images5", "images6"],
    size: ["L", "M", "XL", "XS", "XXL"],
    OriginalPrice: "1999",
    discountPercentage: "60",
    inStock: true,
  },
  {
    id: "12",
    brand: "HRX by Hrithik Roshan",
    Gender: ["men"],
    Desc: "Rapid Dry Training T-shirt",
    img: ["images1", "images2", "images3", "images4", "images5", "images6"],
    size: ["L", "M", "XL", "XS", "XXL"],
    OriginalPrice: "1999",
    discountPercentage: "60",
    inStock: true,
  },
];

const rs = products.map((item) => {
  return item.img;
});
const rs1 = rs.reduce((res, item) => [...res, ...item], []);

uniq = [...new Set(rs1)];



  ...new Set(
    products.map((item) => {
      return item.brand;
    })
  ),
]);

// ingore this

{
  /* <div id="grad1">
<img  width="640px"  height="500px" class="JvVyE zsQ53" src="https://images.unsplash.com/photo-1570380749637-7e570824d2df?auto=format&amp;fit=fill&amp;w=1600&amp;h=1200&amp;q=20" srcset="https://images.unsplash.com/photo-1570380749637-7e570824d2df?dpr=1&amp;auto=format&amp;fit=crop&amp;w=1600&amp;q=60 1x, https://images.unsplash.com/photo-1570380749637-7e570824d2df?dpr=2&amp;auto=format&amp;fit=crop&amp;w=1600&amp;q=60 2x">
<div class="Ap7mS" style="background: radial-gradient(circle closest-corner at 453px 372px, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.9) 66%);"></div>
</div> */
}
