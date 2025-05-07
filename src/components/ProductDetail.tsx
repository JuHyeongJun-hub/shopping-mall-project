import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../store/slices/cartSlice';
import { RootState } from '../store/store';
import '../styles/ProductDetail.css';

const ERROR_MESSAGES = {
  FETCH_ERROR: '상품을 불러오는데 실패했습니다.',
  UNKNOWN_ERROR: '알 수 없는 오류가 발생했습니다.',
  PRODUCT_NOT_FOUND: '상품을 찾을 수 없습니다.',
};

const fetchProduct = async (id: string): Promise<Product> => {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);
  if(!response.ok) {
    throw new Error(ERROR_MESSAGES.FETCH_ERROR);
  }
  return response.json();
}

interface QuantityControlProps{
  quantity         : number; // 현재 수량
  maxQuantity      : number; // 최대 수량
  onQuantityChange : (newQuantity : number) => void; // 수량 변경 함수
}

function QuantityControl({ 
          quantity,          // 현재 수량
          maxQuantity,       // 최대 수량
          onQuantityChange   // 수량 변경 함수
        } :QuantityControlProps) {
  return (
    <div className="quantity-control">
       <button 
        className="quantity-btn" 
        onClick={() => onQuantityChange(quantity - 1)}
        disabled={quantity <= 1}
        aria-label="수량 감소"
      >
        -
      </button>
      <span className="quantity" aria-label={`현재 수량: ${quantity}`}>
        {quantity}
      </span>
      <button 
        className="quantity-btn" 
        onClick={() => onQuantityChange(quantity + 1)}
        disabled={quantity >= maxQuantity}
        aria-label="수량 증가"
      >
        +
      </button>
    </div>
  )
}

const ProductDetail = () => {
  const { id }                  = useParams<{ id: string }>();
  const [product , setProduct]  = useState<Product | null>(null);
  const [loading , setLoading]  = useState(true);
  const [error   , setError]    = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const dispatch                = useDispatch();

  useEffect(() => {
    const LoadProduct = async () => {
      try {
        if(!id) return;
        const data = await fetchProduct(id);
        setProduct(data);
      } catch(err) {
        setError(err instanceof Error ? err.message : ERROR_MESSAGES.UNKNOWN_ERROR);
      } finally {
        setLoading(false);
      }
    }
    LoadProduct();
  }, []);

  const handleQuantityChange = (newQuantity: number) => {
    if(newQuantity < 1) return;
    if(product && newQuantity > (product.stock || 10)) return;
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    if (product) {
      dispatch(addItem({
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: quantity,
        image: product.image
      }));
    }
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;
  if (!product) return <div>{ERROR_MESSAGES.PRODUCT_NOT_FOUND}</div>;

  return (
    <div className="product-detail">
      <div className="product-image">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="product-info">
        <h1>{product.title}</h1>
        <div className="product-price">
          {product.discount ? (
            <>
              <span className="original-price">${product.price}</span>
              <span className="discounted-price">
                ${(product.price * (1 - product.discount / 100)).toFixed(2)}
              </span>
              <span className="discount-badge">{product.discount}% OFF</span>
            </>
          ) : (
            <span>${product.price}</span>
          )}
        </div>
        <div className="product-rating">
          <span>평점: {product.rating.rate}</span>
        </div>
        <div className="product-stock">
          <span>재고: {product.stock || 10}개</span>
        </div>
        <QuantityControl
          quantity={quantity}
          maxQuantity={product.stock || 10}
          onQuantityChange={handleQuantityChange}
        />
        <div className="product-description">
          <h2>상품 설명</h2>
          <p>{product.description}</p>
        </div>
        <div className="product-category">
          <span>카테고리: {product.category}</span>
        </div>
        <button className="add-to-cart" onClick={handleAddToCart}>
          장바구니에 추가 (총 ${(product.price * quantity).toFixed(2)})
        </button>
      </div>
    </div>
  );
};

export default ProductDetail; 