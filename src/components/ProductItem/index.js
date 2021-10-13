import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./styles.scss";

const ProductItem = () => {
  // console.log(props.handleClick)
  const products = useSelector((state) => state.allProducts.products);
  const renderList = products.map((product) => {
    // console.log(encodeURI(product.name))
    return (
  
    <Link key={product.name} to={`/api/products/${encodeURI(product.name)}`}>
  
  <div className="product-item">
        <div className="product-item__image">
          <Link to="/prod">
            <img alt={product.name} src={product.image} />
          </Link>
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
                <p className="special-price">{product.special_price} ₫</p>
                <p className="old-price">{product.old_price}₫</p>
              </>
            ) : (
              <p className="special-price">{product.price} ₫</p>
            )}
          </div>
        </div>
        <div className="product-item__btn">
          <Link className="btn btn-buy" to="/cart">
            Mua ngay
          </Link>
          <Link className="btn btn-compare" to="/compare">
            So sánh
          </Link>
        </div>
      </div>
    </Link>
    );
  });

  return <>{renderList}</>;
};
export default ProductItem;
