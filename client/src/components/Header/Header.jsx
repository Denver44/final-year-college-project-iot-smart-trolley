import React, { useState, useEffect } from 'react';
import './Header.css';
import { useSelector } from 'react-redux';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Link } from 'react-router-dom';
function Header() {
  const user = useSelector((state) => state?.user);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // useEffect(() => {
  //   setName(user.authData?.email.split("@", 1));
  //   setEmail(user.authData?.email);
  // }, []);

  // const logout = () => {
  //   if (user.authData) {
  //     auth.signOut();
  //   }
  // };

  return (
    <div className="header">
      <div className="header__left" onClick={null}>
        <Link to="/">
          <ArrowBackIosIcon className="backarrowIcon" />
        </Link>
        <span className="header__leftName">Welcome {name}</span>
      </div>
      <div className="header__right">
        <div className="header__mailId">
          <span>email Id:- {email}</span>
        </div>
      </div>
    </div>
  );
}

export default Header;
