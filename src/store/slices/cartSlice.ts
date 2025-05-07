import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id       : number;     // 아이템 고유 식별번호
  title    : string;     // 아이템 제목
  price    : number;     // 아이템 가격 
  quantity : number;     // 수량
  image    : string;     // 이미지 주소
}

interface CartState {
  items      : CartItem[];
  totalPrice : number;
}

// localStorage에서 장바구니 데이터 불러오기
const loadCartFromStorage = (): CartState => {
  const savedCart = localStorage.getItem('cart');
  if(savedCart) {
    return JSON.parse(savedCart);
  }

  return {
    items: [],
    totalPrice: 0
  }
}

// 초기 상태 설정
const initialState : CartState = loadCartFromStorage();

// 장바구니 데이터를 localStorage에 저장하는 함수
const saveCartToStorage = (state: CartState) => {
  localStorage.setItem('cart', JSON.stringify(state));
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {      // 아이템 추가
      const existingItem = state.items.find(item => item.id === action.payload.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      
      state.totalPrice = state.items.reduce((total, item) => 
        total + (item.price * item.quantity), 0);

      saveCartToStorage(state);
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item && item.quantity < 10) {
        item.quantity += 1;
        state.totalPrice = state.items.reduce((total, item) => 
          total + (item.price * item.quantity), 0);
        saveCartToStorage(state);
      }
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.totalPrice = state.items.reduce((total, item) => 
          total + (item.price * item.quantity), 0);
        saveCartToStorage(state);
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.totalPrice = state.items.reduce((total, item) => 
        total + (item.price * item.quantity), 0);
      saveCartToStorage(state);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
      localStorage.removeItem('cart');
    }
  },
});

export const { addItem, increaseQuantity, decreaseQuantity, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer; 