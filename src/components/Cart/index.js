import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { increaseQuantity, decreaseQuantity, removeProductToCart } from '../../redux/actions/productActions';
import "./styles.css"
import { Link } from 'react-router-dom';


export default function Cart() {
    const dispatch = useDispatch()
    const allCart = useSelector((state) => state.cart);
    console.log(allCart)
    // function handleDeleteProduct() {
    //     dispatch(removeProductToCart(item))
    // }
    let total = 0
        allCart.map((prd) => {      
                total+=prd.quantity* prd.color.price
        })
    
    const TotalPrice = (price, quantity) => {
        return Number(price * quantity)
    }
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      }
    return (

        <div className="product-cart">
            <div className="qp-container">
               <div className="product-cart__header">
                   <Link to="/">Tiếp tục tìm kiếm sản phẩm</Link>
                   <div style={{fontWeight: 'bold', color: "#f7971e"}}>Giỏ hàng của bạn</div>
               </div>
               <div className="product-cart__body">
                   {
                       allCart === undefined ? "" : allCart.map((item, index) => {
                        const {product, color, capacites, quantity} = item
                        return (
                         <div className="prd-item" key={`${product.image}${color.color}`} >
                         <div className="prd-item__image">
                             <img src={item.product.image} alt=""  />
                         </div>
                         <div className="prd-item__info">
                             <div className="prd-name">{product.name}</div>
                             <div className="prd-capacities">{capacites ===  null ||capacites === undefined ? "" : capacites.capacity }</div>
                             <div className="prd-color">Màu sắc: { color ===  null ||color === undefined ? "" : color.color}</div>
                             <div className="prd-price">
                                 <div className="prd-price-special-price">Giá: {numberWithCommas(color.price)}</div>
                             </div>
                             <div style={{visibility: 'hidden'}}>1</div>
                             <div style={{visibility: 'hidden'}}>1</div>
                             <div style={{visibility: 'hidden'}}>1</div>
                             <div style={{visibility: 'hidden'}}>1</div>
                             <div style={{visibility: 'hidden'}}>1</div>
                             <div className="prd-option d-flex">
                             <div onClick={() => {dispatch(removeProductToCart(item))}}>Xóa khỏi giỏ</div>
                             <div>
                                 <input className="quant" type="submit" value="-" onClick={() => {dispatch(decreaseQuantity(index))}} />
                                 <span className="quant">{quantity}</span>
                                 <input className="quant" type="submit" value="+" onClick={() => {dispatch(increaseQuantity(index))}} />
                             </div>
                         </div>
                         <div className="total-price">Thành tiền: {numberWithCommas(TotalPrice(color.price, quantity))}đ</div>
                         </div>
                      
                     </div>
                        )
                    })
                   }
               </div>
               <div>Tổng tiền: {numberWithCommas(total)}đ</div>
            </div>
        </div>
    )
}
