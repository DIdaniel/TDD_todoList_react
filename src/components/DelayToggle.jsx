import React, { useState, useCallback } from "react";

const DelayToggle = () => {
  const [toggle, setToggle] = useState(false);

  const toggleBtn = useCallback(() => {
    setTimeout(() => {
      setToggle((prev) => !prev);
    }, 1500);
  }, []);

  return (
    <div>
      <h1>DelayToggle</h1>
      <button onClick={toggleBtn}>TOGGLE</button>
      <h3>STATE : {toggle ? "ON" : "OFF"}</h3>
      <p>{toggle ? "야호!!" : null}</p>
    </div>
  );
};

export default DelayToggle;
