import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import CartContext from '../CartContext'

import Header from '../header'

import Categories from '../categoryMenu'

import DishItem from '../DishItem'

import './index.css'

class Home extends Component {
  render() {
    const islogged = Cookies.get('jwt_token')
    if (islogged === undefined) {
      return <Redirect to="/login" />
    }

    return (
      <CartContext.Consumer>
        {value => {
          const {activeitems, categorylist} = value
          return (
            <div className="container">
              <Header />
              <div className="category-list">
                {categorylist.map(each => (
                  <Categories menuname={each.category} key={each.id} />
                ))}
              </div>
              <ul className="dishes">
                {activeitems.map(each => (
                  <DishItem details={each} />
                ))}
              </ul>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default Home
