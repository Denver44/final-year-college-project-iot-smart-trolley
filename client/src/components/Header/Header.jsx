import React, { useState } from "react";
import "./Header.css";

function Header() {
  const [name, setName] = useState("Denver");
  const [contactno, setContactno] = useState("6432895178");
  return (
    <div className="header">
      <div className="header__name">
        <span>Welcome {name}</span>
      </div>
      <div className="header__contact">
        <span>contact {`+91 ${contactno}`}</span>
      </div>
    </div>
  );
}

export default Header;
