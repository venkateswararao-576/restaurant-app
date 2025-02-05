import './index.css'

const DishItem = props => {
  const {details, addtocart, removecart, addquantity, reducequantity} = props
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

  const additem = () => {
    addtocart()
    addquantity(dishId)
  }

  const removeitem = () => {
    if (quantity !== 0) {
      removecart()
      reducequantity(dishId)
    }
  }

  const logocontainer =
    dishType === 2 ? 'logo-container-veg' : 'logo-container-nonveg'
  const logo = dishType === 2 ? 'veg-logo' : 'nonveg-logo'

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
            <div className="buttons">
              <button onClick={removeitem} type="button" className="btn">
                -
              </button>
              <p className="quantity">{quantity}</p>
              <button type="button" className="btn" onClick={additem}>
                +
              </button>
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
}
export default DishItem
