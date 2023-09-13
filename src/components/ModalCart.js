import React from "react";
import "./ModalCart.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const ModalCart = ({ handleClose, cartItem }) => {
  console.log("cart-item ", cartItem);
  return (
    <Box sx={style}>
      {cartItem.map((cartVal) => (
        <React.Fragment key={cartVal.id}>
          <div className="imgBox">
            <img
              src={cartVal.img}
              alt={cartVal.product}
              style={{ maxWidth: "40%" }}
            />
            <div className="textDiv">
              <div>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  {cartVal.product}
                </Typography>
              </div>
              <div>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  some hard coded stuff for now, later it will be replaced with
                  with data come from mongo db, adding some more dummy content
                  for now just to check wether the content is overflowing or
                  not.
                </Typography>
              </div>
            </div>
          </div>
          <div>
            {/* <div>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              
          </Typography>
        </div> */}
          </div>
        </React.Fragment>
      ))}

      <Grid item xs={8}></Grid>

      <button onClick={handleClose}>close</button>
    </Box>
  );
};

export default ModalCart;
