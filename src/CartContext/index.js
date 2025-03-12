import React from 'react'

const CartContext = React.createContext({
  activeitems: [],
  cartList: [],
  addtocart: () => {},
  activecategory: '',
  categorylist: '',
  changecategory: () => {},
  increasequantity: () => {},
  decreasequantity: () => {},
  cartcount: 0,
  removeItem: () => {},
  decrementCartItemQuantity: () => {},
  incrementCartItemQuantity: () => {},
  removeAll: () => {},
  totalPrice: 0,
  restaurantName: '',
})
export default CartContext
