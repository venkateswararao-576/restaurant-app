import CartContext from '../CartContext'
import './index.css'

const DishItem = props => {
  const {details} = props
  const {
    dishName,
    dishAvailability,
    dishCalories,
    addoncat,
    dishCurrency,
    dishDescription,
    dishImage,
    dishPrice,
    dishType,
    quantity,
    dishId,
  } = details

  const logocontainer =
    dishType === 2 ? 'logo-container-veg' : 'logo-container-nonveg'
  const logo = dishType === 2 ? 'veg-logo' : 'nonveg-logo'

  return (
    <CartContext.Consumer>
      {value => {
        const {increasequantity, decreasequantity, addCartItem} = value
        const additem = () => increasequantity(dishId)

        const decrease = () => {
          if (quantity !== 0) {
            decreasequantity(dishId)
          }
        }

        const addcart = () => {
          if (quantity !== 0) {
            addCartItem(details)
          }
        }

        return (
          <li className="card">
            <div className="dishdetails">
              <div className={logocontainer}>
                <div className={logo} />
              </div>
              <div className="dish-text">
                <h1 className="dish-name">{dishName}</h1>
                <p className="currency">
                  {dishCurrency} {dishPrice}
                </p>
                <p className="description">{dishDescription}</p>
                {dishAvailability ? (
                  <div className="btn-addcart">
                    <div className="buttons">
                      <button onClick={decrease} type="button" className="btn">
                        -
                      </button>
                      <p className="quantity">{quantity}</p>
                      <button type="button" className="btn" onClick={additem}>
                        +
                      </button>
                    </div>
                    {quantity !== 0 ? (
                      <button
                        className="add-cart-btn"
                        type="button"
                        onClick={addcart}
                      >
                        ADD TO CART
                      </button>
                    ) : (
                      ''
                    )}
                  </div>
                ) : (
                  <p className="not-available">Not available</p>
                )}
                {addoncat.length > 0 ? (
                  <p className="custom-available">Customizations available</p>
                ) : (
                  ''
                )}
              </div>
            </div>
            <p className="calories">{dishCalories} calories</p>
            <img className="image" src={dishImage} alt={dishName} />
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}
export default DishItem
