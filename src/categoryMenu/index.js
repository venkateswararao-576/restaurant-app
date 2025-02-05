import './index.css'

const Categories = props => {
  const {menuname, active, changeCategory} = props
  const activecolor = menuname === active ? 'active-color' : 'list-item'
  const changeitem = () => changeCategory(menuname)
  return (
    <button type="button" onClick={changeitem} className={activecolor}>
      {menuname}
    </button>
  )
}
export default Categories
