import {Component} from 'react'

import Header from './header'

import Categories from './categoryMenu'

import DishItem from './DishItem'

import './App.css'

class App extends Component {
  state = {
    menuslist: '',
    activemenufooditems: [],
    activecategory: '',
    cartcount: 0,
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
      activemenufooditems: refilter,
      isloading: false,
    })
  }

  increasecart = () => this.setState(prev => ({cartcount: prev.cartcount + 1}))

  decreasecart = () => this.setState(prev => ({cartcount: prev.cartcount - 1}))

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

  render() {
    const {
      activemenufooditems,
      menuslist,
      activecategory,
      cartcount,
      isloading,
    } = this.state
    return (
      <>
        {isloading ? (
          ''
        ) : (
          <>
            <Header count={cartcount} />
            <div className="category-list">
              {menuslist.map(each => (
                <Categories
                  menuname={each.category}
                  key={each.id}
                  active={activecategory}
                  changeCategory={this.changeCategory}
                />
              ))}
            </div>
            <ul className="dishes">
              {activemenufooditems[0].map(each => (
                <DishItem
                  details={each}
                  addtocart={this.increasecart}
                  removecart={this.decreasecart}
                  addquantity={this.addquantity}
                  reducequantity={this.reducequantity}
                />
              ))}
            </ul>
          </>
        )}
      </>
    )
  }
}

export default App
