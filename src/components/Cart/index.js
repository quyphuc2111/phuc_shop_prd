import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { removeProductToCart } from '../../redux/actions/productActions';
import "./styles.css"


export default function Cart() {
    const dispatch = useDispatch()
    const allCart = useSelector((state) => state.cart);
    console.log(allCart)
    // function handleDeleteProduct() {
    //     dispatch(removeProductToCart(item))
    // }
    return (

        <div className="product-cart">
            <div className="qp-container">
               <div className="product-cart__header">
                   <div>Tiếp tục tìm kiếm sản phẩm</div>
                   <div>Giỏ hàng của bạn</div>
               </div>
               <div className="product-cart__body">
                   {
                       allCart === undefined ? "": allCart.map((item) => {
                        return (
                            <div className="prd-item" key={item.product.name}>
                                <div className="prd-item__image">
                                    <img src={item.product.image} alt=""  />
                                </div>
                                <div className="prd-item__info">
                                    <div className="prd-name">{item.product.name}</div>
                                    <div className="prd-capacities">{item.capacites === undefined || null ? "" : item.capacites.capacity }</div>
                                    <div className="prd-color">{item.color === undefined || null ? "" :item.color}</div>
                                    <div className="prd-price d-flex">
                                        <div className="prd-price-special-price">{item.product.special_price}</div>
                                        <div className="prd-price-old-price">{item.product.old_price}</div>
                                    </div>
                                    
                                </div>
                                <div className="prd-option">
                                    <div onClick={() => {dispatch(removeProductToCart(item))}}>Xóa khỏi giỏ</div>
                                    <div>
                                        <input type="submit" value="-" />
                                        <span>1</span>
                                        <input type="submit" value="+" />
                                    </div>
                                </div>
                            </div>
                        )
                   })
                   }
               </div>
            </div>
        </div>
    )
}
