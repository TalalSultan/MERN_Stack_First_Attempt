import React from 'react';
import PropTypes from 'prop-types';
import './profile.css'


interface  UserInfoProps {
    name: string;
    email: string;
  }

const profile:React.FC<UserInfoProps> = ({ name, email }) => {
  return (
    <div className='container'>
      <h2>User Information</h2>
      <p>Name: {name}</p>
      <p>Email: {email}</p>
    </div>
  );
};


export default profile;