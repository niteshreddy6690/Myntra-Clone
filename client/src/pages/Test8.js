import React, { useState } from "react";

const Test8 = () => {
  const [gender, setGender] = useState("");
  const handelChange = (event) => {
    setGender(event.target.value);
  };
  return (
    <div>
      <h1>Gender:- {gender}</h1>
      <span>
        <input
          type="radio"
          value="male"
          name="gender"
          id="male"
          onChange={handelChange}
        />
        <label htmlFor="male">Men</label>
      </span>
      <span>
        <input
          type="radio"
          value="female"
          name="gender"
          id="female"
          onChange={handelChange}
        />
        <label htmlFor="female">women</label>
      </span>
    </div>
  );
};

export default Test8;
