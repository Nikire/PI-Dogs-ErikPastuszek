import * as React from 'react';
import './Logo.css';
import logo from './logo.png';
console.log(logo);
const Logo = (props) => <img src={logo} alt="Logo" className="logo" />;

export default Logo;
