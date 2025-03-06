import CartContext from '../CartContext'
import './index.css'

const CartItems = props => {
  const {details} = props
  const {dishName, dishImage, dishPrice, quantity, dishId} = details
  return (
    <CartContext.Consumer>
      {value => {
        const {
          removeCartItem,
          incrementCartItemQuantity,
          decrementCartItemQuantity,
        } = value
        const removeitem = () => removeCartItem(dishId)
        const decrease = () => decrementCartItemQuantity(dishId)
        const increase = () => incrementCartItemQuantity(dishId)
        return (
          <div className="cart-card">
            <h1 className="dish-name">{dishName}</h1>
            <div className="price-quantity">
              <p className="dish-price">Price: {dishPrice * quantity}</p>
              <div className="quantity-controls">
                <button type="button" className="btns" onClick={decrease}>
                  -
                </button>
                <p>{quantity}</p>
                <button type="button" className="btns" onClick={increase}>
                  +
                </button>
              </div>
              <button onClick={removeitem} className="remove-btn" type="button">
                Remove
              </button>
            </div>
            <img className="cart-dishimage" src={dishImage} alt={dishName} />
          </div>
        )
      }}
    </CartContext.Consumer>
  )
}
export default CartItems
