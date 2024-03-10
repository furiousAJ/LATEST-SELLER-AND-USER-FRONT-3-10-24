import React from 'react'
import './productlist.scss'



import Sellernavbar from '../Sellerhome/Sellernavbar'
import Productview from './Productview'

const Productlist = () => {
  return (
    <div className='list'>
     
      <div className="listContainer">
        <Sellernavbar/>
        <h2 className='viewh2'>Product View</h2><br></br>
        <Productview/>
      </div>
    </div>
  )
}

export default Productlist