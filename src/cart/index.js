import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../header'
import CartContext from '../CartContext'
import CartItems from '../cartItems'

import './index.css'

const Cart = () => {
  const islogged = Cookies.get('jwt_token')
  if (islogged === undefined) {
    return <Redirect to="/login" />
  }
  return (
    <CartContext.Consumer>
      {value => {
        const {cartcount, cartList, removeAllCartItems, totalPrice} = value
        const removecartitems = () => removeAllCartItems()
        return (
          <div className="cart-route">
            <Header />
            <div className="cart-container">
              {cartcount > 0 ? (
                <div className="cart-items-container">
                  <div className="cart-remove">
                    <h1 style={{alignSelf: 'flex-start', color: 'red'}}>
                      CartItems :-
                    </h1>
                    <button
                      className="remove-all"
                      type="button"
                      onClick={removecartitems}
                    >
                      Remove All
                    </button>
                  </div>
                  {cartList.map(each => (
                    <CartItems details={each} key={each.dishId} />
                  ))}
                  <h1 style={{alignSelf: 'flex-end'}}>
                    TotalCart: {totalPrice}
                  </h1>
                </div>
              ) : (
                <img
                  className="no-cart"
                  src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
                  alt="Emptycart"
                />
              )}
            </div>
          </div>
        )
      }}
    </CartContext.Consumer>
  )
}

export default Cart
