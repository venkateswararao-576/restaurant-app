import {Route, BrowserRouter, Switch, Redirect} from 'react-router-dom'
import {Component} from 'react'

import Login from './Login'
import Home from './HomeRoute'
import Cart from './cart'
import CartContext from './CartContext'

class App extends Component {
  state = {
    dishes: '',
    cartitems: [],
    menuslist: '',
    activemenufooditems: [],
    activecategory: '',
    isloading: true,
  }

  componentDidMount() {
    this.getdishes()
  }

  getdishes = async () => {
    const url =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
    const data = await fetch(url)
    const response = await data.json()
    const dishlist = response[0].table_menu_list
    const menus = dishlist.map(each => ({
      id: each.menu_category_id,
      category: each.menu_category,
    }))

    const fooditems = dishlist.map(every =>
      every.category_dishes.map(each => ({
        dishAvailability: each.dish_Availability,
        dishName: each.dish_name,
        dishType: each.dish_Type,
        dishCalories: each.dish_calories,
        dishCurrency: each.dish_currency,
        dishDescription: each.dish_description,
        dishId: each.dish_id,
        dishImage: each.dish_image,
        dishPrice: each.dish_price,
        nexturl: each.nexturl,
        addoncat: each.addonCat,
        quantity: 0,
        category: every.menu_category,
      })),
    )
    this.setState(
      {
        dishes: fooditems,
        menuslist: menus,
        activecategory: menus[0].category,
      },
      this.activefooditems,
    )
  }

  activefooditems = () => {
    const {dishes, activecategory} = this.state
    const filterfoodlist = dishes.map(each =>
      each.filter(every => {
        if (every.category === activecategory) {
          return every
        }
        return ''
      }),
    )
    const refilter = filterfoodlist.filter(each => each.length > 0)
    this.setState({
      activemenufooditems: refilter[0],
      isloading: false,
    })
  }

  changeCategory = category =>
    this.setState({activecategory: category}, this.activefooditems)

  addquantity = id => {
    const {dishes} = this.state
    const filterlist = dishes.map(each =>
      each.map(every => {
        if (every.dishId === id) {
          return {...every, quantity: every.quantity + 1}
        }
        return every
      }),
    )
    this.setState({dishes: filterlist}, this.activefooditems)
  }

  reducequantity = id => {
    const {dishes} = this.state
    const filterlist = dishes.map(each =>
      each.map(every => {
        if (every.dishId === id && every.quantity !== 0) {
          return {...every, quantity: every.quantity - 1}
        }
        return every
      }),
    )
    this.setState({dishes: filterlist}, this.activefooditems)
  }

  addCartItem = details => {
    const {cartitems} = this.state
    if (cartitems.length === 0) {
      this.setState(prev => ({
        cartitems: [...prev.cartitems, details],
      }))
    } else {
      const isincart = cartitems.filter(each => each.dishId === details.dishId)
      if (isincart.length === 0) {
        this.setState(prev => ({
          cartitems: [...prev.cartitems, details],
        }))
      } else {
        const updatequantity = cartitems.map(each => {
          if (each.dishId === details.dishId) {
            return {...each, quantity: each.quantity + details.quantity}
          }
          return each
        })
        this.setState({cartitems: updatequantity})
      }
    }
  }

  removeItem = id => {
    const {cartitems} = this.state
    const filtercartitems = cartitems.filter(each => each.dishId !== id)
    this.setState({cartitems: filtercartitems})
  }

  removeAllCartItems = () => this.setState({cartitems: []})

  incrementCartItemQuantity = id => {
    const {cartitems} = this.state
    const filteritems = cartitems.map(each => {
      if (each.dishId === id) {
        return {
          ...each,
          quantity: each.quantity + 1,
        }
      }
      return each
    })
    this.setState({cartitems: filteritems})
  }

  decrementCartItemQuantity = id => {
    const {cartitems} = this.state
    let isremove = false
    const filtercartitems = cartitems.map(each => {
      if (each.dishId === id) {
        if (each.quantity === 1) {
          isremove = true
        } else {
          return {...each, quantity: each.quantity - 1}
        }
      }
      return each
    })
    if (isremove) {
      const removeitemlist = cartitems.filter(each => each.dishId !== id)
      this.setState({cartitems: removeitemlist})
    } else {
      this.setState({cartitems: filtercartitems})
    }
  }

  render() {
    const {
      activemenufooditems,
      activecategory,
      menuslist,
      isloading,
      cartitems,
    } = this.state
    let totalcartval = 0
    const total = cartitems.map(each => {
      totalcartval += each.dishPrice * each.quantity

      return totalcartval
    })

    return (
      <>
        {isloading ? (
          ''
        ) : (
          <CartContext.Provider
            value={{
              activeitems: activemenufooditems,
              addCartItem: this.addCartItem,
              activecategory,
              changecategory: this.changeCategory,
              categorylist: menuslist,
              cartcount: cartitems.length,
              increasequantity: this.addquantity,
              decreasequantity: this.reducequantity,
              cartList: cartitems,
              removeCartItem: this.removeItem,
              removeAllCartItems: this.removeAllCartItems,
              incrementCartItemQuantity: this.incrementCartItemQuantity,
              decrementCartItemQuantity: this.decrementCartItemQuantity,
              totalPrice: totalcartval,
            }}
          >
            <BrowserRouter>
              <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/" component={Home} />
                <Route exact path="/cart" component={Cart} />
                <Redirect to="login" />
              </Switch>
            </BrowserRouter>
          </CartContext.Provider>
        )}
      </>
    )
  }
}

export default App
