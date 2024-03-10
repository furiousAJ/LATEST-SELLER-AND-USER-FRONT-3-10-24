import React from 'react'
import './midepart.scss'
import Newsletter from './Newsletter'
import NewsletterImg from '../../../imgs/newsletter.png'
import Banner from './Banner'

const Midpart = () => {
  return (
    <div>
        <Banner/>
          <section className='newsLetterSection'>
                <div className='container-fluid'>
                    <div className='box d-flex align-items-center'>
                        <div className='info'>
                            <h2>Stay home & get your daily <br />needs from our shop</h2>
                            <p>Start You'r Daily Shopping with Nest Mart</p>
                            <br /><br className='res-hide' />
                            <Newsletter />
                        </div>

                        <div className='img'>
                            <img src={NewsletterImg} className='w-100'alt='error' />
                        </div>
                    </div>
                </div>
            </section>

    </div>
  )
}

export default Midpart
