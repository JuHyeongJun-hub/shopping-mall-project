import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import CartItem from '../components/CartItem';
import { clearCart } from '../store/slices/cartSlice';
import '../styles/CartPage.css';

const CartPage = () => {
  const dispatch = useDispatch();
  const { items, totalPrice } = useSelector((state: RootState) => state.cart);

  const handleClearCart = () => {
    if (window.confirm('장바구니를 비우시겠습니까?')) {
      dispatch(clearCart());
    }
  };

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <h2>장바구니가 비어있습니다</h2>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h2>장바구니</h2>
        <button 
          className="clear-cart-btn"
          onClick={handleClearCart}
        >
          장바구니 비우기
        </button>
      </div>
      
      <div className="cart-items">
        {items.map(item => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      
      <div className="cart-summary">
        <div className="summary-item">
          <span>총 상품 수:</span>
          <span>{items.length}개</span>
        </div>
        <div className="summary-item">
          <span>총 결제금액:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <button className="checkout-btn">
          결제하기
        </button>
      </div>
    </div>
  );
};

export default CartPage; 