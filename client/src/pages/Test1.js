import React, { useState } from "react";

const testdata = {
  items: [
    {
      name: "Nitesh",
      lastName: "s",
      village: "kolar",
    },
    {
      name: "ravindra",
      lastName: "s",
      village: "banglore",
    },
    {
      name: "Pavan",
      lastName: "PB",
      village: "T Narsipura",
    },
  ],
};

const Test2 = (p) => {
  const [first, setFirst] = useState(false);
  const handelClick = () => {
    setFirst(!first);
  };
  
  return (
    <>
      {/* <div>{p.name}</div>
      <button onClick={() => handelClick()}>click</button> */}
    </>
  );
};
const Test1 = () => {
  //   
  // const result = testdata.items.map((item) => Object.entries(item));
  // 
  const res = Object.entries(testdata.items);
  

  res.map((item) => {
    
  });
  // result.map
  //   const buildArr = [];
  //   const result = testdata.items.map((item, i) => buildArr.push(item));
  //   

  // const zoo = [{ name: "nite" }, { name: "abc" }];

  // 
  // // ['lion', 'panda']

  // 
  // // ['🦁', '🐼']

  // 
  // [ ['lion', '🦁'], ['panda', '🐼'] ]
  return (
    <></>
    // <div
    //   style={{
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //   }}
    // >
    //   <div>
    //     {result.map((p, i) => (
    //       <>
    //         {p.map((ob, i) => (
    //           <>
    //             <h1>{ob.name}</h1>
    //             <Test2 p={ob} />
    //           </>
    //         ))}
    //       </>
    //     ))}
    //   </div>
    // </div>
  );
};

export default Test1;
