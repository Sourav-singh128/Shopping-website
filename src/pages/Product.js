import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import product from "../product/productList";
import Card from "../card/Card";
import sanityClient from "../client";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
const Product = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [pagination, setPagination] = useState([]);
  const prdPerPage = 3;
  const pageNumber = (e, index) => {
    let firstPrd = (index - 1) * prdPerPage;
    console.log("first ", firstPrd);
    let lastPrd = firstPrd + prdPerPage;
    console.log("seconnd ", lastPrd);
    if (lastPrd > allProducts.length) {
      lastPrd = allProducts.length;
    }
    console.log(index);
    const limitedPrd = allProducts.slice(firstPrd, lastPrd);
    console.log("limited-prd", limitedPrd);
    setPagination(limitedPrd);
  };

  useEffect(() => {
    sanityClient
      .fetch(
        `
     *[_type == "product"]{
       name,
       Desc,
       _id,
       amount,
       slug,
       prdImage{
        asset->{
          url
        }
       }
     }
     `
      )
      .then((data) => {
        setAllProducts(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    setPagination(allProducts.slice(0, 3));
  }, [allProducts]);
  console.log("pagination-data ", pagination);
  return (
    <Fragment>
      <h1 className="title">Shopping-website</h1>
      <Grid
        container
        spacing={2}
        sx={{ padding: "40px", boxSizing: "border-box" }}>
        {pagination.map((prd) => (
          <Grid item xs={4} sx={{ marginTop: "40px" }}>
            <Card prod={prd} key={prd._id} />
          </Grid>
        ))}
      </Grid>

      <Pagination
        count={3}
        color="primary"
        sx={{ marginLeft: "auto", marginRight: "auto", width: "max-content" }}
        onChange={pageNumber}
      />
    </Fragment>
  );
};

export default Product;
