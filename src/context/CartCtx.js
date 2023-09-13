import React, { useState, createContext, useEffect } from "react";
export const context = createContext();
const CartCtx = (props) => {
  const [prdItem, setPrdItem] = useState([]);
  useEffect(() => {
    const fetchCartPrd = async () => {
      try {
        const data = await fetch("/prd");
        const res = await data.json();
        setPrdItem(res);
        console.log("fetch from db ", res);
      } catch (error) {
        console.log("error while fetching ", error);
      }
    };
    fetchCartPrd();
  }, [prdItem.length]);
  return (
    <context.Provider value={{ prdItem, setPrdItem }}>
      {props.children}
    </context.Provider>
  );
};

export default CartCtx;
