import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/MainPage.css';
import { products } from '../data/data.js';

interface Product {
  id      : number;
  name    : string;
  price   : number;
  image   : string;
  category: string;
}

const MainPage = () => {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading       , setIsLoading]        = useState(true);
  const [error           , setError]            = useState<string | null>(null);

  useEffect(() => {
    try {
      setFeaturedProducts(products);
    } catch (error) {
      setError(error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="main-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1>최고의 쇼핑 경험</h1>
          <p>새로운 제품과 특별한 할인을 만나보세요</p>
          <button className="shop-button" onClick={() => navigate('/products')}>쇼핑하기</button>
        </div>
      </div>

      <section className="featured-section">
        <h2 className="section-title">인기 상품</h2>
        <div className="product-grid">
          {isLoading ? (
            <div className="loading">로딩 중...</div>
          ) : error ? (
            <p>잠시 후에 다시 시도해주세요.</p>
          ) : (
            featuredProducts.map((product) => (
              <div key={product.id} className="product-card" onClick={() => navigate(`/product/${product.id}`)}>
                <img className="product-image" src={product.image} alt={product.name} />
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-price">{product.price.toLocaleString()}원</p>
                  <span className="product-category">{product.category}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <div className="category-section">
        <h2 className="section-title">카테고리</h2>
        <div className="category-grid">
          <div className="category-card" onClick={() => navigate('/category/electronics')}>
            <h3>전자기기</h3>
          </div>
          <div className="category-card" onClick={() => navigate('/category/fashion')}>
            <h3>패션</h3>
          </div>
          <div className="category-card" onClick={() => navigate('/category/home')}>
            <h3>홈리빙</h3>
          </div>
          <div className="category-card" onClick={() => navigate('/category/beauty')}>
            <h3>뷰티</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage; 