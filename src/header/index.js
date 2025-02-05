import {AiOutlineShoppingCart} from 'react-icons/ai'
import './index.css'

const Header = props => {
  const {count} = props
  return (
    <nav className="nav-header">
      <h1 className="heading">UNI Resto Cafe</h1>
      <div className="order-cart">
        <p className="order">My Orders</p>
        <div className="cart-badge">
          <AiOutlineShoppingCart className="cart" />
          <span className="cart-items">{count}</span>
        </div>
      </div>
    </nav>
  )
}
export default Header
