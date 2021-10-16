import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import SliderCate from "../SliderCate";
import "./styles.scss";
import { setProducts } from "../../redux/actions/productActions";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
function bubbleSort(array) {
  var size = array.length;
  // run loops two times: one for walking throught the array
  // and the other for comparison
  for (var i = 0; i < size - 1; i++) {
    for (var j = 0; j < size - i - 1; j++) {
      // To sort in descending order, change > to < in this line.
      if (array[j] > array[j + 1]) {
        // swap if greater is at the rear position
        var temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
  }
  return array;
}
function unique(arr) {
  return Array.from(new Set(arr)) //
}
export default function ProductCate() {
  // const [prod, setProd] = useState("products")
  // console.log(prod)
  const products = useSelector((state) => state.allProducts.products);
 
  const arrPrice = [];
  products.map((item) => {
    if (item.price) {
      arrPrice.push(item.price);
    } else {
      arrPrice.push(item.special_price);
    }
    return arrPrice;
  });
  const sort = bubbleSort(arrPrice);
  // console.log(sort);
  const isSortLowPrice = []
  sort.map((p) => {
  
    products.find((e) => {
      if(e.special_price === p || e.price === p)  {
        isSortLowPrice.push(e)
      }
    });
  });
  // console.log("al", unique(isSortLowPrice))

  // const isSortHighPrice = isSortLowPrice.reverse()
  const { category } = useParams();
  const dispatch = useDispatch();
  const fetchProductCate = async (cate) => {
    const response = await axios
      .get(`https://phucshop.herokuapp.com/product/${cate}`)
      .catch((err) => {
        console.log("Err", err);
      });
    dispatch(setProducts(response.data));
  };
  useEffect(() => {
    if (category && category !== "") {
      fetchProductCate(category);
    }
  }, [category]);
  return (
    <div className="product">
      <div className="qp-container">
        <div className="product-banner-wrapper d-flex justify-between">
          <div className="banner-1">
            <SliderCate autoSpeed={1500} />
          </div>
          <div className="banner-2">
            <SliderCate autoSpeed={1800} />
          </div>
        </div>
        <div className="product-filter">
          <div className="product-filter__name">Sắp xếp theo</div>
          <div className="product-filter__option d-flex">
            <div className="product-filter__low-price">
              <div onClick={() => {
                dispatch(setProducts(unique(isSortLowPrice)))
              }} className="border filter rainbow" >
                Giá thấp
              </div>
            </div>
            <div className="product-filter__high-price">
              <div  onClick={() => {
                dispatch(setProducts(unique(isSortLowPrice.reverse())))
              }} className="border filter rainbow">
                Giá cao
              </div>
            </div>
          </div>
        </div>
        <div className="product-list-wrapper">
          <div className="product_list">
            {products.length === 0 ? (
              <div>Loadding...</div>
            ) : (
              products.map((product) => {
                return (
                  <Link to={`/api/products/${product.name}`} key={product.name}>
                    <div className="product-item" key={product.name}>
                      <div className="product-item__image">
                        <Link to="prod">
                          <img alt={product.name} src={product.image} />
                        </Link>
                        <div className="product-item__sticker">
                          <p className="sticker-percent">
                            -
                            {100 -
                              Math.floor(
                                (product.special_price * 100) /
                                  product.old_price
                              )}
                            %
                          </p>
                        </div>
                      </div>
                      <div className="product-item__info">
                        <div className="product-item__name">
                          <h3>{product.name}</h3>
                        </div>
                        <div className="product-item__price d-flex align-items-center ">
                          {product.special_price || product.old_price ? (
                            <>
                              <p className="special-price">
                                {numberWithCommas(product.special_price)} ₫
                              </p>
                              <p className="old-price">
                                {numberWithCommas(product.old_price)}₫
                              </p>
                            </>
                          ) : (
                            <p className="special-price">
                              {numberWithCommas(product.price)} ₫
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="product-item__btn">
                        <Link className="btn btn-buy" to="/cart">
                          Mua ngay
                        </Link>
                        <Link className="btn btn-compare" to="compare">
                          So sánh
                        </Link>
                      </div>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
