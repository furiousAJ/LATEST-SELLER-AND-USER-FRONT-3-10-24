import React from 'react'
import './footer.scss'
import Icon1 from '../../../imgs/icon-1.svg'
import Icon2 from '../../../imgs/icon-2.svg'
import Icon3 from '../../../imgs/icon-3.svg'
import Icon4 from '../../../imgs/icon-4.svg'
import Icon5 from '../../../imgs/icon-5.svg'

const Minfooter = () => {
  return (
    <div className='footerWrapper'>
    <div className='footerBoxes'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col'>
            <div className='box d-flex align-items-center w-100'>
              <span><img src={Icon2} /></span>
              <div className='info'>
                <h4>Free delivery</h4>
                <p>Orders 500 or more</p>
              </div>
            </div>
          </div>
          <div className='col'>
            <div className='box d-flex align-items-center w-100'>
              <span><img src={Icon1} /></span>
              <div className='info'>
                <h4>Best prices & offers</h4>
                <p>Orders 1500 or more</p>
              </div>
            </div>
          </div>
          <div className='col'>
            <div className='box d-flex align-items-center w-100'>
              <span><img src={Icon3} /></span>
              <div className='info'>
                <h4>Great daily deal</h4>
                <p>Orders 1500 or more</p>
              </div>
            </div>
          </div>
          <div className='col'>
            <div className='box d-flex align-items-center w-100'>
              <span><img src={Icon4} /></span>
              <div className='info'>
                <h4>Wide assortment</h4>
                <p>Orders 1500 or more</p>
              </div>
            </div>
          </div>
          <div className='col'>
            <div className='box d-flex align-items-center w-100'>
              <span><img src={Icon5} /></span>
              <div className='info'>
                <h4>Easy returns</h4>
                <p>Orders 2000 or more</p>
              </div>
            </div>
          </div>
        </div>
      </div></div>
      <br></br><div>
        </div></div>
  )
}

export default Minfooter
