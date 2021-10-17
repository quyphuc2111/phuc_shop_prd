import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../ProductItem";
import { setProducts } from "../../redux/actions/productActions";
import { Link } from "react-router-dom";
import Loading from "../Loading";
import "./styles.scss";


const ProductList = () => {
  const products = useSelector((state) => state.allProducts.products);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const fetchProducts = async () => {
    const response = await  axios
      .get(`https://phucshop.herokuapp.com/product/apple`)
      .catch((err) => {
        console.log("Err", err);
      });
    dispatch(setProducts(response.data));
    setLoading(false)
  };

  useEffect(() => {
   setTimeout(() => {
    fetchProducts();
   })
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="product">
          <div className="qp-container">
            <div className="product-title">
              <div className="product-title__title">
                <h2>Điện thoại nổi bật nhất</h2>
              </div>
              <div className="product-title__tag">
                <ul>
                  <li>
                    <Link to="/product/apple">Apple</Link>
                  </li>
                  <li>
                    <Link to="/product/samsung">Samsung</Link>
                  </li>
                  <li>
                    <Link to="/product/xiaomi">Xiaomi</Link>
                  </li>
                  <li>
                    <Link to="/product/oppo">Oppo</Link>
                  </li>
                  <li>
                    <Link to="/product/nokia">Nokia</Link>
                  </li>
                  <li>
                    <Link to="/product/realme">Realme</Link>
                  </li>
                  <li>
                    <Link to="/product/vsmart">Vsmart</Link>
                  </li>
                  <li>
                    <Link to="/product/asus">Asus</Link>
                  </li>
                  <li>
                    <Link to="/product/vivo">Vivo</Link>
                  </li>
                
                </ul>
              </div>
            </div>
            <div className="product_list">
              <ProductItem products={products} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default ProductList;
