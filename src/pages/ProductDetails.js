import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { context } from "../context/CartCtx";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import sanityClient from "../client";
import imageUrlBuilder from "@sanity/image-url";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";
import ModalPayment from "../components/ModalPayment";
import CardContent from "@mui/material/CardContent";
import { razorpayConfig } from "../config/razorPayConfig";

const containerStyle = {
  height: "500px",
  width: "500px",
  textAlign: "center",
  backgroundColor: "gray",
  marginRight: "auto",
  marginLeft: "auto",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  padding: "10px",
};

const cartBtn = {
  display: "block",
  fontSize: "20px",
  backgroundColor: "orange",
  padding: "5px 10px",
  marginBottom: "10px",
  borderRadius: "5px",
  border: "none",
  cursor: "pointer",
  marginRight: "auto",
  marginLeft: "auto",
};

const purchaseBtn = {
  display: "block",
  fontSize: "20px",
  backgroundColor: "purple",
  padding: "5px 10px",
  borderRadius: "5px",
  border: "none",
  cursor: "pointer",
  marginRight: "auto",
  marginLeft: "auto",
};
let options = {};

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}
const ProductDetails = () => {
  const { slug } = useParams();
  // const { prdItem, setPrdItem } = useContext(context);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = (e) => {
    e.stopPropagation();
    setOpen(false);
  };
  const [loader, setLoader] = useState(false);
  const [singlePrd, setSinglePrd] = useState({});
  console.log("slug value", slug);
  console.log("slug type", typeof slug);

  // const singleProduct = productList.filter((prd) => slug === prd.slug)[0];

  // loading razor pay script.

  useEffect(() => {
    sanityClient
      .fetch(
        `*[slug.current == $slug]{
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
      `,
        { slug }
      )
      .then((data) => {
        console.log("sanity-slug ", data[0]);
        setSinglePrd(data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [slug]);
  //   console.log("value ", singleProduct);
  const incPrdItem = async () => {
    // setPrdItem((val) => {
    //   return val + 1;
    // });

    const cartData = {
      product: singlePrd.name,
      img: singlePrd.prdImage.asset.url,
      amount: singlePrd.amount,
    };
    console.log(singlePrd.name);
    console.log("cart data", cartData);
    const data = await fetch("/prd", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(cartData),
    });
    const res = await data.json();
    console.log("data from backend ", res);
  };
  // console.log("prd-value ", prdItem);
  console.log("option ", options);

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function loadRazorpay(e) {
    setLoader(true);
    e.preventDefault();
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Razropay failed to load!!");
      return;
    }
    // call to backend api service.

    const data = await fetch("/orders", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ amount: singlePrd.amount }),
    });
    const response = await data.json();
    console.log("res ", response);
    options = razorpayConfig(response.order_id);
    setLoader(false);
    handleOpen();

    // replicating above scenario with settimeout.

    // setTimeout(() => {
    //   setLoader(false);
    //   handleOpen();
    // }, 2000);
  }
  const displayRazorpay = async (e) => {
    handleClose(e);
    console.log("dis-option ", options);
    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp1.open();
  };

  return (
    <Box sx={{ flexGrow: 1, margin: "30px" }}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <img
            src={singlePrd?.prdImage?.asset?.url}
            // src={urlFor(singlePrd?.prdImage).width(300).height(200).url()}
            alt={singlePrd?._id}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </Grid>
        <Grid item xs={6}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography style={{ marginBottom: "20px" }}>
                {singlePrd?.name}
              </Typography>
              <Typography style={{ marginBottom: "20px" }}>
                {singlePrd?.Desc}
              </Typography>
              <Typography style={{ marginBottom: "20px" }}>
                {singlePrd?.amount}
              </Typography>
              <button style={cartBtn} onClick={incPrdItem}>
                Add to Cart
              </button>
              <button style={purchaseBtn} onClick={loadRazorpay}>
                Buy now
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description">
                  <ModalPayment
                    handleClose={handleClose}
                    displayRazorpay={displayRazorpay}
                  />
                </Modal>
              </button>
              {loader && (
                <Box>
                  <Typography>wait order is creationg...</Typography>
                  <CircularProgress />
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetails;
