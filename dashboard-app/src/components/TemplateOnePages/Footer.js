import React from 'react';
//import { Link } from 'react-router-dom';
import '../../App.css';

const Footer = (props) => {
    var pageNumber = props.pageNumber

    return(
    <div>Footer: {pageNumber}</div>
    )
}

export default Footer;