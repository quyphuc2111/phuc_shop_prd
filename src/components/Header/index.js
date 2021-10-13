import React from "react";
import { Logo, NavBar, Input, BoxAbout, ItemAbout } from "./styles";
import BrandImage from "./logo.png";
import "./styles.css";
import { BsTelephone } from "react-icons/bs";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FiShoppingCart, FiTruck } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <NavBar backgroundColor="black">
      <div className="qp-container d-flex align-items-center justify-between ">
        <Link to="/" id="RouterNavLink">
          <Logo src={BrandImage} />
        </Link>
        <Input placeholder="Mày muốn gì!?" />
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
            <HiOutlineLocationMarker />
            <p>
              Cửa hàng <br /> gần bạn
            </p>
          </ItemAbout>
          <ItemAbout>
            <FiTruck />
            <p>
              Tra cứu <br /> đơn hàng
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
