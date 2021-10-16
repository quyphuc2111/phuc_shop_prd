import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./styles.scss";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
const ProductItem = () => {
  // console.log(props.handleClick)
  const products = useSelector((state) => state.allProducts.products);
  const renderList = products.map((product) => {
    // console.log(encodeURI(product.name))
    return (
  
    <Link key={product.name} to={`/api/products/${encodeURI(product.name)}`}>
  
  <div className="product-item">
        <div className="product-item__image">
          <div >
            <img alt={product.name} src={product.image} />
          </div>
          <div className="product-item__sticker">
            <p className="sticker-percent">-{100 - Math.floor(product.special_price * 100 / product.old_price) }%</p>
          </div>
        </div>
        <div className="product-item__info">
          <div className="product-item__name">
            <h3>{product.name}</h3>
          </div>
          <div className="product-item__price d-flex align-items-center ">
            {product.special_price || product.old_price ? (
              <>
                <p className="special-price">{numberWithCommas(product.special_price)} ₫</p>
                <p className="old-price">{numberWithCommas(product.old_price)}₫</p>
              </>
            ) : (
              <p className="special-price">{product.price} ₫</p>
            )}
          </div>
        </div>
        <div className="product-item__btn">
          <div className="btn btn-buy" >
            Mua ngay
          </div>
          <div className="btn btn-compare" >
            So sánh
          </div>
        </div>
      </div>
    </Link>
    );
  });

  return <>{renderList}</>;
};
export default ProductItem;
