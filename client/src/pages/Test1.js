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
  console.log("p", p);
  return (
    <>
      {/* <div>{p.name}</div>
      <button onClick={() => handelClick()}>click</button> */}
    </>
  );
};
const Test1 = () => {
  //   console.log();
  // const result = testdata.items.map((item) => Object.entries(item));
  // console.log(result);
  const res = Object.entries(testdata.items);
  console.log("res", res);

  res.map((item) => {
    console.log(item[1]);
  });
  // result.map
  //   const buildArr = [];
  //   const result = testdata.items.map((item, i) => buildArr.push(item));
  //   console.log(buildArr);

  // const zoo = [{ name: "nite" }, { name: "abc" }];

  // console.log(Object.keys(zoo));
  // // ['lion', 'panda']

  // console.log(Object.values(zoo));
  // // ['🦁', '🐼']

  // console.log(Object.entries(zoo));
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
