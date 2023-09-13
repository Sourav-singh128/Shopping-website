import "./card.css";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
const Card = ({ prod }) => {
  return (
    <Link className="link" to={`/products/${prod.slug.current}`}>
      <div className="container">
        <h3>{prod.name}</h3>
        <Typography className="desc">{prod.Desc}</Typography>
        <div className="img-container">
          <img src={prod.prdImage.asset.url} alt={prod._id} />
        </div>
      </div>
    </Link>
  );
};

export default Card;
