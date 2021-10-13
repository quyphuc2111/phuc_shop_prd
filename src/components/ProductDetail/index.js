import React, { useEffect } from "react";
import "./styles.scss";
import SliderDetail from "../SliderDetail";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  selectedProducts,
  removeSelectedProducts,
} from "../../redux/actions/productActions";

export default function ProductDetail() {
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const params = useParams();
  const productName = encodeURI(params.name);
  const { capacities, image } = product;

  const fetchProductDetail = async (name) => {
    const response = await axios
      .get(`https://phucshopv2.herokuapp.com/api/products/${name}`)
      .catch((err) => {
        console.log("Err", err);
      });
    // console.log("fet", typeof response.data.capacities);
    dispatch(selectedProducts(response.data));
  };
  useEffect(() => {
    if (productName && productName !== "") {
      fetchProductDetail(productName);
    }
    return () => {
      dispatch(removeSelectedProducts());
    };
  }, [productName]);

  return (
    <div className="detail-product">
      <div className="qp-container ">
        <div className="detail-product__name">{product.name}</div>
        <div className="detail-product__info d-flex justify-between ">
          <div className="detail-product__left">
            <SliderDetail product={product} />
          </div>
          <div className="detail-product__center">
            <div className="box-info">
              <div className="box-info__price d-flex align-items-center">
                <div className="special-price">{product.special_price}₫</div>
                <div className="old-price">{product.old_price} ₫</div>
              </div>
            </div>
            <div className="box-linked">
              {capacities === undefined ? (
                <div>Loadingg..</div>
              ) : (
                capacities.map((p, i) => {
                  return (
                    <Link className="item-linked" key={i} to="/prd">
                      <strong>{p.capacity}</strong>
                      <span>{p.price} ₫</span>
                    </Link>
                  );
                })
              )}
            </div>
          </div>
          <div className="detail-product__right">
            <div className="box-warranty-info border radius-7">
              <div className="box-title">
                <p className="box-title__title">Thông tin máy</p>
              </div>
              <div className="box-content">
                <p>
                  Bảo hành chính hãng 12 tháng tại trung tâm bảo hành ủy quyền,
                  1 đổi 1 trong 30 ngày nếu có lỗi phần cứng từ NSX. Gia hạn bảo
                  hành thời gian giãn cách
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
