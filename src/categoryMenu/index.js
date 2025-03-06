import CartContext from '../CartContext'
import './index.css'

const Categories = props => {
  const {menuname} = props
  return (
    <CartContext.Consumer>
      {value => {
        const {changecategory, activecategory} = value
        const changeitem = () => changecategory(menuname)
        const activecolor =
          menuname === activecategory ? 'active-color' : 'list-item'
        return (
          <button type="button" onClick={changeitem} className={activecolor}>
            {menuname}
          </button>
        )
      }}
    </CartContext.Consumer>
  )
}
export default Categories
