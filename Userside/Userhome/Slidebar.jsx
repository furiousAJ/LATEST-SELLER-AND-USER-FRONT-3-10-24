import React, { useEffect } from 'react'
import './flexer.scss'

import ecog from '../../../imgs/ecog.png'
import vegetable from '../Userimg/vegit.jpg'

const Slidebar = () => {

    
    useEffect(() => {
        const cardsContainer = document.querySelector('.hcontainer');
    
        const handleMouseOver = (e) => {
          const target = e.target.closest('.card');
    
          if (!target) return;
    
          cardsContainer.querySelectorAll('.card').forEach((card) => {
            card.classList.remove('active');
          });
    
          target.classList.add('active');
        };
    
        cardsContainer.addEventListener('mouseover', handleMouseOver);
    
        // Cleanup event listener when component unmounts
        return () => {
          cardsContainer.removeEventListener('mouseover', handleMouseOver);
        };
      }, []); // Empty dependency array means this effect runs once after the initial render
    
  
  return (
    <div className="hcontainer">
      <div className="card active">
        <img className="background" src={vegetable} alt=""/>
     
        <div className="card-content">
          <div className="profile-image">
          <img src={ecog} className='pic' alt="Your SVG" />

          </div>

          <h3 className="title">Vegetables</h3>
        </div>
        <div className="backdrop"></div>
      </div>

      <div className="card">
        <img className="background" src="./assets/fruits.jpg" alt=""/>

        <div className="card-content">
          <div className="profile-image">
          <img src={ecog} className='pic' alt="Your SVG" />
          </div>

          <h3 className="title">Fruits</h3>
        </div>
        <div className="backdrop"></div>
      </div>

      <div className="card">
        <img className="background" src="./assets/freshdairy.jpg" alt=""/>

        <div className="card-content">
          <div className="profile-image">
          <img src={ecog} className='pic' alt="Your SVG" />
          </div>

          <h3 className="title">Freshdairy</h3>
        </div>
        <div className="backdrop"></div>
      </div>

      <div className="card">
        <img className="background" src="./assets/nuts.jpg" alt=""/>

        <div className="card-content">
          <div className="profile-image">
          <img src={ecog} className='pic' alt="Your SVG" />
          </div>

          <h3 className="title">Nuts</h3>
        </div>
        <div className="backdrop"></div>
      </div>

      <div className="card">
        <img className="background" src="./assets/grains.jpg" alt=""/>

        <div className="card-content">
          <div className="profile-image">
          <img src={ecog} className='pic' alt="Your SVG" />
          </div>

          <h3 className="title">Grains</h3>
        </div>
        <div className="backdrop"></div>

      </div>

      <div className="card">
        <img className="background" src="./assets/spicy.jpg" alt=""/>

        <div className="card-content">
          <div className="profile-image">
          <img src={ecog} className='pic' alt="Your SVG" />
          </div>

          <h3 className="title">Spicy</h3>
        </div>
        <div className="backdrop"></div>
      </div>

      
      


      
      <div className="card">
        <img className="background" src="./assets/beans.jpg" alt=""/>

        <div className="card-content">
          <div className="profile-image">
          <img src={ecog} className='pic' alt="Your SVG" />
          </div>

          <h3 className="title">Legumes</h3>
        </div>
        <div className="backdrop"></div>
      </div>


      

     



    </div>
  )
}

export default Slidebar