import React, { useEffect, useState } from "react";
import { Logo, NavBar, Input, BoxAbout, ItemAbout } from "./styles";
import BrandImage from "./logo.png";
import "./styles.css";
import "./styles.scss";
import { BsTelephone } from "react-icons/bs";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FiShoppingCart, FiTruck } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import SearchForm from "../SearchForm";

export default function Header() {
  const [allProducts, setAllProduct] = useState([]);
  const [filterData, setFilterData] = useState([]);
  // const products = useSelector((state) => state.allProducts.products);
  // console.log(products)
  // const randomFiveProduct = Array.from(products).sort(() => Math.random() - Math.random()).slice(0,5)
  // console.log(randomFiveProduct)
  const fetchAllProduct = async () => {
    const response = await axios
      .get(`https://phucshopv2.herokuapp.com/api/products`)
      .catch((err) => {
        console.log("Err", err);
      });
    setAllProduct(response.data);
    // console.log("fet", typeof response.data.capacities);
    // dispatch(selectedProducts(response.data));
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

  // console.log(allProducts);

  return (
    <NavBar
      backgroundColor="black"
      onClick={(e) => {
        const overlay = document.querySelector(".header-overlay");
        const inputSearch = document.querySelector(".input-search");
        if (e.target != inputSearch) {
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
        {/* <Input placeholder="Mày muốn gì!?" /> */}
        <div className="box-search-wrapper">
          <div className="box-search">
            <SearchForm
              placeholder="Bạn cần tìm gì?"
              onSubmit={handleFilterChange}
            />
          </div>
          {filterData.length != 0 ? (
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
          <ItemAbout>
            <BsTelephone />
            <p>
              Gọi mua hàng
              <br />
              <strong>1800 2097</strong>
            </p>
          </ItemAbout>

          <ItemAbout>
            <FiShoppingCart />
            <p>
              Giỏ <br /> hàng
            </p>
          </ItemAbout>
        </BoxAbout>
      </div>
    </NavBar>
  );
}
