import React, { useState, useEffect } from "react";
import "./styles.scss";
import SliderDetail from "../SliderDetail";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  selectedProducts,
  removeSelectedProducts,
  addProductToCart,
} from "../../redux/actions/productActions";
import Loading from "../Loading";

export default function ProductDetail() {
  const product = useSelector((state) => state.product);
  const [loading, setLoading] = useState(true);
  const [capacities, setCapacities] = useState({
    activeObject: null,
    objects: [],
  });

  const dispatch = useDispatch();
  const params = useParams();
  const productName = encodeURI(params.name);
  const { image, tskt } = product;
  const [textShow, setTextShow] = useState("Show More");
  const [selectColor, setSelectColor] = useState({
    activeObject: null,
    objects: [],
  });

  const fetchProductDetail = async (name) => {
    const response = await axios
      .get(`https://phucshopv2.herokuapp.com/api/products/${name}`)
      .catch((err) => {
        console.log("Err", err);
      });
    dispatch(selectedProducts(response.data));

    setLoading(false);
  };
  useEffect(() => {
    setTimeout(() => {
      if (productName && productName !== "") {
        fetchProductDetail(productName);
      }
      return () => {
        dispatch(removeSelectedProducts());
      };
    });
  }, [productName]);
  useEffect(() => {
    setCapacities({ ...capacities, objects: product.capacities });
  }, [product]);


  function toggleActive(index) {
    setCapacities({ ...capacities, activeObject: capacities.objects[index] });
    setSelectColor({
      ...selectColor,
      objects: capacities.objects[index].color,
    });
    // console.log("capa", capacities.objects[index].color)
  }
  function changeActiveColor(index) {
    setSelectColor({
      ...selectColor,
      activeObject: selectColor.objects[index],
    });
  }
  function toggleActiveStyles(index) {
    if (capacities.objects[index] === capacities.activeObject) {
      return "item-linked act";
    } else {
      return "item-linked";
    }
  }
  function toggleActiveColor(index) {
    if (selectColor.objects[index] === selectColor.activeObject) {
      return "item-linked act";
    } else {
      return "item-linked";
    }
  }

  function handleClickBuy() {
    console.log("btn",capacities.activeObject)
    console.log("cl", selectColor.activeObject)
    dispatch(addProductToCart({
      product: product,
      capacities: capacities.activeObject,
      color: selectColor.activeObject,
    }));
  }


  return (
    <>
      {loading ? (
        <Loading />
      ) : (
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
                    <div className="special-price">
                      {product.special_price}₫
                    </div>
                    <div className="old-price">{product.old_price} ₫</div>
                  </div>
                </div>
                <div className="box-linked">
                  {capacities.objects === undefined
                    ? ""
                    : capacities.objects.map((p, i) => {
                        return (
                          <div
                            className={toggleActiveStyles(i)}
                            key={i}
                            onClick={() => {
                              toggleActive(i);
                            }}
                          >
                            <strong>{p.capacity}</strong>
                            <span>{p.price} ₫</span>
                          </div>
                        );
                      })}
                </div>
                <div className="product-option">
                  <div className="box-title">Chọn màu để xem giá</div>
                  <ul
                    className="box-content"
                    style={{ listStyle: "none", padding: 0 }}
                  >
                    {selectColor.objects.map((item, index) => {
                      return (
                        <li
                          className={toggleActiveColor(index)}
                          key={item.color}
                          onClick={() => {
                            changeActiveColor(index);
                          }}
                        >
                          <strong>{item.color}</strong>
                          <span>{item.price}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="btn-buy" onClick={handleClickBuy}>
                  <strong>Mua ngay</strong>
                  <span>(Giao tận nơi hoặc lấy tại cửa hàng)</span>
                </div>
              </div>
              <div className="detail-product__right">
                <div className="box-warranty-info border radius-7">
                  <div className="box-title">
                    <p className="box-title__title">Thông tin máy</p>
                  </div>
                  <div className="box-content">
                    <p>
                      Bảo hành chính hãng 12 tháng tại trung tâm bảo hành ủy
                      quyền, 1 đổi 1 trong 30 ngày nếu có lỗi phần cứng từ NSX.
                      Gia hạn bảo hành thời gian giãn cách
                    </p>
                  </div>
                </div>
                <div className="border radius-7 tskt">
                  <div className="box-title">
                    <h3>Thông số kĩ thuật</h3>
                  </div>
                  <div className="box-content">
                    <table>
                      <tbody>
                        {tskt === undefined ? (
                          <tr></tr>
                        ) : (
                          tskt.map((tskt) => {
                            return (
                              <tr key={tskt.name} className="hidden">
                                <th>{tskt.name}</th>
                                <th> {tskt.value} </th>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className="box-btn-show-more border">
                    <div
                      className="btn-show-more"
                      onClick={() => {
                        const btnShowMore =
                          document.querySelector(".btn-show-more");
                        // console.log(btnShowMore.textContent);
                        const trTag = document.querySelectorAll(
                          ".detail-product table tr"
                        );
                        trTag.forEach((e) => e.classList.toggle("hidden"));
                        btnShowMore.textContent === "Show More"
                          ? setTextShow("Show Less")
                          : setTextShow("Show More");
                      }}
                    >
                      {textShow}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
