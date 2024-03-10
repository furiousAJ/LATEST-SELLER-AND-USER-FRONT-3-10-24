import React from 'react'
import Flexdraw from '../../Pages/home/flexbox/Flexdraw'
import CategoryFilter from './items/CategoryFilter'
import Footer from '../../Pages/home/footer/Footer'

const Productpage = () => {
  return (
    <div>
      <Flexdraw/>
      <div>
        <CategoryFilter/>
      </div>
      <Footer/>
    </div>
  )
}

export default Productpage
