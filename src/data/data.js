export const products = [
    {
      id: 1,
      name: "애플 아이폰 15 Pro",
      price: 1500000,
      image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569",
      category: "전자기기",
      description: "최신 아이폰 15 Pro 256GB",
      stock: 50
    },
    {
      id: 2,
      name: "삼성 갤럭시 S24 Ultra",
      price: 1600000,
      image: "https://images.unsplash.com/photo-1706887041414-3b8b7b7b7b7b",
      category: "전자기기",
      description: "갤럭시 S24 Ultra 512GB",
      stock: 30
    },
    {
      id: 3,
      name: "나이키 에어포스 1",
      price: 129000,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
      category: "패션",
      description: "클래식한 디자인의 운동화",
      stock: 100
    },
    {
      id: 4,
      name: "아디다스 트랙수트",
      price: 89000,
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea",
      category: "패션",
      description: "편안한 착용감의 트랙수트",
      stock: 75
    },
    {
      id: 5,
      name: "다이슨 청소기",
      price: 890000,
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12",
      category: "홈리빙",
      description: "강력한 흡입력의 무선 청소기",
      stock: 25
    },
    {
      id: 6,
      name: "네스프레소 커피머신",
      price: 450000,
      image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6",
      category: "홈리빙",
      description: "프리미엄 커피 경험을 위한 머신",
      stock: 40
    },
    {
      id: 7,
      name: "라네즈 토너",
      price: 25000,
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be",
      category: "뷰티",
      description: "수분 공급 토너",
      stock: 200
    },
    {
      id: 8,
      name: "이니스프리 그린티 세트",
      price: 35000,
      image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc",
      category: "뷰티",
      description: "그린티 기반 스킨케어 세트",
      stock: 150
    }
  ];
  
  export const featuredProducts = products.slice(0, 4); // 인기 상품으로 처음 4개 상품을 표시 