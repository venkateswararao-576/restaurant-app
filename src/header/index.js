import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import CartContext from '../CartContext'

import './index.css'

const Header = props => {
  const logout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {cartcount, restaurantName} = value

        return (
          <nav className="nav-header">
            <Link to="/">
              <h1 className="heading">{restaurantName}</h1>
            </Link>
            <div className="order-cart">
              <p className="order">My Orders</p>
              <div className="cart-badge">
                <Link to="/cart">
                  <button className="cart-btn" type="button" data-testid="cart">
                    <AiOutlineShoppingCart className="cart" />
                  </button>
                </Link>
                <span className="cart-items">{cartcount}</span>
              </div>
              <button className="log-out-btn" type="button" onClick={logout}>
                Logout
              </button>
            </div>
          </nav>
        )
      }}
    </CartContext.Consumer>
  )
}
export default withRouter(Header)
