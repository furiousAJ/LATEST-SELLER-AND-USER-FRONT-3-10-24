import React from 'react'
import './banner.scss'
import Banner1 from '../../../imgs/box7.png'
import Banner2 from '../../../imgs/box2.jpeg'
import Banner3 from '../../../imgs/box3.jpeg'
import { Link } from 'react-router-dom'

const Banner = () => {
  return (
    <div className='bannerSection'>
    <div className='container-fluid'>
        <div className='row'>
            <div className='col'>
                <div className='box'><Link  to="/category/Dairy" style={{ textDecoration: "none" }}>
                    <img src={Banner2} className='w-100 transition' alt='err' />
                    </Link>
                </div>
            </div>

            <div className='col'>
                <div className='box'> <Link to="/category/fruits" style={{ textDecoration: "none" }}>
                    <img src={Banner1} className='w-100 transition' alt='err' /></Link>
                </div>
            </div>

            <div className='col'>
                <div className='box'>   <Link to="/category/vegetables" style={{ textDecoration: "none" }}>
                    <img src={Banner3} className='w-100 transition' alt='err' /></Link>
                </div>
            </div>

            
        </div>
    </div>
</div>
  )
}

export default Banner
