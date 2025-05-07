import React from 'react';
import { useDispatch } from 'react-redux';
import { increaseQuantity, decreaseQuantity, removeItem } from '../store/slices/cartSlice';
import { CartItem as CartItemType } from '../types';
import '../styles/CartItem.css';

interface CartItemProps {
    item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const dispatch   = useDispatch();
  const { id, image, title, price, quantity} = item;
  const totalPrice = (price * quantity).toFixed(2);

  const handleQuantityChange = (type : 'increase' | 'decrease') => {
    if(type === 'increase') {
        dispatch(increaseQuantity(id));
    } else {
        dispatch(decreaseQuantity(id));
    }
  }

  const handleRemove = () => {
    if(window.confirm('정말로 이 상품을 장바구니에서 제거하시겠습니까?')){
        dispatch(removeItem(id));
    }
  }

  return (
    <div className="cart-item">
      <img src={image} alt={title} className="cart-item-image" />
      <div className="cart-item-info">
        <h3>{title}</h3>
        <p>가격: ${price}</p>
        <div className="quantity-control">
          <button
            onClick={() => handleQuantityChange('decrease')}
            disabled={quantity <= 1}
            aria-label="수량 감소"
          >
            -
          </button>
          <span aria-label={`현재 수량: ${quantity}`}>
            {quantity}
          </span>
          <button 
            onClick={() => handleQuantityChange('increase')}
            disabled={quantity >= 10}
            aria-label="수량 증가"
          >
            +
          </button>
        </div>
        <p>총 가격: ${totalPrice}</p>
      </div>
      <button 
        onClick={handleRemove}
        className="remove-btn"
        aria-label="상품 제거"
      >
        삭제
      </button>
    </div>
  );
};

export default CartItem; 