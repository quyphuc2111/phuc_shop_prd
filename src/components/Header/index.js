import React, { useEffect, useState } from "react";
import { Logo, NavBar, Input, BoxAbout, ItemAbout } from "./styles";
import BrandImage from "./logo.png";
import "./styles.css";
import "./styles.scss";
import { BsTelephone } from "react-icons/bs";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FiShoppingCart, FiTruck } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import SearchForm from "../SearchForm";

export default function Header() {
  const allCart = useSelector((state) =>state.cart)
  // console.log("head", allCart)
  const [allProducts, setAllProduct] = useState([]);
  const [filterData, setFilterData] = useState([]);

  const fetchAllProduct = async () => {
    const response = await axios
      .get(`https://phucshopv2.herokuapp.com/api/products`)
      .catch((err) => {
        console.log("Err", err);
      });
    setAllProduct(response.data);
  };
  useEffect(() => {
    fetchAllProduct();
  }, []);

  function handleFilterChange(searchWord) {
    const newFilter = allProducts.filter((value) => {
      return value.name
        .toLowerCase()
        .includes(searchWord.searchTerm.toLowerCase());
    });
    console.log("New Filter", searchWord.searchTerm);
    if (searchWord.searchTerm === "") {
      setFilterData([]);
    } else {
      setFilterData(newFilter);
    }
  }

  return (
    <NavBar
      backgroundColor="black"
      onClick={(e) => {
        const overlay = document.querySelector(".header-overlay");
        const inputSearch = document.querySelector(".input-search");
        if (e.target !== inputSearch) {
          overlay.classList.remove("active");
        } else {
          overlay.classList.add("active");
        }
      }}
    >
      <div className="qp-container d-flex align-items-center justify-between ">
        <Link to="/" id="RouterNavLink">
          <Logo src={BrandImage} />
        </Link>

        <div className="box-search-wrapper">
          <div className="box-search">
            <SearchForm
              placeholder="Bạn cần tìm gì?"
              onSubmit={handleFilterChange}
            />
          </div>
          {filterData.length !== 0 ? (
            <ul className="box-search-result">
              {filterData.slice(0, 10).map((product) => {
                return (
                  <li>
                    <Link
                      key={product.name}
                      to={`/api/products/${product.name}`}
                    >
                      <div className="d-flex">
                        <div className="product-img">
                          <img src={product.image} alt="" />
                        </div>
                        <div className="product-info">
                          <div className="product-info__name">
                            {product.name}
                          </div>
                          <div className="product-info__price">
                            {product.special_price}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            ""
          )}
        </div>

        <BoxAbout>
          <ItemAbout href="tel:800 2097">
            <BsTelephone />
            <p style={{ marginLeft: "5px", textAlign: "center" }}>
              Gọi mua hàng
              <br />
              <strong>1800 2097</strong>
            </p>
          </ItemAbout>

          <Link to="/cart" className="cart">
            <div className="border d-flex ">
              <FiShoppingCart />
              <p>Giỏ hàng</p>
              <div className="cart__count">{allCart.length}</div>
            </div>
          
          </Link>
        </BoxAbout>
      </div>
    </NavBar>
  );
}
