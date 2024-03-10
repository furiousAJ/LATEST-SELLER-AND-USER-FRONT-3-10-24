import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './profile.scss';
import Sellernavbar from '../Sellerhome/Sellernavbar';
import Chart from '../Sellerhome/Chart';
import { useParams } from 'react-router-dom';
import baseUrl from '../../../Api';

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${baseUrl}/sauth/sellerprofile/${id}`)
      .then(response => {
        console.log(response.data);
        setProfile(response.data);
      })
      .catch(err => {
        setError(err.message);
        console.log('Error fetching user profile:', err);
      });
  }, [id]);

  return (
    <div className='single'>
      <div className='singleContainer'>
      <Sellernavbar id={id} />
        <div className="top">
          <div className="left">
            <h1 className="title">PROFILE</h1>
            {profile && (
              <div className="details">
                <h1 className="itemTitle">{profile.name}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email :&nbsp;&nbsp;</span>
                  <span className="itemValue">{profile.email}</span><br></br>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone :&nbsp;&nbsp;</span>
                  <span className="itemValue">{profile.phone}</span><br></br>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address :&nbsp;&nbsp;</span>
                  <span className="itemValue">{profile.address}</span>
                </div>
              </div>
            )}
          </div>
          <div className="right">
            <Chart aspect={3/1} title="Last Transactions" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Recently Joined</h1>
        </div>
      </div>
    </div>
  );
}

export default Profile;